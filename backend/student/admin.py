from django.contrib import admin
from student.models import Student, InOrganization
# Register your models here.
admin.site.register(Student)
admin.site.register(InOrganization)