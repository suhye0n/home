from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.forms import UserCreationForm

@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        auth_login(request, user)
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def signup(request):
    form = UserCreationForm(request.data)
    if form.is_valid():
        form.save()
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def place_order(request):
    category = request.data.get('category')
    food = request.data.get('food')
    
    response_data = {
        'message': '음식 주문이 완료되었습니다.'
    }
    return Response(response_data, status=status.HTTP_200_OK)
