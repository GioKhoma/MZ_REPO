from django.db import models

class Person(models.Model):
    name = models.CharField()
    surname = models.CharField()
    bio = models.TextField()
    birth_date = models.DateField()
    age = models.IntegerField()

    def __str__(self):
        return f"{self.name} {self.surname}"


class Product(models.Model):
    name = models.CharField()
    description = models.TextField()
    price = models.FloatField()
    quantity = models.IntegerField()
    in_stock = models.BooleanField(default=False)
    
