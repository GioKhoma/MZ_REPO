from django.contrib import admin
from .models import Person, Product, Category, Book

admin.site.register(Person)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Book)
