from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login as auth_login
from django.utils import timezone
from .models import Order
from .forms import CustomUserCreationForm
from .forms import CustomUserLoginForm
from django.contrib.auth import get_user_model

@api_view(['POST'])
def user_login(request):
    form = CustomUserLoginForm(request.data)
    if form.is_valid():
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        
        # 커스텀 인증 백엔드를 사용하여 사용자 인증 처리
        UserModel = get_user_model()
        user = UserModel.objects.get(username=username)
        if user.check_password(password):
            auth_login(request, user)
            return Response(status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def signup(request):
    form = CustomUserCreationForm(request.data)
    if form.is_valid():
        user = form.save()
        auth_login(request, user)
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def place_order(request):
    selected_foods = request.data.get('selectedFoodsList')
    order_number = request.data.get('order_number')
    customer_name = request.data.get('customer_name')

    for food in selected_foods:
        order = Order(
            order_number=order_number,
            customer_name=customer_name,
            order_date=timezone.now(),
            product_name=food['name'],
            quantity=food['quantity'],
        )
        order.save()

    menu_names = [food['name'] for food in selected_foods]
    quantities = [food['quantity'] for food in selected_foods]

    response_data = {
        'message': '음식 주문이 완료되었습니다.',
        'menu_names': menu_names,
        'quantities': quantities
    }
    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def current_points(request):
    user = request.user
    current_points = user.points
    
    response_data = {
        'points': current_points
    }
    return Response(response_data, status=status.HTTP_200_OK)
