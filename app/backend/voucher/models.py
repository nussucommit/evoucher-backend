from django.db import models

# Create your models here.
class Voucher(models.Model):
    id = models.CharField(primary_key=True, max_length=32, blank=False)
    posted_date = models.DateTimeField(blank=False)
    expiry_date = models.DateTimeField(blank=False)
    name = models.CharField(max_length=128, blank=False)
    description = models.TextField(blank=True)
    claims_left = models.PositiveIntegerField(blank=False)

    def __string__(self):
        return "{}: {}".format(self.id, self.name)