from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import RegisterApi, change_password
from django.urls import path

from users.views import authenticator

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name='login_token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('register', RegisterApi.as_view()),
    path('changepassword/<str:pk>', change_password),
    path('studentlogin', authenticator)
]