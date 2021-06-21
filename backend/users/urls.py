from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import RegisterApi, change_password, UserLogoutView
from django.urls import path, re_path

from users.views import authenticator

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name='login_token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    # path('logout', UserLogoutView.as_view(), name="user-logout"),
    re_path(r"^logout/$", UserLogoutView.as_view(), name="user-logout"),
    path('register', RegisterApi.as_view()),
    path('changepassword/<str:pk>', change_password),
    path('studentlogin', authenticator)
]