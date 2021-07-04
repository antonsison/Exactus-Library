from django.urls import path, re_path
from .api import Login, Logout, Register, User, Users

urlpatterns = [
    path('', Users.as_view({
        'get': 'get',
    }), name="users"),
    path('auth/', User.as_view({
        'get': 'get',
        'post': 'update',
    }), name="user_detail"),
    path('auth-user/', User.as_view({
        'get': 'get_current',
    }), name="current_user"),
    path('login/', Login.as_view(), name="login"),
    path('logout/', Logout.as_view(), name="logout"),
    path('register/', Register.as_view(), name="register"),
]