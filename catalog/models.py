from django.db import models

class Clip(models.Model):
    title = models.CharField(max_length=100)
    jwplayer_url = models.URLField()
    interpreter = models.CharField(max_length=100)

    def __str__(self):
        return self.title
