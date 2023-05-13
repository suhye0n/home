from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    points = models.IntegerField(default=0)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='user_related',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='user_related',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username

class Order(models.Model):
    order_number = models.CharField(max_length=50)
    customer_name = models.CharField(max_length=100)
    order_date = models.DateTimeField(auto_now_add=True)
    product_name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return self.order_number
