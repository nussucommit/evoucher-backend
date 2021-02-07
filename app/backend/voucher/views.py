from rest_framework import generics

# Create your views here.
from voucher.models import Voucher
from voucher.serializers import VoucherSerializer


class VoucherList(generics.ListCreateAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer


class VoucherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer