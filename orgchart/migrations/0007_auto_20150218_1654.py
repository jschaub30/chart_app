# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('orgchart', '0006_auto_20150218_1636'),
    ]

    operations = [
        migrations.AddField(
            model_name='org',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2015, 2, 18, 16, 53, 56, 764764, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='org',
            name='date_updated',
            field=models.DateTimeField(default=datetime.datetime(2015, 2, 18, 16, 54, 3, 949444, tzinfo=utc), auto_now=True, auto_now_add=True),
            preserve_default=False,
        ),
    ]
