from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):

    model = User
    readonly_fields = ('date_joined', 'date_updated')
    ordering = ('date_joined',)
    list_display = ('email', 'first_name', 'last_name', 'about_me', 'date_joined', 'date_updated','is_active', 'is_staff', 'is_superuser', 'avatar')


admin.site.register(User, UserAdmin)