from django.contrib import admin
from django.urls import path
from django.urls.conf import include, re_path
from django.views.generic.base import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    # path('users/', include('Users.urls')),
    # path('system/', include('System.urls')),

]

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]