from django.urls import path
from .views import (
    Tarefa_GET_POST,
    Tarefa_GET_PUT_PATCH_DELETE,
    Status_GET_POST, Status_GET_PUT_PATCH_DELETE,
    Prioridade_GET_POST, Prioridade_GET_PUT_PATCH_DELETE,
    User_GET_POST
)

urlpatterns = [
    path('tarefas/', Tarefa_GET_POST.as_view(), name='tarefa-list-create'),
    path('tarefas/<int:pk>/', Tarefa_GET_PUT_PATCH_DELETE.as_view(), name='tarefa-detail'),
    path('status/', Status_GET_POST.as_view(), name='status-list-create'),
    path('status/<int:pk>/', Status_GET_PUT_PATCH_DELETE.as_view(), name='status-detail'),
    path('prioridades/', Prioridade_GET_POST.as_view(), name='prioridade-list-create'),
    path('prioridades/<int:pk>/', Prioridade_GET_PUT_PATCH_DELETE.as_view(), name='prioridade-detail'),
    path('users/', User_GET_POST.as_view(), name='user-list-create'),
]