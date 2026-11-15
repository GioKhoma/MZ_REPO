from django.shortcuts import render
from .models import Car


def cars_page(request):
    cars = Car.objects.all()

    context = {
        "cars": cars
    }

    return render(request, "cars.html", context)



def detail_car(request, id):
    car = Car.objects.get(id=id)

    context = {
        "car": car
    }

    return render(request, "detail_car.html", context)