from django.db import models
from django.core.validators import RegexValidator

validate_email = RegexValidator (
    regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    message="Digite o email corretamente, deve conter letras minúsculas, números e ponto antes do @, seguido por um domínio.",
)

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True, max_length=255, validators=[validate_email])

    def __str__(self):
        return self.username

class Prioridade(models.Model):
    nome = models.CharField(max_length=50)

    def __str__(self):
        return self.nome

class Status(models.Model):
    nome = models.CharField(max_length=50)

    def __str__(self):
        return self.nome

class Tarefa(models.Model):
    descricao = models.CharField(max_length=255)
    setor = models.CharField(max_length=50)
    data_cadastro = models.DateTimeField(auto_now_add=True)
    prioridade_id = models.ForeignKey(Prioridade, on_delete=models.CASCADE)
    status_id = models.ForeignKey(Status, on_delete=models.CASCADE)
    usuario_id = models.ForeignKey(User, on_delete=models.CASCADE)