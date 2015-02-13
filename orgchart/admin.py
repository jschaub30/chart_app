from django.contrib import admin
from .models import Org, Chart

class OrgAdmin(admin.ModelAdmin):
    # ...
    list_display = ('name', 'title', 'root_email', 'data_filename')

class ChartAdmin(admin.ModelAdmin):
    # ...
    list_display = ['name']
    
admin.site.register(Org, OrgAdmin)
admin.site.register(Chart, ChartAdmin)
