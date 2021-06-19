from rest_framework import  serializers
from rest_framework.permissions import IsAuthenticated
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from student.models import Student, InFaculty
from faculty.models import Faculty

# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(allow_blank=False)
    year = serializers.IntegerField(min_value=1, max_value=5)
    faculty1 = serializers.CharField(allow_blank=False)
    faculty2 = serializers.CharField(allow_blank=True)

    class Meta:
        model = User
        fields = ('username','password', 'name', 'year', 'faculty1', 'faculty2')
        extra_kwargs = {
            'password':{'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(username = validated_data['username'], password = validated_data['password'] )
        student = Student.objects.create(user=user, nusnet_id=validated_data['username'], name=validated_data['name'], year=validated_data['year'] )
        fac1, created = Faculty.objects.get_or_create(name=validated_data['faculty1'])
        InFaculty.objects.create(faculty=fac1, student=student)
        
        if validated_data['faculty2']:
            fac2, created = Faculty.objects.get_or_create(name=validated_data['faculty2'])
            InFaculty.objects.create(faculty=fac2, student=student)
            
        return student

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'