import datetime

from django.contrib.auth import logout
from django.conf import settings
from django.http import HttpResponseRedirect

from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    AuthTokenSerializer,
    RegisterSerializer,
)

class Login(APIView):

    authentication_classes = ()
    permission_classes = (AllowAny,)
    serializer_class = AuthTokenSerializer

    def post(self, *args, **kwargs):
        serializer = self.serializer_class(
            data=self.request.data, request=self.request
        )
        serializer.is_valid(raise_exception=True)
        response = {
            'token': serializer.get_token().key,
            'user_id': serializer.user.id
        }

        return Response(response, status=200)


class Logout(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, *args, **kwargs):
        logout(self.request)
        return Response(status=200)


class Register(APIView):

    authentication_classes = ()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response(status=200)
        return Response(serializer.errors, status=400)