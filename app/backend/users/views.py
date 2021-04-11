from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from .serializer import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework import status
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
    user = authenticate(username=pk, password=request.data['oldpassword'])
    if user is not None:
        print("hahaha")
    else:
        content = {'please move along': 'nothing to see here'}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)
    # form = PasswordChangeForm(request.user, request.POST)
    # if form.is_valid():
    #     user = form.save()
    #     update_session_auth_hash(request, user)  # Important!
    #     messages.success(request, 'Your password was successfully updated!')
    #     return redirect('change_password')
    # else:
    #     messages.error(request, 'Please correct the error below.')