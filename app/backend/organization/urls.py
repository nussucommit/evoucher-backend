from django.urls import path

from organization.views import OrganizationDetail, OrganizationList

urlpatterns = [
    path('organization', OrganizationList.as_view()),
    path('organization/<int:pk>', OrganizationDetail.as_view())
]