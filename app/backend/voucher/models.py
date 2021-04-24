from django.db import models
from organization.models import Organization
from s3direct.fields import S3DirectField

# Create your models here.
class Voucher(models.Model):
    # please include uuidfield as the primary key instead.
    posted_date = models.DateTimeField(blank=False)
    available_date = models.DateTimeField(blank=False)
    expiry_date = models.DateTimeField(blank=False)
    name = models.CharField(max_length=128, blank=False)
    organization = models.ForeignKey(Organization, related_name='voucher_to_organization', on_delete=models.CASCADE)
    voucher_type = models.CharField(max_length=32, blank=False)
    description = models.TextField(blank=True)
    counter = models.PositiveIntegerField(blank=False)
    image = S3DirectField(dest='primary_destination')
    code_uploaded = models.BooleanField(default=False)

    def __string__(self):
        return "{}: {}".format(self.voucher_id, self.name)

class Code(models.Model):
    code = models.CharField(max_length=128)
    voucher = models.ForeignKey(Voucher, on_delete=models.CASCADE)
    isAssigned = models.BooleanField(default=False)

    def __str__(self):
        return self.code

    class Meta:
        ordering = ['code']

class Email(models.Model):
    email = models.CharField(max_length=40)
    #voucher = models.ForeignKey(Voucher, on_delete=models.CASCADE)

    def __str__(self):
        return self.email


class IdCodeEmail(models.Model):
    voucher = models.ForeignKey(Voucher, on_delete=models.CASCADE)
    code = models.ForeignKey(Code, on_delete=models.CASCADE)
    email = models.ForeignKey(Email, on_delete=models.CASCADE)

    def __str__(self):
        return "Voucher {}: {} assigned to {}".format(self.voucher, self.code, self.email)