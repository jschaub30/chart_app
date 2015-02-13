from django.shortcuts import render
from django.views.generic import ListView
from .models import Org

class OrgList(ListView):
    model = Org
    template_name = 'orgchart/org_list.html'

