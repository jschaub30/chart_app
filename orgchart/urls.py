from django.conf.urls import url
from django.contrib.auth.decorators import login_required, permission_required
from orgchart.views import OrgList

urlpatterns = [
    url(r'^$', OrgList.as_view(), name='home'),
]
