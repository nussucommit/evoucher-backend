from django.contrib import admin
from voucher.models import Voucher, Code, IdCodeEmail
# Register your models here.
admin.site.register(Voucher)
admin.site.register(Code)
admin.site.register(IdCodeEmail)