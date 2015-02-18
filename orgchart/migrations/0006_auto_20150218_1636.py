# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orgchart', '0005_auto_20150218_1615'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='org',
            name='json_url',
        ),
        migrations.AddField(
            model_name='org',
            name='json_file',
            field=models.FileField(default=b'json/bad.json', upload_to=b'json/%Y/%m/%d'),
            preserve_default=True,
        ),
    ]
