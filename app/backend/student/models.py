from django.db import models

from faculty.models import Faculty
from organization.models import Organization
from voucher.models import Voucher, Code
from django.contrib.auth.models import User

# Create your models here.
class Student(models.Model):
    nusnet_id = models.CharField(max_length=16, blank=False, unique=True)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    name = models.CharField(max_length=128, blank=False)
    year = models.PositiveIntegerField(blank=False)

    faculties = models.ManyToManyField(Faculty, related_name='students_faculties', through='InFaculty',)
    organizations = models.ManyToManyField(Organization, related_name='students_organizations', through='InOrganization')
    vouchers = models.ManyToManyField(Voucher, related_name='students_vouchers', through='Redeems')

    def __str__(self):
        return "{} ({})".format(self.name, self.nusnet_id)

class InFaculty(models.Model):
    faculty = models.ForeignKey(Faculty, related_name='faculty_to_student', on_delete=models.CASCADE)
    student = models.ForeignKey(Student, related_name='student_to_faculty', on_delete=models.CASCADE)

    def __str__(self):
        return "{} is in the faculty of {}".format(self.student, self.faculty)

    class Meta:
        unique_together = ('faculty', 'student')

class InOrganization(models.Model):
    organization = models.ForeignKey(Organization, related_name='organization_to_student', on_delete=models.CASCADE)
    student = models.ForeignKey(Student, related_name='student_to_organization', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('organization', 'student')

class Redeems(models.Model):
    voucher = models.ForeignKey(Voucher, related_name='voucher_to_student', on_delete=models.CASCADE)
    student = models.ForeignKey(Student, related_name='student_to_voucher', on_delete=models.CASCADE)
    date = models.DateTimeField(blank=True)

    class Meta:
        unique_together = ('voucher', 'student')


class IdCodeStudent(models.Model):
    voucher = models.UUIDField()
    code = models.ForeignKey(Code, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    def __str__(self):
        return "Voucher {} with code {} assigned to {}".format(self.voucher, self.code, self.student)