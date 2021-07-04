from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):

    model = User
    readonly_fields = ('date_joined',)
    ordering = ('date_joined',)
    list_display = ('email', 'firstname', 'lastname', 'about_me', 'date_joined', 'is_active', 'is_staff', 'is_superuser', 'avatar')


admin.site.register(User, UserAdmin)