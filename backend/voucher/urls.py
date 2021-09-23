from django.urls import path
from django.conf.urls import url

from voucher.views import VoucherDetail, CreateVoucherList, upload_email_list, upload_code_list, assign_codes, get_num_codes, CreateOrganizationInVoucherList, VoucherTypeList, get_codes_from_email, get_codes_by_code_list, get_codes_by_voucher, get_dynamic_voucher, upload_both_files

urlpatterns = [
    path('voucher/', CreateVoucherList.as_view()),
    path('voucher/email-list', upload_email_list, name='upload-email' ),
    path('voucher/code-list', upload_code_list, name='upload-code' ),
    path('voucher/files', upload_both_files, name='upload-both-files'),
    path('voucher/assignCodes/', assign_codes, name='assign-codes' ),
    path('voucher/<str:id>/getNumCodes/', get_num_codes, name='get-num-codes' ),
    path('voucher/organization', CreateOrganizationInVoucherList.as_view()),
    path('voucher/type', VoucherTypeList.as_view()),
    path('voucher/<str:pk>', VoucherDetail.as_view()),
    path('voucher/<str:email>/getCodeByEmails/', get_codes_from_email, name='get-codes-from-email' ),
    path('voucher/<int:id>/getCodeByCodeList/', get_codes_by_code_list, name='get-codes-by-code_list' ),
    path('voucher/<str:id>/getCodeByVoucher/', get_codes_by_voucher, name='get-codes-by-voucher' ),
    path('voucher/getDynamicVoucher/', get_dynamic_voucher, name='get-dynamic-voucher' )
]