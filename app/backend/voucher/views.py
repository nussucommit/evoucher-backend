from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny

# Create your views here.
from voucher.models import Voucher
from voucher.serializers import VoucherSerializer

from evoucher.pagination_settings import PaginationSettings


class CreateVoucherList(generics.ListCreateAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    pagination_class = PaginationSettings
    permission_classes = (IsAuthenticatedOrReadOnly,) 


class VoucherList(generics.ListAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = (IsAuthenticated,)


class VoucherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = (IsAuthenticated,)