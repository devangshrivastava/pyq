from django.contrib import admin

# Register your models here.

from .models import Courses
from .models import File


# admin.site.register(Note)
admin.site.register(Courses)
admin.site.register(File)