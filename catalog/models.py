from django.db import models

PERIOD_CHOICES = (
    ('BA', 'Baroque'),
    ('CL', 'Classique'),
    ('CO', 'Contemporain'),
    ('RO', 'Romantique'),
    ('MO', 'Moderne')
)

class Clip(models.Model):
    title = models.CharField(max_length=100)
    interpreter = models.CharField(max_length=100)
    composer = models.CharField(max_length = 100)
    media_id = models.CharField(max_length=100)
    period = models.CharField(max_length=2,
        choices=PERIOD_CHOICES)

    def __str__(self):
        return self.title
