from django.urls import path

from student.views import StudentDetail, StudentList

urlpatterns = [
    path('student', StudentList.as_view()),
    path('student/<str:pk>', StudentDetail.as_view())
]