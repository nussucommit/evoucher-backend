from rest_framework import generics

# Create your views here.
from faculty.models import Faculty
from faculty.serializers import FacultySerializer

from evoucher.pagination_settings import PaginationSettings


class FacultyList(generics.ListCreateAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    pagination_class = PaginationSettings


class FacultyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer