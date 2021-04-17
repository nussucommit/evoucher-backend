from rest_framework import status, generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny, IsAdminUser
from django.http import JsonResponse

# Create your views here.
from voucher.models import Voucher, Email, Code, IdCodeEmail
from voucher.serializers import VoucherSerializer, EmailSerializer, OrganizationInVoucher, VoucherTypes#, CodeSerializer
from django.db.models import Q, Max
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from datetime import datetime, timedelta
import csv

from django.contrib.auth.models import User

from evoucher.pagination_settings import PaginationSettings

@api_view(['POST'])
def upload_email_list(request):
    
    voucherID = int(request.data['id'])
    voucher = Voucher.objects.get(id=voucherID)

    file = request.FILES['email_list']
    decoded_file = file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)
    initialClaimsLeft = voucher.counter

    for row in reader:
        value = row['\ufeffemail']
        email = None
        if Email.objects.filter(email=value).count() == 0:
            User.objects.create_user(value).save()
            email = Email.objects.create(email=value)
        else: 
            email = Email.objects.get(email=value)
        initialClaimsLeft -= assign_codes_to_emails(voucherID, email)
    
    voucher.counter = initialClaimsLeft
    voucher.save()

    return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def upload_code_list(request):

    voucherID = int(request.data['id'])
    voucher = Voucher.objects.get(id=voucherID)

    file = request.FILES['code_list']
    decoded_file = file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)
    count = 0
    for row in reader:
        count+= 1
        Code.objects.create(code=row['code'], voucher=voucher)
    
    voucher.counter = count
    voucher.save()
    return Response(status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_num_codes(request, id):
    voucher = Voucher.objects.get(id=id)
    num = Code.objects.filter(voucher = voucher).filter(isAssigned = False).count()
    return Response(data=num)

@api_view(['GET'])
def get_codes_from_email(request, email):
    email2 = Email.objects.get(email=email)
    idCodeEmail = IdCodeEmail.objects.filter(email=email2).values()
    print(idCodeEmail)
    return JsonResponse({"data": list(idCodeEmail)})

@api_view(['GET'])
def get_codes_by_code_list(request, id):
    code2 = Code.objects.get(id=id)
    return Response(data=code2.code)


def assign_codes_to_emails(vid, email):
    voucher = Voucher.objects.get(id=vid)
    code = Code.objects.filter(voucher = voucher).filter(isAssigned = False).first()
    count = 1

    if code == None:
        count = 0
        code = Code.objects.create(code='N/A', voucher=voucher, isAssigned=True)
    
    code.isAssigned = True
    code.save()
    IdCodeEmail.objects.create(voucher = voucher, email = email, code = code)
    return count

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
    permission_classes = (IsAuthenticatedOrReadOnly,)
