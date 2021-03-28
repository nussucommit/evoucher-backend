from rest_framework import status, generics, filters
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny, IsAdminUser

# Create your views here.
from voucher.models import Voucher
from voucher.serializers import VoucherSerializer
from django.db.models import Q
from datetime import datetime, timedelta

from evoucher.pagination_settings import PaginationSettings

class CreateVoucherList(generics.ListCreateAPIView):
    serializer_class = VoucherSerializer
    filter_backends = [filters.OrderingFilter]
    pagination_class = PaginationSettings
    permission_classes = (IsAuthenticatedOrReadOnly,) 

    def get_queryset(self):
        queryset = Voucher.objects.all()
        organization = self.request.query_params.get('Organization', None)
        faculty = self.request.query_params.get('Faculty', None)
        endDate = self.request.query_params.get('Available', None)
        orderBy = self.request.query_params.get('OrderBy',None)

        q = Q()
        if faculty and faculty != 'null':
            q &= Q(name__icontains=faculty.lower())
        if organization and organization != 'null':
            q &= Q(name__icontains=organization.lower())
        if endDate and endDate != 'null':
            toDateObj = datetime.strptime(endDate, '%Y-%m-%d %H:%M') - timedelta(days=1)
            print(toDateObj)
            q &= Q(expiry_date__gte=toDateObj)
        if orderBy and orderBy != 'null':
            return queryset.filter(q).order_by(orderBy)
        else:
            return queryset.filter(q)

class VoucherList(generics.ListAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = (IsAuthenticated,)

class VoucherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = (IsAuthenticated,)