from django.urls import path

from organization.views import OrganizationDetail, OrganizationList, getOrgWoUname, getOrgnamebyUname

urlpatterns = [
    path('organization', OrganizationList.as_view()),
    path('organization/notsignup', getOrgWoUname),
    path('organization/getorgbyuname/<str:pk>', getOrgnamebyUname),
    path('organization/<str:pk>', OrganizationDetail.as_view()),
]