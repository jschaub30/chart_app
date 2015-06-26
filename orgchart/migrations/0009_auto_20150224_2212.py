# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orgchart', '0008_auto_20150224_2211'),
    ]

    operations = [
        migrations.AlterField(
            model_name='org',
            name='date_created',
            field=models.DateTimeField(auto_now=True, auto_now_add=True, null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='org',
            name='date_updated',
            field=models.DateTimeField(auto_now=True, auto_now_add=True, null=True),
            preserve_default=True,
        ),
    ]
