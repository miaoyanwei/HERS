from django.urls import path

from . import views

# Miao: FLEX
urlpatterns = [
    path("flex", views.FlexView.as_view())
]
