import datetime

from django.conf import settings
from django.utils import timezone
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

from .models import User

class AuthTokenSerializer(serializers.Serializer):

    user = None
    email = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(AuthTokenSerializer, self).__init__(*args, **kwargs)

    def validate(self, data):
        email, password = data.values()

        if not email or not password:
            message = _('Email and password are required.')
            raise serializers.ValidationError(message, code='authorization')

        self.user = authenticate(request=self.request, email=email, password=password)
        login(self.request, self.user)

        if not self.user:
            message = _('Incorrect email/password.')
            raise serializers.ValidationError(message, code='authorization')

        return data

    def get_token(self):
        if not self.user:
            message = _('Incorrect email/password.')
            raise serializers.ValidationError(message, code="authorization")

        token, created = Token.objects.get_or_create(user=self.user)
        expiry_date = token.created + datetime.timedelta(days=30)

        if not created and expiry_date < timezone.now():
            # Regenerate token
            token.delete()
            token = Token.objects.create(user=self.user)

        return token


class RegisterSerializer(serializers.ModelSerializer):

    user = None
    email = serializers.EmailField(
        validators=[UniqueValidator(
            queryset=User.objects.all(),
            message="This email is already exist!"
        )]
    )
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'password',
            'confirm_password',
        )

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password != confirm_password:
            raise serializers.ValidationError(_("Passwords do not match."), code="authorization")

        return data

    def create(self, validated_data):
        user = User(
                email=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
            )
        user.set_password(validated_data['password'])
        user.is_active = True
        user.save()
        return user