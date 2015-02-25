from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Org

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

class RadialTreeChart(DetailView):
    model = Org
    template_name = 'orgchart/radial_tree.html'

class BubbleChart(DetailView):
    model = Org
    template_name = 'orgchart/bubble.html'

