from django.contrib import admin
from voucher.models import Voucher, Code, Email, IdCodeEmail
# Register your models here.
admin.site.register(Voucher)
admin.site.register(Code)
admin.site.register(Email)
admin.site.register(IdCodeEmail)