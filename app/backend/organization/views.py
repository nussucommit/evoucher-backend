from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.
from organization.models import Organization
from organization.serializers import OrganizationSerializer, OrganizationName

from evoucher.pagination_settings import PaginationSettings


class OrganizationList(generics.ListCreateAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    pagination_class = PaginationSettings


class OrganizationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

@api_view(['GET'])
def getOrgWoUname(request):
    organization = Organization.objects.filter(username='')
    serializer = OrganizationName(organization, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOrgnamebyUname(request, pk):
    organization = Organization.objects.filter(username=pk)
    serializer = OrganizationName(organization, many=True)
    return Response(serializer.data)
