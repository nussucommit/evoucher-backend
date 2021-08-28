from rest_framework import serializers

from organization.models import Organization
from voucher.models import Voucher
from student.models import Student, InOrganization


class StudentSerializer(serializers.ModelSerializer):
    organizations = serializers.PrimaryKeyRelatedField(many=True, queryset=Organization.objects.all(), read_only=False)
    vouchers = serializers.PrimaryKeyRelatedField(many=True, queryset=Voucher.objects.all(), read_only=False)

    class Meta:
        model = Student
        fields = '__all__'

class InOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InOrganization
        fields = ('organization', 'student')