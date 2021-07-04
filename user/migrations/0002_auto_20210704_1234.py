# Generated by Django 3.2.4 on 2021-07-04 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='firstname',
            new_name='first_name',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='lastname',
            new_name='last_name',
        ),
        migrations.AddField(
            model_name='user',
            name='date_updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
