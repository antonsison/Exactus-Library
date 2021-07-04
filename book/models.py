from django.db import models
from user.models import User

# Create your models here.
class Author(models.Model):
    """Author Model
    """
    email = models.EmailField(blank=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


class Book(models.Model):
    """Book Model
    """
    # Status choices
    AVAILABLE = 'available'
    CHECKED_OUT = 'checked out'
    DAMAGED = 'damaged'
    LOST = 'lost'

    STATUS_CHOICES = (
        (AVAILABLE, 'Available'),
        (CHECKED_OUT, 'Checked Out'),
        (DAMAGED, 'Damaged'),
        (LOST, 'Lost'),
    )

    # Type choices
    HARDCOVER = 'hardcover'
    PAPERBACK = 'paperback'
    DIGITAL_COPY = 'digital copy'

    TYPE_CHOICES = (
        (HARDCOVER, 'Hardcover'),
        (PAPERBACK, 'Paperback'),
        (DIGITAL_COPY, 'Digital Copy')
    )

    # Location choices
    EXACTUS_OFFICE = 'exactus office'
    OWNERS_HOME = "owner's home"
    IN_THE_MATRIX = 'in the matrix'

    LOCATION_CHOICES = (
        (EXACTUS_OFFICE, 'Exactus Office'),
        (OWNERS_HOME, "Owner's Home"),
        (IN_THE_MATRIX, 'In the Matrix'),
    )

    title = models.CharField(max_length=255, blank=True)
    status = models.CharField(default=AVAILABLE, max_length=255, choices=STATUS_CHOICES)
    category = models.CharField(default=HARDCOVER, max_length=255, choices=TYPE_CHOICES)
    location = models.CharField(default=EXACTUS_OFFICE, max_length=255, choices=LOCATION_CHOICES)
    author = models.ManyToManyField(Author, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('title', 'category', 'location', 'owner'),

    def __str__(self):
        return "{}".format(self.title)


class Checkout(models.Model):
    """Checkout Model
    """
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    returned_date = models.DateTimeField(blank=True, null=True)
    checked_out_by = models.ForeignKey(User, on_delete=models.CASCADE)
    checked_out_date = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    """Comment Model
    """
    message = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_deleted = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)