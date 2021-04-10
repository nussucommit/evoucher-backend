from django.urls import path

from organization.views import OrganizationDetail, OrganizationList, getOrgWoUname

urlpatterns = [
    path('organization', OrganizationList.as_view()),
    path('organization/notsignup', getOrgWoUname),
    path('organization/<str:pk>', OrganizationDetail.as_view()),
]