from django.contrib import admin
from .models import Passport, Citizen, UserProfile, Post, Person, Car

admin.site.register(UserProfile)
admin.site.register(Passport)
admin.site.register(Citizen)
admin.site.register(Post)
admin.site.register(Person)
admin.site.register(Car)