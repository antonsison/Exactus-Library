from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .models import Book
from .serializers import BookSerializer

from django.db.models import Q


class BookViewSet(ViewSet):

    serializer_class = BookSerializer
    permission_classes = (IsAuthenticated,)

    def all_books(self, *args, **kwargs):
        books = Book.objects.all()
        serializer = self.serializer_class(books, many=True)
        return Response(serializer.data, status=200)

    def owned_books(self, *args, **kwargs):
        serializer = self.serializer_class(
            instance=Book.objects.filter(owner=self.request.user), 
            many=True,
        )
        return Response(serializer.data, status=200)

    def add_book(self, *args, **kwargs):
        serializer = self.serializer_class(
            data=self.request.data, request=self.request
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save() 
        return Response({}, status=200)

    def update_book(self, *args, **kwargs):
        serializer = self.serializer_class(
            instance=Book.objects.get(id=self.request.data.get('id')),
            data=self.request.data, 
            request=self.request
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save() 
        return Response({}, status=200)