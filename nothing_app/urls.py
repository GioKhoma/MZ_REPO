from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("loans/", views.loans, name="loans"),
    path("my_loans/", views.my_loans, name="my_loans"),
    path("contact/", views.contact, name="contact"),
    path("index/", views.index, name="index"),
]