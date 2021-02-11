from django.urls import path

from voucher.views import VoucherDetail, CreateVoucherList

urlpatterns = [
    path('voucher', CreateVoucherList.as_view()),
    path('voucher/<str:pk>', VoucherDetail.as_view())
]