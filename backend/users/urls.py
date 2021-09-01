from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import RegisterApi, change_password, UserLogoutView, ChangePasswordView, UserView
from django.urls import path, re_path

from users.views import authenticator

urlpatterns = [
    path('user/<pk>', UserView.as_view(), name='user'),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'), #temporary workaround
    path('login', TokenObtainPairView.as_view(), name='login_token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    re_path(r"^logout$", UserLogoutView.as_view(), name="user-logout"),
    path('register', RegisterApi.as_view()),
    path('changepassword', ChangePasswordView.as_view(), name="user-changepassword"),
    path('studentlogin', authenticator)
]