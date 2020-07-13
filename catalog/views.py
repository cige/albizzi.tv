from django.shortcuts import render, get_object_or_404
from catalog.models import Clip

def home(request):
    clips = Clip.objects.all()
    return render(request, 'catalog/home.html', { 'clips': clips })

def clip(request, id):
    clip = get_object_or_404(Clip, id=id)
    return render(request, 'catalog/clip.html', { 'clip': clip })
