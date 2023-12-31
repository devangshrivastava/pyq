# Generated by Django 5.0 on 2024-01-09 11:05

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_alter_user_courses'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='courses',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, default=['n', 'o', '_', 'c', 'o', 'u', 'r', 's', 'e'], size=None),
        ),
    ]
