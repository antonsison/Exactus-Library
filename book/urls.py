from django.urls import path, re_path
from .api import BookViewSet

urlpatterns = [
    path('', BookViewSet.as_view({
        'get': 'all_books',
    }), name="book-list"),
    path('owned-books/', BookViewSet.as_view({
        'get': 'owned_books',
    }), name="owned-book-list"),
    path('add-book/', BookViewSet.as_view({
        'post': 'add_book',
    }), name="add-book"),
    path('update-book/', BookViewSet.as_view({
        'put': 'update_book',
    }), name="update_book"),
]