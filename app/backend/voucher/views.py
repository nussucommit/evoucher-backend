from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny

# Create your views here.
from voucher.models import Voucher
from voucher.serializers import VoucherSerializer


class CreateVoucherList(generics.ListCreateAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = (AllowAny,) #IsAuthenticatedOrReadOnly,) to change after adding admin page


class VoucherList(generics.ListAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = (AllowAny,) #(IsAuthenticated,)


class VoucherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = (AllowAny,) #(IsAuthenticated,)