from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User


class PasswordlessAuthBackend(ModelBackend):
    """Log in to Django without providing a password.

    """
    def authenticate(self, username=None):
        return User.objects.filter(username__iexact=username).first()

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None