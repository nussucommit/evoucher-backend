from rest_framework import status, generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny, IsAdminUser

# Create your views here.
from voucher.models import Voucher, Email, Code
from voucher.serializers import VoucherSerializer, EmailSerializer, OrganizationInVoucher, VoucherTypes
from django.db.models import Q, Max
from datetime import datetime, timedelta
import csv

from evoucher.pagination_settings import PaginationSettings

@api_view(['POST'])
def upload_email_list(request):
    
    voucherID = int(request.data['id'])
    voucher = Voucher.objects.get(id=voucherID)

    print("haha")
    file = request.FILES['email_list']
    decoded_file = file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)

    for row in reader:
        Email.objects.create(email=row['\ufeffEmail'], voucher=voucher)
    return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def upload_code_list(request):
    
    voucherID = int(request.data['id'])
    voucher = Voucher.objects.get(id=voucherID)

    file = request.FILES['code_list']
    decoded_file = file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)

    for row in reader:
        Code.objects.create(code=row['\ufeffcode'], voucher=voucher)
    return Response(status=status.HTTP_201_CREATED)

class CreateVoucherList(generics.ListCreateAPIView):
    serializer_class = VoucherSerializer
    filter_backends = [filters.OrderingFilter]
    pagination_class = PaginationSettings
    permission_classes = (IsAuthenticatedOrReadOnly,) 

    def get_queryset(self):
        queryset = Voucher.objects.all()
        vouchertype = self.request.query_params.get('VoucherType', None)
        organization = self.request.query_params.get('Organization', None)
        faculty = self.request.query_params.get('Faculty', None)
        endDate = self.request.query_params.get('Available', None)
        orderBy = self.request.query_params.get('OrderBy',None)

        q = Q()
        if faculty and faculty != 'null':
            q &= Q(name__icontains=faculty.lower())
        # if organization and organization != 'null':
        #     q &= Q(organization=organization)
        if vouchertype and vouchertype != 'null':
            q &= Q(voucher_type=vouchertype)
        if organization and organization != 'null':
            q &= Q(organization=organization)
        if vouchertype and vouchertype != 'null':
            q &= Q(voucher_type=vouchertype)
        if endDate and endDate != 'null':
            toDateObj = datetime.strptime(endDate, '%Y-%m-%d %H:%M') - timedelta(days=1)
            print(toDateObj)
            q &= Q(expiry_date__gte=toDateObj)
        if orderBy and orderBy != 'null':
            return queryset.filter(q).order_by(orderBy)
        else:
            return queryset.filter(q)

class CreateOrganizationInVoucherList(generics.ListCreateAPIView):
    queryset = Voucher.objects.all()
    serializer_class = OrganizationInVoucher
    permission_classes = (AllowAny,) 

class VoucherTypeList(generics.ListCreateAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherTypes
    permission_classes = (AllowAny,) 

class VoucherList(generics.ListAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = (IsAuthenticated,)

class VoucherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = (IsAuthenticated,)