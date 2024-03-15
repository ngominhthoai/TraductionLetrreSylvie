import graphene
from graphene_django import DjangoObjectType
from .models import Lettre

class LettreType(DjangoObjectType):
    class Meta:
        model = Lettre
        fields = '__all__'

class Query(graphene.ObjectType):
    allLettres = graphene.List(LettreType)
    lettre= graphene.Field(LettreType, id=graphene.Int())

    def resolve_allLettres(root, info):
        return Lettre.objects.filter(status='Faite')

    def resolve_lettre(root, info, id):
        return Lettre.objects.get(pk=id)


schema = graphene.Schema(query=Query)
