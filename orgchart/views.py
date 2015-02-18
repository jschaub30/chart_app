from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Org

class OrgList(ListView):
    model = Org
    template_name = 'orgchart/org_list.html'

class OrgChart(DetailView):
    model = Org
    template_name = 'orgchart/horizontal_tree.html'

class RadialTreeChart(DetailView):
    model = Org
    template_name = 'orgchart/radial_tree.html'

    # def get_context_data(self, **kwargs):
    #     context = super(OrgChart, self).get_context_data(**kwargs)
    #     print 'hi'
    #     print self.kwargs['slug']
    #     return context