from django.contrib import admin
from django.urls import path, include  # Verifique se 'include' está importado

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
]
