# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-03-21 13:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basic_list', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='date',
            field=models.DateTimeField(verbose_name='date'),
        ),
    ]