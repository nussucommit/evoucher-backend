from rest_framework import serializers

from faculty.models import Faculty
from organization.models import Organization
from voucher.models import Voucher
from student.models import Student, InFaculty, InOrganization, Redeems


class StudentSerializer(serializers.ModelSerializer):
    faculties = serializers.PrimaryKeyRelatedField(many=True, queryset=Faculty.objects.all(), read_only=False)
    organizations = serializers.PrimaryKeyRelatedField(many=True, queryset=Organization.objects.all(), read_only=False)
    vouchers = serializers.PrimaryKeyRelatedField(many=True, queryset=Voucher.objects.all(), read_only=False)

    class Meta:
        model = Student
        fields = ('nusnet_id', 'name', 'year', 'faculties', 'organizations', 'vouchers')


class InFacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = InFaculty
        fields = ('faculty', 'student')
    
class InOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InOrganization
        fields = ('organization', 'student')

class RedeemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Redeems
        fields = ('voucher', 'student', 'date')