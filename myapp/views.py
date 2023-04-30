from django.shortcuts import render

# Create your views here.

# Miao: Communicate with frontend (HTTP)
from django.http import HttpResponse
import datetime

# Miao: Post
def flex(request):
    if (request.method != 'POST'):
        return HttpResponse("", status=405) #only POST methods are sent
    print("body: " + request.body.decode('utf-8'))
    return HttpResponse()