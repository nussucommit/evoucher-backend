import django_heroku
import dj_database_url
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

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
    'http://localhost:3000',
    os.getenv('EVOUCHER_FRONT_END_DOMAIN'),
)

# Communication settings

ALLOWED_HOSTS += [
    os.getenv('EVOUCHER_DOMAIN')
]

CSRF_COOKIE_SECURE = True

FRONT_END_DOMAIN = os.getenv('EVOUCHER_FRONT_END_DOMAIN')

SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_HSTS_SECONDS = 60
SECURE_REFERRER_POLICY = 'same-origin'
SECURE_SSL_REDIRECT = True

SESSION_COOKIE_SECURE = True

# Activate Django-Heroku.
django_heroku.settings(locals())

sentry_sdk.init(
    dsn="https://04910488757c4c718d6501f19fc058da@o991583.ingest.sentry.io/5948610",
    integrations=[DjangoIntegration()],

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0,

    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True,
    environment="production",
)
