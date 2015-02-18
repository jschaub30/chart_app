# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orgchart', '0002_delete_chart'),
    ]

    operations = [
        migrations.AlterField(
            model_name='org',
            name='name',
            field=models.SlugField(help_text=b'Name of organization', unique=True, max_length=32),
            preserve_default=True,
        ),
    ]
