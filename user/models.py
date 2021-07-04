
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager
from PIL import Image

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(('email address'), unique=True)
    firstname = models.CharField(('first name'), max_length=30, blank=True)
    lastname = models.CharField(('last name'), max_length=30, blank=True)
    about_me = models.TextField(('about me'), blank=True)
    date_joined = models.DateTimeField(('date joined'), auto_now_add=True)
    is_active = models.BooleanField(('active'), default=True)
    is_staff = models.BooleanField(('staff'), default=False)
    is_superuser = models.BooleanField(('superuser'), default=False)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    

    class Meta:
        verbose_name = ('user')
        verbose_name_plural = ('users')

    def __str__(self):
        return self.email

    def get_full_name(self):
        """Returns the first_name plus the last_name, 
        with a space in between.
        """
        return '{} {}'.format(self.firstname, self.lastname)

    def get_short_name(self):
        # The user is identified by their email address
        return self.firstname