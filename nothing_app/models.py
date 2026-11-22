from django.db import models

class Person(models.Model):
    name = models.CharField()
    surname = models.CharField()
    bio = models.TextField()
    birth_date = models.DateField()
    age = models.IntegerField()

    def __str__(self):
        return f"{self.name} {self.surname}"

class Category(models.Model):
    name = models.CharField()
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Product(models.Model):
    name = models.CharField()
    description = models.TextField()
    price = models.FloatField()
    quantity = models.IntegerField()
    in_stock = models.BooleanField(default=False)

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name






class Book(models.Model):

    GENRE_CHOICES = [
        ('რომანი', 'რომანი'),
        ('დეტექტივი', 'დეტექტივი'),
        ('ფანტასტიკა', 'ფანტასტიკა'),
        ('ისტორიული', 'ისტორიული'),
        ('პოეზია', 'პოეზია'),
        ('დრამა', 'დრამა'),
        ('სათავგადასავლო', 'სათავგადასავლო'),
        ('ფსიქოლოგიური', 'ფსიქოლოგიური'),
        ('საბავშვო', 'საბავშვო'),
        ('სამეცნიერო', 'სამეცნიერო'),
    ]

    title = models.CharField(max_length=200)
    author = models.CharField(max_length=150)
    pages = models.IntegerField()
    price = models.FloatField()
    genre = models.CharField(
        max_length=50,
        choices=GENRE_CHOICES
    )

    def __str__(self):
        return self.title




    
