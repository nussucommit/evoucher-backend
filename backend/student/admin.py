from django.contrib import admin
from student.models import Student, InFaculty, InOrganization, Redeems
# Register your models here.
admin.site.register(Student)
admin.site.register(InFaculty)
admin.site.register(InOrganization)
admin.site.register(Redeems)