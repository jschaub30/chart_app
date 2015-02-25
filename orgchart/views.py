from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.shortcuts import redirect
from .models import Org
import json

class OrgList(ListView):
    model = Org
    template_name = 'orgchart/org_list.html'

    def get_context_data(self, **kwargs):
        context = super(OrgList, self).get_context_data(**kwargs)
        context['object_list'] = context['object_list'].order_by('title')
        return context

class OrgChart(DetailView):
    model = Org
    template_name = 'orgchart/horizontal_tree.html'
    def get_context_data(self, **kwargs):
        context = super(OrgChart, self).get_context_data(**kwargs)
        try:
            email = self.kwargs['email']
            print email
        except:
            pass
        return context

class RadialTreeChart(DetailView):
    model = Org
    template_name = 'orgchart/radial_tree.html'

class BubbleChart(DetailView):
    model = Org
    template_name = 'orgchart/bubble.html'

def lookup_email(request, email):
    # View code here...
    print email
    if 'org_lookup' not in globals().keys():
        global org_lookup
        org_lookup = lookup_org()
    slug = 'Research'
    if email in org_lookup:
        slug = org_lookup[email]
    return redirect('horizontal_tree', slug=slug, email=email)
    
def lookup_org():
    in_fn = 'orgchart/fixtures/org_lookup.json'
    with open(in_fn, 'r') as f:
        org_table = json.loads(f.read())

    return org_table