from rest_framework import serializers

from voucher.models import Voucher, Email


class VoucherSerializer(serializers.ModelSerializer):
    #student = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Voucher
        fields = '__all__'

class EmailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Email
        fields = '__all__'
