from django.db import models

class Status(models.TextChoices):
    Lire = 'Lire'
    Lu = 'Lu'
    Traduire = 'Traduire'
    Faite = 'Faite'

class LotDeLettre(models.Model):
    nom = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nom

class Lettre(models.Model):
    nom = models.CharField(max_length=255, blank=True, null=True)
    text_original = models.TextField(blank=True, null=True, default='')
    text_traduction = models.TextField(blank=True, null=True, default='')
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.Lire)
    lot_de_lettre = models.ForeignKey(LotDeLettre, on_delete=models.CASCADE, related_name='lettres')

    def save(self, *args, **kwargs):
        super(Lettre, self).save(*args, **kwargs)

    def __str__(self):
        return self.nom
