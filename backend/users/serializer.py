from rest_framework import  serializers
from django.contrib.auth.models import User
from student.models import Student, InOrganization
from organization.models import Organization

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
        # Create new User instance
        user = User.objects.create_user(username = validated_data['username'], password = validated_data['password'] )
        # Create new Student instance
        student = Student.objects.create(nusnet_id=validated_data['username'], name=validated_data['name'], year=validated_data['year'] )
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

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'