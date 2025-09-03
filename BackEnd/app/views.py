from django.shortcuts import render
from .models import Tarefa, User, Prioridade, Status
from .serializer import TarefaSerializer, UserSerializer, PrioridadeSerializer, StatusSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

class Tarefa_GET_POST(ListCreateAPIView):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

class Tarefa_GET_PUT_PATCH_DELETE(RetrieveUpdateDestroyAPIView):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

class Status_GET_POST(ListCreateAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer

class Status_GET_PUT_PATCH_DELETE(RetrieveUpdateDestroyAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer

class Prioridade_GET_POST(ListCreateAPIView):
    queryset = Prioridade.objects.all()
    serializer_class = PrioridadeSerializer

class Prioridade_GET_PUT_PATCH_DELETE(RetrieveUpdateDestroyAPIView):
    queryset = Prioridade.objects.all()
    serializer_class = PrioridadeSerializer

# User Views
class User_GET_POST(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer