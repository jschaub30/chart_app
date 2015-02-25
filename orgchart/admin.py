from django.contrib import admin
from .models import Org

class OrgAdmin(admin.ModelAdmin):
    # ...
    list_display = ('slug', 'title', 'root_email')


admin.site.register(Org, OrgAdmin)
