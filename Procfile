release: cd backend && python manage.py migrate
web: cd app/backend && gunicorn evoucher.wsgi --workers=3 --threads=6
