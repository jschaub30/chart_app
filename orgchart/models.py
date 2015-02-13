from django.db import models

# Create your models here.

class Org(models.Model):
    name = models.CharField(max_length=20, help_text = 'Name of organization')  
    title = models.CharField(max_length=40, help_text = 'Title to display on chart')  
    root_email = models.EmailField(max_length=100)
    data_filename = models.FileField()

    def __str__(self):
        return self.name + ': ' + self.root_email
        
class Chart(models.Model):
    name = models.CharField(max_length=20, help_text = 'Name of chart type')
    javascript = models.CharField(max_length=10000, help_text = 'javascript to render chart')
    def __str__(self):
        return self.name
    