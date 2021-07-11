from rest_framework import status,generics, permissions, mixins
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, update_session_auth_hash, login
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.models import User
from .serializer import RegisterSerializer, UserSerializer, ChangePasswordSerializer
from datetime import datetime, timedelta
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

import jwt
from django.conf import settings
from users.auth_backend import PasswordlessAuthBackend
from rest_framework_simplejwt.tokens import RefreshToken

#Register API
class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args,  **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "message": "User Created Successfully.  Now perform Login to get your token",
        })

class UserLogoutView(APIView):
    """Logout view for users"""

    def post(self, request):
        refresh = request.data.get("refresh_token")
        token = RefreshToken(refresh)
        token.blacklist()
        return Response({"detail": "OK"}, status.HTTP_200_OK)

class ChangePasswordView(generics.UpdateAPIView):
    # authentication_classes = (JWTAuthentication,)
    # permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def update(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.update(request.user, serializer.validated_data)
        print(serializer.validated_data)
        refresh = request.data.get("refresh_token")
        token = RefreshToken(refresh)

        print(token)
        print(refresh)

        response = {
            'status': 'success',
            'code': status.HTTP_200_OK,
            'message': 'Password updated successfully',
            'data': []
        }

        return Response(response)

@api_view(['POST'])
def change_password(request, pk):
    form = PasswordChangeForm(request.user, data=request.data)
    if form.is_valid():
        user = form.save()
        update_session_auth_hash(request, user)  # Important!
    
        res = {"message" : "Password changed" }
        return Response(res, status=200)
    else :
        content = {'please move along': 'nothing to see here'}
        return Response(content, status=500)
    # form = PasswordChangeForm(request.user, request.POST)
    # if form.is_valid():
    #     user = form.save()
    #     update_session_auth_hash(request, user)  # Important!
    #     messages.success(request, 'Your password was successfully updated!')
    #     return redirect('change_password')
    # else:
    #     messages.error(request, 'Please correct the error below.')

@api_view(['POST'])
def authenticator(request):
    username = request.data['username']
    user = PasswordlessAuthBackend().authenticate(username=username)
    if user is not None:
        login(request, user)
        return Response({"username": user.username, "token": get_tokens_for_user(user)}, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
