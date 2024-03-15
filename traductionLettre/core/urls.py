from django.urls import path, include
from . import views
from .views import *
from graphene_django.views import GraphQLView

urlpatterns = [
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    # path('', home, name='home'),
    # path('ajax/load_lettres/', ajax_load_lettres, name='ajax_load_lettres'),
    # path('view_lettre/<int:lettre_id>/', views.view_lettre, name='view_lettre'),
    # path('edit_lettre/<int:lettre_id>/', views.edit_lettre, name='edit_lettre'),
    # path('lettres/<int:lettre_id>/translate/', translate_lettre, name='translate_lettre'),
    # path('ajax/list_lettre_lire/', ajax_list_lettre_lire, name='ajax_list_lettre_lire'),
    # path('lire_lettre', views.lire_lettre, name='lire_lettre'),
    # path('delete-lettre/<int:lettre_id>/', views.delete_lettre, name='delete_lettre'),
    # path('add-lettre/', add_lettre, name='add_lettre'),
]