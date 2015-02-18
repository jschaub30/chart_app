# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orgchart', '0004_auto_20150218_1601'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='org',
            name='data_filename',
        ),
        migrations.AddField(
            model_name='org',
            name='json_url',
            field=models.URLField(default='file:///www/schaubj/orgchart/data/Kevin_J_Nowka.json'),
            preserve_default=False,
        ),
    ]
