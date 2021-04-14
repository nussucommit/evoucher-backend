from rest_framework import status,generics, permissions, mixins
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, update_session_auth_hash, login
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.models import User
from .serializer import RegisterSerializer, UserSerializer
from datetime import datetime, timedelta

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
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully.  Now perform Login to get your token",
        })


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
        return Response(get_tokens_for_user(user), status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
