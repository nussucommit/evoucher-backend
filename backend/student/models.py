from django.db import models

from organization.models import Organization

# Create your models here.
class Student(models.Model):
    nusnet_id = models.CharField(primary_key=True, max_length=16, blank=False, unique=True)
    name = models.CharField(max_length=128, blank=False)
    year = models.PositiveIntegerField(blank=False)

    organizations = models.ManyToManyField(Organization, related_name='students_organizations', through='InOrganization')

    def __str__(self):
        return "{}: {}".format(self.nusnet_id, self.name)

class InOrganization(models.Model):
    organization = models.ForeignKey(Organization, related_name='organization_to_student', on_delete=models.CASCADE)
    student = models.ForeignKey(Student, related_name='student_to_organization', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('organization', 'student')