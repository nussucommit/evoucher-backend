from rest_framework import serializers

from organization.models import Organization


class OrganizationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Organization
        fields = '__all__'

class OrganizationName(serializers.ModelSerializer):

    class Meta:
        model = Organization
        fields = ['name']