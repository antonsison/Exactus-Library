from django.urls import path, re_path
from .api import BookViewSet, AuthorViewSet, CommentViewSet, CheckoutViewSet

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
    path('comments/', CommentViewSet.as_view({
        'get': 'get_comments'
    }), name='comment_list'),
    path('add-comment/', CommentViewSet.as_view({
        'post': 'add_comment'
    }), name='add_comment'),
    path('delete-comment/', CommentViewSet.as_view({
        'post': 'delete_comment'
    }), name='delete_comment'),
    path('borrowed-books/', CheckoutViewSet.as_view({
        'get': 'get_borrowed_books',
    }), name="get_borrowed_books"),
    path('checkout-book/', CheckoutViewSet.as_view({
        'post': 'checkout_book'
    }), name='checkout_book'),
    path('return-book/', CheckoutViewSet.as_view({
        'post': 'return_book'
    }), name='return_book'),
    path('is-checked-out/', CheckoutViewSet.as_view({
        'get': 'is_checked_out'
    }), name='is_checkout_out'),
]