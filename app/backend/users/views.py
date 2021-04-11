from datetime import datetime, timedelta

import jwt
from django.conf import settings

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.auth_backend import PasswordlessAuthBackend
from django.contrib.auth import login
from rest_framework_simplejwt.tokens import RefreshToken

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