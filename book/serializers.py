from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _

from .models import Book, Author
from user.serializers import UserSerializer


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = ('id', 'email', 'first_name', 'last_name')


class BookSerializer(serializers.ModelSerializer):

    owner = UserSerializer(required=False, allow_null=True)
    author = AuthorSerializer(required=False, allow_null=True)

    class Meta:
        model = Book
        fields = ('id', 'title', 'status', 'category', 'location', 'author', 'owner')
    
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(BookSerializer, self).__init__(*args, **kwargs)  

    def create(self, validated_data):
        book = Book(
                title=validated_data['title'],
                status=validated_data['status'],
                category=validated_data['category'],
                location=validated_data['location'],
                author=validated_data['author'],
                owner=self.request.user,
            )
        book.save()
    
    def update(self, instance, validated_data):
        title = validated_data.get('title', None)
        status = validated_data.get('status', None)
        category = validated_data.get('category', None)
        location = validated_data.get('location', None)
        author = validated_data.get('author', None)

        if title is not None:
            instance.title = title

        if status is not None:
            instance.status = status

        if category is not None:
            instance.category = category

        if location is not None:
            instance.location = location
        
        if author is not None:
            instance.author = author

        instance.save()
        return instance

    def save(self, **kwargs):
        validated_data = dict(
            list(self.validated_data.items()) +
            list(kwargs.items())
        )

        if self.instance is not None:
            self.instance = self.update(self.instance, validated_data)
        else:
            self.instance = self.create(validated_data)
            
        return self.instance