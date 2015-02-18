# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orgchart', '0003_auto_20150218_1558'),
    ]

    operations = [
        migrations.RenameField(
            model_name='org',
            old_name='name',
            new_name='slug',
        ),
    ]
