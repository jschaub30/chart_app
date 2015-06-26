from django import forms

class LookupForm(forms.Form):
    email = forms.EmailField(label='Email', max_length=100)