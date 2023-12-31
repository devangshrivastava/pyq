# Generated by Django 5.0 on 2024-01-02 10:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('course_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('course_name', models.CharField(max_length=100)),
                ('credits', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_type', models.CharField(choices=[('Tutorials', 'Tutorials'), ('Minor', 'Minor')], max_length=50)),
                ('file_nme', models.CharField(max_length=50)),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='files', to='core.courses', verbose_name='course')),
            ],
        ),
    ]
