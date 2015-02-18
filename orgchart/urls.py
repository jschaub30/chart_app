from django.conf.urls import url
from django.contrib.auth.decorators import login_required, permission_required
from orgchart.views import OrgList, OrgChart

urlpatterns = [
    url(r'^$', OrgList.as_view(), name='home'),
    url(r'(?P<slug>[\w+]+)/$', OrgChart.as_view(), name='org_chart'),
]
