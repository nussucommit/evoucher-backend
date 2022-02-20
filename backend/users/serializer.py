from rest_framework import  serializers
from student.models import Student, InOrganization
from django.contrib.auth.models import User
from organization.models import Organization
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    nusnet_id = serializers.CharField(max_length=16, allow_blank=False)
    name = serializers.CharField(allow_blank=False)
    year = serializers.IntegerField(min_value=1, max_value=5)
    faculty1 = serializers.CharField(allow_blank=False,write_only=True)
    faculty2 = serializers.CharField(allow_blank=True , write_only=True)
    email = serializers.EmailField(allow_blank=False)

    class Meta:
        model = User
        fields = ('nusnet_id','email','password', 'name', 'year', 'faculty1', 'faculty2')
        extra_kwargs = {
            'password':{'write_only': True},
        }

    def create(self, validated_data):
        # Create new User instance
        user = User.objects.create_user(username = validated_data['nusnet_id'], password = validated_data['password'],email =validated_data['email'] )
        # Create new Student instance
        student = Student.objects.create(nusnet_id = validated_data['nusnet_id'],email =validated_data['email'],name=validated_data['name'], year=validated_data['year'] )
        # Get Organization instance using its name, or create it if it's not yet available
        fac1 = Organization.objects.get_or_create(name=validated_data['faculty1'])
        # Create the Many-to-many instance of InOrganization
        InOrganization.objects.create(organization=fac1[0], student=student)
        
        # Same thing but for the second faculty
        if validated_data['faculty2']:
            fac2 = Organization.objects.get_or_create(name=validated_data['faculty2'])
            InOrganization.objects.create(organization=fac2[0], student=student)
            
        return student

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        field = ('old_password', 'new_password', 'new_password2')
    
    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is incorrect"})
        return value
    
    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()

class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6)
    username = serializers.CharField(max_length=255, min_length=3)


    def get_tokens(self, obj):
        user = User.objects.get(username=obj['username'])
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

    class Meta:
        model = User
        fields = ['password', 'username']

    def validate(self, attrs):
        username = attrs.get('username', '')
        password = attrs.get('password', '')
        user = auth.authenticate(username=username, password=password)
        student = Student.objects.get(nusnet_id=username)

        

        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        if not student.is_verified:
            raise AuthenticationFailed('Email is not verified')

        return user

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)