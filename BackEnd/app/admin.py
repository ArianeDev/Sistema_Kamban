from django.contrib import admin
from .models import User, Prioridade, Status, Tarefa

admin.site.register(User)
admin.site.register(Prioridade)
admin.site.register(Status)
admin.site.register(Tarefa)