from django.urls import path
from django.conf.urls import url

from voucher.views import VoucherDetail, CreateVoucherList, upload_email_list

urlpatterns = [
    path('voucher/', CreateVoucherList.as_view()),
    path('voucher/addEmails/', upload_email_list, name='upload-email' ),
    path('voucher/<str:pk>', VoucherDetail.as_view())
]