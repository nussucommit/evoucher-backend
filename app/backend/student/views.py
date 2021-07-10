from rest_framework import generics

# Create your views here.
from student.models import Student
from student.serializers import StudentSerializer

from evoucher.pagination_settings import PaginationSettings


class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    pagination_class = PaginationSettings


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer