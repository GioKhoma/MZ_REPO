from django.shortcuts import render
from django.http import HttpResponse

# def home(request):
#     return HttpResponse("home page")

def index(request):

    products = ["ვაშლი", "ატამი", "რაღაცა"]

    context = {
        "name": "Rati",
        "last_name": "Lipartelianiiiiii",
        "age": 14,
        "products": products,
    }

    return render(request, "index.html", context)


def home(request):

    context = {}

    return render(request, "home.html", context)


def loans(request):

    context = {}

    return render(request, "loans.html", context)


def my_loans(request):

    context = {}

    return render(request, "my_loans.html", context)


def contact(request):

    context = {}

    return render(request, "contact.html", context)


from .models import Book
from django.db.models import Q, F



def books_page(request):

    # books = Book.objects.filter((Q(price__lt=20) | Q(genre="სამეცნიერო")) & ~Q(author="სტივენ კინგი"))

    books = Book.objects.filter(price__gte=F('pages'))


    context = {
        "books": books
    }

    return render(request, "books_page.html", context)