from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('login/', views.user_login, name='user_login'),
    path('signup/', views.signup, name='signup'),
    path('place_order/', views.place_order, name='place_order'),
]
