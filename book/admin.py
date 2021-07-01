from django.contrib import admin
from .models import Book, Author, Checkout, Comment

# Register your models here.
class BookAdmin(admin.ModelAdmin):

    model = Book
    readonly_fields = ('date_created', 'date_updated')
    ordering = ('date_created',)
    list_display = ('title', 'status', 'category', 'get_authors', 'owner', 'date_created', 'date_updated')

    def get_authors(self):
        return ",".join([author for author in self.author.all()])


class AuthorAdmin(admin.ModelAdmin):

    model = Author
    ordering = ('email',)
    list_display = ('email', 'first_name', 'last_name')


class CheckoutAdmin(admin.ModelAdmin):

    model = Checkout
    readonly_fields = ('checked_out_date', 'returned_date')
    ordering = ('book',)
    list_display = ('book', 'checked_out_by', 'checked_out_date', 'returned_date')


class CommentAdmin(admin.ModelAdmin):

    model = Comment
    readonly_fields = ('date_created', 'date_updated')
    ordering = ('date_created',)
    list_display = ('message', 'user', 'book', 'is_deleted', 'date_created', 'date_updated')


admin.site.register(Book, BookAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(Checkout, CheckoutAdmin)
admin.site.register(Comment, CommentAdmin)