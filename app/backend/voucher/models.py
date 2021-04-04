from django.db import models
from organization.models import Organization

# Create your models here.
class Voucher(models.Model):
    voucher_id = models.CharField(max_length=32, blank=False)
    posted_date = models.DateTimeField(blank=False)
    available_date = models.DateTimeField(blank=False)
    expiry_date = models.DateTimeField(blank=False)
    name = models.CharField(max_length=128, blank=False)
    organization = models.ForeignKey(Organization, related_name='voucher_to_organization', on_delete=models.CASCADE)
    voucher_type = models.CharField(max_length=32, blank=False)
    description = models.TextField(blank=True)
    counter = models.PositiveIntegerField(blank=False)
    image = models.ImageField(upload_to='assets')
    code_list = models.FileField(upload_to='codes', blank=True, null=True)

    def __string__(self):
        return "{}: {}".format(self.voucher_id, self.name)

class Code(models.Model):
    code = models.CharField(max_length=128)
    voucher = models.ForeignKey(Voucher, on_delete=models.CASCADE)

    def __str__(self):
        return self.code

    class Meta:
        ordering = ['code']
