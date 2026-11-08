from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    name = models.CharField()
    last_name = models.CharField()
    age = models.CharField()

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_profile")

    def __str__(self):
        return f"{self.name} {self.last_name}"


class Post(models.Model):
    title = models.CharField()
    content = models.TextField()

    created_at = models.DateField(auto_now_add=True)

    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="posts")

    def __str__(self):
        return self.title

class Citizen(models.Model):
    name = models.CharField()
    last_name = models.CharField()
    birth_date = models.DateField()
    address = models.CharField()

    def __str__(self):
        return f"{self.name} {self.last_name}"


class Passport(models.Model):
    private_number = models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    expire_date = models.DateField()

    citizen = models.OneToOneField(Citizen, on_delete=models.CASCADE, related_name='passport')

    def __str__(self):
        return f"{self.private_number}"
