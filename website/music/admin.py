from django.contrib import admin
from .models import Album, Song

# How to register an established module.
admin.site.register(Album)
admin.site.register(Song)