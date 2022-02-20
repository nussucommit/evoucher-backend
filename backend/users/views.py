from rest_framework import status,generics, permissions, mixins
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from student.models import Student, InOrganization
from rest_framework.response import Response
from django.contrib.auth import authenticate, update_session_auth_hash, login
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.models import User
from .serializer import RegisterSerializer, UserSerializer, ChangePasswordSerializer,LoginSerializer
from datetime import datetime, timedelta
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
import jwt
from django.conf import settings
from users.auth_backend import PasswordlessAuthBackend
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created


class UserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer(queryset)

    def retrieve(self, request, pk=None):
        """
        If provided 'pk' is "me" then return the current user.
        """
        if request.user and pk == 'me':
            return Response(UserSerializer(request.user).data)
        return super(UserView, self).retrieve(request, pk)

#Register API
class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args,  **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        #Authentication email Config
        user_data = serializer.data
        
        
        user = User.objects.get(username= user_data['nusnet_id'])

        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relativeLink = reverse('email-verify')

        
        absoluteLink = 'http://'+current_site+relativeLink+"?token="+str(token)
        email_body = "Hi , use the link below to verify you email " + "\n" + absoluteLink;
        data  = {'email_body':email_body, 
                'subject': "Verify your email",
                'to-email':[user.email]}
        
        Util.send_email(data)

        return Response({
            "message": "User Created Successfully.  Now perform Login to get your token",
        })

class VerifyEmail(generics.GenericAPIView):
    def get(self , request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token ,settings.AWS_SECRET_ACCESS_KEY )
            print(payload)
            username = User.objects.get(pk= payload['user_id'])
            user = Student.objects.get(nusnet_id=username)
            if not user.is_verified:
                user.is_verified = True
                user.save()
            user.save()
            return Response({'email' : 'Successfully activated'} , status = status.HTTP_200_OK)

        except jwt.ExpiredSignatureError as identifier:
            # if activation expired ,user will need to create a new user
            username.delete()
            user.delete()
            return Response({'error' : 'Activation Expired , Register again Please!'} , status = status.HTTP_400_BAD_REQUEST)
            
        except jwt.exceptions.DecodeError as identifier:
            username.delete()
            user.delete()
            return Response({'error' : 'Invalid Token , Register again Please!'} , status = status.HTTP_400_BAD_REQUEST)


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
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.data
        user = User.objects.get(username=user_data['username'])
        return Response(get_tokens_for_user(user), status=status.HTTP_200_OK)

    def get_tokens_for_user(user):
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    

    


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

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(
            instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
            reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string('user_reset_password.html', context)
    email_plaintext_message = render_to_string('user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()