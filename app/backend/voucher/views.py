from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny

# Create your views here.
from voucher.models import Voucher
from voucher.serializers import VoucherSerializer

from evoucher.pagination_settings import PaginationSettings


# class CreateVoucherList(generics.ListCreateAPIView):
#     queryset = Voucher.objects.all()
#     serializer_class = VoucherSerializer
#     pagination_class = PaginationSettings
#     permission_classes = (AllowAny,) #IsAuthenticatedOrReadOnly,) to change

class CreateVoucherList(generics.ListCreateAPIView):
    serializer_class = VoucherSerializer
    filter_backends = [filters.OrderingFilter]
    pagination_class = PaginationSettings
    permission_classes = (AllowAny,) 

    def get_queryset(self):
        queryset = Voucher.objects.all()
        name = self.request.query_params.get('name', None)
        fromDate = self.request.query_params.get('fromDate', None)
        toDate = self.request.query_params.get('toDate', None)
        status = self.request.query_params.get('status', None)

        available_date = self.request.query_params.get('available', None)
        expiry_date = self.request.query_params.get('expiry_date',None)
        name = self.request.query_params.get('name', None)

        q = Q()
        if name and name != 'null':
            q &= Q(name__icontains=name.lower())
        if fromDate and fromDate != 'null':
            q &= Q(time_booked__gte=fromDate)
        if toDate and toDate != 'null':
            toDateObj = datetime.strptime(toDate, '%Y-%m-%d %H:%M') + timedelta(days=1)
            q &= Q(time_booked__lte=toDateObj)
        if status and status != 'null':
            q &= Q(status__icontains=status.lower())

        return queryset.filter(q)

class VoucherList(generics.ListAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = (AllowAny,) #(IsAuthenticated,)


class VoucherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = (AllowAny,) #(IsAuthenticated,)