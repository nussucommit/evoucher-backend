from rest_framework import serializers

from voucher.models import Voucher


class VoucherSerializer(serializers.ModelSerializer):
    #student = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Voucher
        fields = '__all__'
    
class OrganizationInVoucher(serializers.ModelSerializer):

    class Meta:
        model = Voucher
        fields = ['organization']

class VoucherTypes(serializers.ModelSerializer):

    class Meta:
        model = Voucher
        fields = ['voucher_type']
