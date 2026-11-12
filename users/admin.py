from django.contrib import admin
from .models import Passport, Citizen, UserProfile, Post, Person

admin.site.register(UserProfile)
admin.site.register(Passport)
admin.site.register(Citizen)
admin.site.register(Post)
admin.site.register(Person)