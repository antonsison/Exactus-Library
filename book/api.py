from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .models import Book, Author
from .serializers import BookSerializer, AuthorSerializer, CommentSerializer

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


class AuthorViewSet(ViewSet):

    serializer_class = AuthorSerializer
    permission_classes = (AllowAny,)

    def get(self, *args, **kwargs):
        authors = Author.objects.all()
        serializer = self.serializer_class(authors, many=True)
        return Response(serializer.data, status=200)


class CommentViewSet(ViewSet):

    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def get_comments(self, *args, **kwargs):
        serializer = self.serializer_class(
            instance=Comment.objects.filter(
                book__id=self.request.GET.get('book_id'), 
                is_deleted=False
            ).order_by('-date_created'), 
            many=True,
        )
        return Response(serializer.data, status=200)

    def add_comment(self, *args, **kwargs):
        data = self.request.data
        try:
            book = Book.objects.get(id=data.get('book_id'))
            comment = Comment.objects.create(
                message=data.get('message'),
                user=self.request.user,
                book=book,
            )
            serializer = self.serializer_class(
                instance=comment, 
            )
        except:
            return Response({'status': 'An error has occured. Please try again.'}, status=400)
        return Response(serializer.data, status=200)

    def delete_comment(self, *args, **kwargs):
        data = self.request.data
        try:
            comment = Comment.objects.get(id=data.get('comment_id'))
            comment.is_deleted = True
            comment.save()
        except:
            return Response({'status': 'An error has occured. Please try again.'}, status=400)
        return Response({'status': 'Success'}, status=200)