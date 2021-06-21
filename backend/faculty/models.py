from django.db import models

# Create your models here.
class Faculty(models.Model):
    name = models.CharField(primary_key=True, max_length=128)

    def __str__(self):
        return self.name