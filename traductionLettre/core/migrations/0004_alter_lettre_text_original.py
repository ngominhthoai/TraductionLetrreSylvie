# Generated by Django 5.0.2 on 2024-02-20 12:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_lettre_status_alter_lettre_text_original_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lettre',
            name='text_original',
            field=models.TextField(blank=True, default='Thư mang số: ...', null=True),
        ),
    ]
