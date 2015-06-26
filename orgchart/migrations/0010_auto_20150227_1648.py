# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orgchart', '0009_auto_20150224_2212'),
    ]

    operations = [
        migrations.AlterField(
            model_name='org',
            name='title',
            field=models.CharField(help_text=b'Title to display on chart', max_length=100),
            preserve_default=True,
        ),
    ]
