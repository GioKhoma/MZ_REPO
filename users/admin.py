from django.contrib import admin
from .models import Passport, Citizen, UserProfile, Post

admin.site.register(UserProfile)
admin.site.register(Passport)
admin.site.register(Citizen)
admin.site.register(Post)