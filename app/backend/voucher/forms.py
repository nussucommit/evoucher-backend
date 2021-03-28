from django import forms
from voucher.models import Voucher

class EmailListForm(forms.ModelForm):

    class Meta:
        model = Voucher
        fields = ['email_list']
