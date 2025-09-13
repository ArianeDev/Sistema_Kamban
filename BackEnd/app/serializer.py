from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User, Prioridade, Status, Tarefa

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all(), message="Esse nome já está cadastrado.")]
    )
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all(), message="Este email já está cadastrado.")]
    )
    class Meta:
        model = User
        fields = '__all__'
        
class PrioridadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prioridade
        fields = '__all__'

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'

class TarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefa
        fields = '__all__'