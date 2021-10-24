from rest_framework import status, generics, filters
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny, IsAdminUser
from django.http import JsonResponse
from rest_framework.parsers import FormParser, JSONParser

# Create your views here.
from student.models import Student, InOrganization
from voucher.models import Voucher, Code, IdCodeEmail
from voucher.serializers import VoucherSerializer, OrganizationInVoucher, VoucherTypes#, CodeSerializer
from django.db.models import Q, Max
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from datetime import datetime, timedelta
import csv

from django.contrib.auth.models import User

from evoucher.pagination_settings import PaginationSettings

# to future tech team (aka radian, edward and kevin lol): pls rewrite the following logic. U can see from the git blame that
# I am extremely desparate to get this shit work hours before deadline. - Jing Quan
@api_view(['POST'])
def upload_email_list(request):

    voucherID = request.data['uuid']
    voucher = Voucher.objects.get(uuid=voucherID)

    file = request.FILES['email_list']
    decoded_file = file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)
    # initialClaimsLeft = voucher.counter

    for row in reader:
        email = row['\ufeffemail']
        # if the voucher is yet to be assigned to this email
        if IdCodeEmail.objects.filter(email=email).filter(voucher=voucher).first() == None:
            assign_codes_to_emails(voucherID, email)

    return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def upload_code_list(request):

    voucherID = request.data['uuid']
    voucher = Voucher.objects.get(uuid=voucherID)

    file = request.FILES['code_list']
    decoded_file = file.read().decode('utf-8-sig').splitlines()
    reader = csv.DictReader(decoded_file)

    for row in reader:
        Code.objects.create(code=row['code'], voucher=voucher)
    
    return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def upload_manual_codes(request, format=None):
    voucherID = request.data['uuid']
    voucher = Voucher.objects.get(uuid=voucherID)

    for code, email in request.data.dict().items():
        if code and code != 'uuid':
            Code.objects.create(code=code, voucher=voucher)
            assign_codes_to_emails(voucherID, email)

    return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def upload_both_files(request):
    voucherID = int(request.data['id'])
    voucher = Voucher.objects.get(id=voucherID)

    file = request.FILES['code_list']
    decoded_file = file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)

    # count = 0
    for row in reader:
        # count += 1
        Code.objects.create(code=row['code'], voucher=voucher)
    
    file = request.FILES['email_list']
    decoded_file = file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)

    for row in reader:
        email = row['\ufeffemail']
        # if the voucher is yet to be assigned to this email
        if IdCodeEmail.objects.filter(email=email).filter(voucher=voucher).first() == None:
            assign_codes_to_emails(voucherID, email)
    
    # voucher.counter = count
    # voucher.save()
    return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def assign_codes(request):
    voucherID = request.data['voucher']
    voucher = Voucher.objects.get(uuid=voucherID)

    email = request.data['email']

    if IdCodeEmail.objects.filter(email=email).filter(voucher=voucher).first() == None:
        assign_codes_to_emails(voucherID, email)

    return Response(status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_num_codes(request, id):
    voucher = Voucher.objects.get(id=id)
    num = Code.objects.filter(voucher = voucher).filter(isAssigned = False).count()
    return Response(data=num)

@api_view(['GET'])
def get_codes_from_email(request, email):
    idCodeEmail = IdCodeEmail.objects.filter(email=email).distinct('voucher').values()
    return JsonResponse({"data": list(idCodeEmail)})

@api_view(['GET'])
def get_no_codes_from_email(request, email):
    index_at = email.index('@')
    nusnet_id = email[:index_at]
    faculties = InOrganization.objects.filter(student__nusnet_id=nusnet_id).values_list('organization_id', flat=True)

    no_code_queryset = Voucher.objects.filter(voucher_type__iexact='No code').values()

    # For every voucher, check if student's faculty is inside the list of the voucher's eligible faculties
    eligible_no_code = list(filter(lambda voucher: any(faculty in voucher["eligible_faculties"] for faculty in list(faculties)), list(no_code_queryset)))
    
    return JsonResponse({"data": eligible_no_code})

@api_view(['GET'])
def get_codes_by_code_list(request, id):
    code2 = Code.objects.get(id=id)
    return Response(data=code2.code)

@api_view(['GET'])
def get_codes_by_voucher(request, id):
    codes = Code.objects.filter(voucher=id).values()
    return JsonResponse({"voucher": id, "data": list(codes)})

@api_view(['GET'])
def get_dynamic_voucher(request, email):
    index_at = email.index('@')
    nusnet_id = email[:index_at]
    faculties = InOrganization.objects.filter(student__nusnet_id=nusnet_id).values_list('organization_id', flat=True)

    vouchers_with_codes = Code.objects.filter(isAssigned=False).order_by('voucher').distinct('voucher').values_list('voucher', flat=True)
    dynamic_vouchers = Voucher.objects.filter(voucher_type="Dinamically allocated").values().filter(uuid__in=list(vouchers_with_codes)).values()
    redeemed_vouchers_id = list(IdCodeEmail.objects.filter(email=email).values_list('voucher', flat=True))
    redeemed_vouchers = Voucher.objects.filter(uuid__in=redeemed_vouchers_id).values()

    unredeemed_vouchers = dynamic_vouchers.difference(redeemed_vouchers)
    eligible_unredeemed = list(filter(lambda voucher: any(faculty in voucher["eligible_faculties"] for faculty in list(faculties)), list(unredeemed_vouchers)))

    return JsonResponse({"unredeemed": eligible_unredeemed, "redeemed": redeemed_vouchers_id})


def assign_codes_to_emails(voucher_id, email):
    voucher = Voucher.objects.get(uuid = voucher_id)
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
