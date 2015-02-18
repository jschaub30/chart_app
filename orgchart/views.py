from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Org

class OrgList(ListView):
    model = Org
    template_name = 'orgchart/org_list.html'

class OrgChart(DetailView):
    model = Org
    template_name = 'orgchart/horizontal_tree.html'

