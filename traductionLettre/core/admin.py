from django.contrib import admin

# Register your models here.
from .models import Lettre,LotDeLettre

admin.site.register(Lettre)
admin.site.register(LotDeLettre)