from django.urls import path
from . import views

urlpatterns = [
    path("cars/", views.cars_page, name="cars_page"),
    path("detail_car/<int:id>/", views.detail_car, name="detail_car"),
] 

