from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.shortcuts import redirect
from .models import Org
from .forms import LookupForm
import json

class OrgList(ListView):
    model = Org
    template_name = 'orgchart/org_list.html'

    def get_context_data(self, **kwargs):
        context = super(OrgList, self).get_context_data(**kwargs)
        context['object_list'] = context['object_list'].order_by('title')
        orgs = Org.objects.all().order_by('title')
        for k in range(len(orgs)):
            orgs[k].root_name = orgs[k].json_file.url.strip('/media/latest').replace('.json', '').replace('_', ' ')
        context['object_list'] = orgs
        return context

class OrgChart(DetailView):
    model = Org
    template_name = 'orgchart/horizontal_tree.html'
    def get_context_data(self, **kwargs):
        context = super(OrgChart, self).get_context_data(**kwargs)
        try:
            email = self.kwargs['email']
            context['lookup_email'] = email
        except:
            pass
        context['form'] = LookupForm()
        return context
    def post(self, request, *args, **kwargs):
        form = LookupForm(request.POST)
        print form
        email = form.data['email']
        return lookup_email(request, email)


class RadialTreeChart(DetailView):
    model = Org
    template_name = 'orgchart/radial_tree.html'

class BubbleChart(DetailView):
    model = Org
    template_name = 'orgchart/bubble.html'

def lookup_email(request, email):
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