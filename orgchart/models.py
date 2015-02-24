from django.db import models

# Create your models here.

class Org(models.Model):
    slug = models.SlugField(max_length=32, unique=True, help_text = 'Name of organization')  
    title = models.CharField(max_length=40, help_text = 'Title to display on chart')  
    root_email = models.EmailField(max_length=100)
    #json_url = models.URLField()
    json_file = models.FileField(upload_to = "json/%Y/%m/%d", default = "json/bad.json")
    date_created = models.DateTimeField(null=True, auto_now=True, auto_now_add=True)
    date_updated = models.DateTimeField(null=True, auto_now=True, auto_now_add=True)

    def __str__(self):
        return '%s, %s' % (self.slug, self.root_email)
