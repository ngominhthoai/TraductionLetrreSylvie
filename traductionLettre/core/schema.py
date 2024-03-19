import graphene
from graphene_django import DjangoObjectType
from .models import Lettre,LotDeLettre

class LettreType(DjangoObjectType):
    class Meta:
        model = Lettre
        fields = '__all__'

class LotDeLettreType(DjangoObjectType):
    class Meta:
        model = LotDeLettre
        fields = '__all__'

class Query(graphene.ObjectType):
    allLettres = graphene.List(LettreType)
    lettre= graphene.Field(LettreType, id=graphene.Int())
    allLotDeLettres = graphene.List(LotDeLettreType)
    lettres_by_lot = graphene.List(LettreType, lot_id=graphene.Int(required=True))

    def resolve_lettres_by_lot(self, info, lot_id):
        # Lấy các Lettres có lot_de_lettre_id là lot_id
        return Lettre.objects.filter(lot_de_lettre_id=lot_id)

    def resolve_allLettres(root, info):
        return Lettre.objects.all()

    def resolve_lettre(root, info, id):
        return Lettre.objects.get(pk=id)

    def resolve_allLotDeLettres(root, info):
        return LotDeLettre.objects.all()

class UpdateLettreMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        nom = graphene.String(required=False)
        text_original = graphene.String(required=False)
        text_traduction = graphene.String(required=False)
        status = graphene.String(required=False)

    lettre = graphene.Field(LettreType)

    @staticmethod
    def mutate(root, info, id, nom=None, text_original=None, text_traduction=None, status=None):
        lettre = Lettre.objects.get(pk=id)
        if nom is not None:
            lettre.nom = nom
        if text_original is not None:
            lettre.text_original = text_original
        if text_traduction is not None:
            lettre.text_traduction = text_traduction
        if status is not None:
            lettre.status = status
        lettre.save()
        return UpdateLettreMutation(lettre=lettre)

class CreateLotDeLettreMutation(graphene.Mutation):
    class Arguments:
        nom = graphene.String(required=True)

    lot_de_lettre = graphene.Field(LotDeLettreType)

    @staticmethod
    def mutate(root, info, nom):
        lot_de_lettre = LotDeLettre(nom=nom)
        lot_de_lettre.save()
        return CreateLotDeLettreMutation(lot_de_lettre=lot_de_lettre)

class DeleteLotDeLettreMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    lot_de_lettre = graphene.Field(LotDeLettreType)

    @staticmethod
    def mutate(root, info, id):
        lot_de_lettre = LotDeLettre.objects.get(pk=id)
        lot_de_lettre.delete()
        return DeleteLotDeLettreMutation(lot_de_lettre=None)

class CreateLettreMutation(graphene.Mutation):
    class Arguments:
        nom = graphene.String(required=True)
        lot_de_lettre_id = graphene.Int(required=True)

    lettre = graphene.Field(LettreType)

    @staticmethod
    def mutate(root, info, nom, lot_de_lettre_id):
        lot_de_lettre = LotDeLettre.objects.get(pk=lot_de_lettre_id)
        lettre = Lettre(nom=nom, lot_de_lettre=lot_de_lettre, text_original='', text_traduction='', status='LIRE')
        lettre.save()
        return CreateLettreMutation(lettre=lettre)
class Mutation(graphene.ObjectType):
    update_lettre = UpdateLettreMutation.Field()
    create_lot_de_lettre = CreateLotDeLettreMutation.Field()
    delete_lot_de_lettre = DeleteLotDeLettreMutation.Field()
    create_lettre = CreateLettreMutation.Field()




schema = graphene.Schema(query=Query, mutation=Mutation)
