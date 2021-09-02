from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
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

@api_view(['GET'])
def getOrgWoUname(request):
    organization = Organization.objects.filter(username='')
    serializer = OrganizationSerializer(organization, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOrgnamebyUname(request, pk):
    organization = Organization.objects.get(username=pk)
    serializer = OrganizationSerializer(organization)
    return Response(serializer.data)

@api_view(['POST'])
def verifyOrganization(request):
    organization = Organization.objects.filter(username=request.data['username']).first()
    if organization:
        return Response({'status': 'found'}, status=status.HTTP_200_OK)
    return Response({'status': 'not found'}, status=status.HTTP_404_NOT_FOUND)