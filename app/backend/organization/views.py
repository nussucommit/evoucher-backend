from rest_framework import generics

# Create your views here.
from organization.models import Organization
from organization.serializers import OrganizationSerializer

from evoucher.pagination_settings import PaginationSettings


class OrganizationList(generics.ListCreateAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    pagination_class = PaginationSettings


class OrganizationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer