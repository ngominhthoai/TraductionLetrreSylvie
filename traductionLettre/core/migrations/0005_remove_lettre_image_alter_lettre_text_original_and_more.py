# Generated by Django 5.0.2 on 2024-03-05 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_lettre_text_original'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lettre',
            name='image',
        ),
        migrations.AlterField(
            model_name='lettre',
            name='text_original',
            field=models.TextField(blank=True, default=' ', null=True),
        ),
        migrations.AlterField(
            model_name='lettre',
            name='text_traduction',
            field=models.TextField(blank=True, default=' ', null=True),
        ),
    ]