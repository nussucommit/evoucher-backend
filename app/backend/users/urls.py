from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.urls import path

from users.views import authenticator

urlpatterns = [
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('studentlogin', authenticator)
]