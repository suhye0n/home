from django.contrib import admin
from .models import Order
from .models import CustomUser

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_number', 'customer_name', 'order_date']

admin.site.register(CustomUser)
