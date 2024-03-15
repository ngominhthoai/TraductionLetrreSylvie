import json

from django.http import JsonResponse
from django.views.decorators.clickjacking import xframe_options_exempt
from django.views.decorators.http import require_POST

from .models import Lettre, LotDeLettre
from django.shortcuts import get_object_or_404, redirect

# core/urls.py

# core/views.py

from django.shortcuts import render


def home(request):
    lots = LotDeLettre.objects.all()  # Lấy tất cả các lô thư
    return render(request, 'home.html', {'lots': lots})

def ajax_load_lettres(request):
    lot_id = request.GET.get('lot_id')
    lettres = Lettre.objects.filter(lot_de_lettre_id=lot_id).values('id', 'nom', 'status')
    # Chuẩn bị dữ liệu để trả về JSON
    lettres_list = list(lettres)
    return JsonResponse({'data': lettres_list})

def ajax_list_lettre_lire(request):
    lot_id = request.GET.get('lot_id')
    #staus: Lire et Lu
    lettres = Lettre.objects.filter(lot_de_lettre_id=lot_id, status__in=['Lire', 'Lu']).values('id', 'nom', 'status')
    lettres_list = list(lettres)
    return JsonResponse({'data': lettres_list})

def lire_lettre(request):
    lots = LotDeLettre.objects.all()  # Lấy tất cả các lô thư
    return render(request, 'lire_lettre.html', {'lots': lots})


@require_POST  # Chỉ cho phép phương thức POST để tăng cường bảo mật
def delete_lettre(request, lettre_id):
    lettre = get_object_or_404(Lettre, id=lettre_id)
    lettre.delete()
    return JsonResponse({'status': 'success', 'message': 'Lettre was deleted successfully'})

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def add_lettre(request):
    if request.method == 'POST':
        nom = request.POST.get('nom')
        lot_id = request.POST.get('lot_de_lettre')
        lot = LotDeLettre.objects.get(id=lot_id)

        Lettre.objects.create(
            nom=nom,
            lot_de_lettre=lot,
            # Bạn có thể thêm các trường khác tại đây nếu cần
        )

        return JsonResponse({"success": True}, status=200)
    else:
        return JsonResponse({"error": "This method is not allowed"}, status=400)

@xframe_options_exempt
def view_lettre(request, lettre_id):
    lettre = get_object_or_404(Lettre, id=lettre_id)
    return render(request, 'view_lettre.html', {'lettre': lettre})

@xframe_options_exempt
def edit_lettre(request, lettre_id):
    if request.method == 'POST':
        texte = request.POST.get('texte')
        lettre = get_object_or_404(Lettre, id=lettre_id)
        lettre.text_original = texte
        lettre.status = 'Lu'  # Cập nhật status
        lettre.save()
        return redirect('home')

@xframe_options_exempt
def translate_lettre(request, lettre_id):
    lettre = get_object_or_404(Lettre, id=lettre_id)
    if request.method == 'POST':
        lettre.text_traduction = request.POST.get('text_traduction')
        lettre.status = 'Faite'
        lettre.save()
        return redirect('lire_lettre')
    return render(request, 'translate_lettre.html', {'lettre': lettre})

