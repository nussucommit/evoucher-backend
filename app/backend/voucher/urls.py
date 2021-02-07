from django.urls import path

from voucher.views import VoucherDetail, VoucherList

urlpatterns = [
    path('voucher', VoucherList.as_view()),
    path('voucher/<int:pk>', VoucherDetail.as_view())
]