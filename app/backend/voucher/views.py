from rest_framework import generics

# Create your views here.
from voucher.models import Voucher
from voucher.serializers import VoucherSerializer

from evoucher.pagination_settings import PaginationSettings


class VoucherList(generics.ListCreateAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    pagination_class = PaginationSettings


class VoucherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer