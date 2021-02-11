from rest_framework import serializers

from voucher.models import Voucher


class VoucherSerializer(serializers.ModelSerializer):
    #student = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Voucher
        fields = ('id', 'posted_date', 'expiry_date', 'name', 'description', 'claims_left')