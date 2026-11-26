from django.shortcuts import render
from .models import Car, Passport, Post


def cars_page(request):
    cars = Car.objects.order_by("-release_year", "-price")

    print(cars.query)



    context = {
        "cars": cars,
        # "post": post
    }

    return render(request, "cars.html", context)



def detail_car(request, id):
    car = Car.objects.get(id=id)

    context = {
        "car": car
    }

    return render(request, "detail_car.html", context)