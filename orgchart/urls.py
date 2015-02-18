from django.conf.urls import url
from django.contrib.auth.decorators import login_required, permission_required
from orgchart.views import OrgList, OrgChart, RadialTreeChart

urlpatterns = [
    url(r'^$', OrgList.as_view(), name='home'),
    url(r'radial_tree/(?P<slug>[\w+]+)/$', RadialTreeChart.as_view(), name='radial_tree'),
    url(r'(?P<slug>[\w+]+)/$', OrgChart.as_view(), name='horizontal_tree'),
]
