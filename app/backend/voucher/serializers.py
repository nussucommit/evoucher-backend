from rest_framework import serializers

from voucher.models import Voucher, Code

class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields='__all__'

class VoucherSerializer(serializers.ModelSerializer):
    #student = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    #codes = CodeSerializer(many=True, read_only=False)

    class Meta:
        model = Voucher
        fields = '__all__'
