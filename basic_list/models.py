from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Entry(models.Model):
    text = models.CharField(max_length=300)
    date = models.DateTimeField('date')
    category = models.IntegerField(default = 0)
    weight = models.IntegerField(default = 1)

    def __unicode__(self):  # Python 3: def __str__(self):
        return self.text
