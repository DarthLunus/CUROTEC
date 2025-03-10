from django.urls import path
from .views import CreateUserAPIView, LoginUserAPIView  # Importe a nova view de login

urlpatterns = [
    path('create-user/', CreateUserAPIView.as_view(), name='create-user'),
    path('login/', LoginUserAPIView.as_view(), name='login-user'),
]
