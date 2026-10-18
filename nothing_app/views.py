from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse("home page")

def index(request):

    products = ["ვაშლი", "ატამი", "რაღაცა"]

    context = {
        "name": "Rati",
        "last_name": "Lipartelianiiiiii",
        "age": 14,
        "products": products,
    }

    return render(request, "nothing_app/index.html", context)