from django.urls import path

from faculty.views import FacultyDetail, FacultyList

urlpatterns = [
    path('faculty', FacultyList.as_view()),
    path('faculty/<str:pk>', FacultyDetail.as_view())
]