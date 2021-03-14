from django.urls import path
from django.conf.urls import url

from voucher.views import VoucherDetail, CreateVoucherList, CreateVoucher

urlpatterns = [
    url('voucher/', CreateVoucherList.as_view()),
    url('voucher/<str:pk>', VoucherDetail.as_view()),
    url('voucher/add', CreateVoucher.as_view())
]