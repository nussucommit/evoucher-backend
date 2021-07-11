import django_heroku
import dj_database_url

from evoucher.settings.base import *

# Static files

STATIC_ROOT = 'static'

# Security

DEBUG = False

SECRET_KEY = os.getenv('EVOUCHER_SECRET_KEY')

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = dict()
DATABASES['default'] = dj_database_url.config(conn_max_age=600, ssl_require=True)

# CORS settings
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = (
    'http://127.0.0.1:3000',
    'http://localhost:3000', # temporary
    os.getenv('EVOUCHER_FRONT_END_DOMAIN'),
)

# Communication settings

ALLOWED_HOSTS += [
    os.getenv('EVOUCHER_DOMAIN')
]

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": True,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUDIENCE": None,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(hours=6),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=7),
}

CSRF_COOKIE_SECURE = True

FRONT_END_DOMAIN = os.getenv('EVOUCHER_FRONT_END_DOMAIN')
FRONT_END_DOMAIN = 'http://localhost:3000'

SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_HSTS_SECONDS = 60
SECURE_REFERRER_POLICY = 'same-origin'
SECURE_SSL_REDIRECT = True

SESSION_COOKIE_SECURE = True

# Activate Django-Heroku.
django_heroku.settings(locals())