from django.urls import path, re_path
from .api import BookViewSet, AuthorViewSet

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
    path('authors/', AuthorViewSet.as_view({
        'get': 'get',
    }), name="author-list"),
    path('add-author/', AuthorViewSet.as_view({
        'post': 'add_author',
    }), name="add_author"),
]