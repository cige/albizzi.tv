from django.shortcuts import render, get_object_or_404
from catalog.models import Clip
from django.conf import settings

def home(request):
    clips = Clip.objects.all()
    return render(request, 'catalog/home.html',context({ 'clips': clips }))

def clip(request, id):
    clip = get_object_or_404(Clip, id=id)
    return render(request, 'catalog/clip.html',context({ 'clip': clip }))

def context(extend):
    return {
        'player_id': settings.PLAYER_ID,
        'github_repo': settings.GITHUB_REPO,
        **extend
    }