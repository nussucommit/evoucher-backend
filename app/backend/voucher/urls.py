from django.urls import path
from django.conf.urls import url

from voucher.views import VoucherDetail, CreateVoucherList, CreateOrganizationInVoucherList, VoucherTypeList

urlpatterns = [
    path('voucher/', CreateVoucherList.as_view()),
    path('voucher/organization', CreateOrganizationInVoucherList.as_view()),
    path('voucher/type', VoucherTypeList.as_view()),
    path('voucher/<str:pk>', VoucherDetail.as_view())
]