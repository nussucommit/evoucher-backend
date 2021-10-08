# Generated by Django 3.1.2 on 2021-10-08 07:07

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('organization', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Code',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=128)),
                ('isAssigned', models.BooleanField(default=False)),
                ('isRedeemed', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['code'],
            },
        ),
        migrations.CreateModel(
            name='Voucher',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('posted_date', models.DateTimeField()),
                ('available_date', models.DateTimeField()),
                ('expiry_date', models.DateTimeField()),
                ('name', models.CharField(max_length=128)),
                ('voucher_type', models.CharField(max_length=32)),
                ('description', models.TextField(blank=True)),
                ('counter', models.PositiveIntegerField()),
                ('image', models.ImageField(upload_to='')),
                ('code_uploaded', models.BooleanField(default=False)),
                ('organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='voucher_to_organization', to='organization.organization')),
            ],
        ),
        migrations.CreateModel(
            name='IdCodeEmail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=128)),
                ('code', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='voucher.code')),
                ('voucher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='voucher.voucher')),
            ],
        ),
        migrations.AddField(
            model_name='code',
            name='voucher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='voucher.voucher'),
        ),
    ]
