import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../Service/api';
import { useState, useEffect } from 'react';
import { CircleAlert } from 'lucide-react';
import './style.sass';

const schema = z.object({
  descricao: z.string().min(5),
  setor: z.string().min(2),
  prioridade_id: z.string(),
  usuario_id: z.string()
});

export function FormEditarTarefa({ tarefa, onClose, onAtualizado }) {
  const [mensagem, setMensagem] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [prioridades, setPrioridades] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      descricao: tarefa.descricao,
      setor: tarefa.setor,
      prioridade_id: String(tarefa.prioridade_id),
      usuario_id: String(tarefa.usuario_id)
    }
  });

  useEffect(() => {
    async function carregarDados() {
      const [resUsuarios, resPrioridades] = await Promise.all([
        api.get('users/'),
        api.get('prioridades/')
      ]);
      setUsuarios(resUsuarios.data);
      setPrioridades(resPrioridades.data);
    }
    carregarDados();
  }, []);

  async function atualizar(data) {
    try {
      await api.patch(`tarefas/${tarefa.id}/`, data);
      setMensagem('Tarefa atualizada com sucesso!');
      onAtualizado();
      onClose();
    } catch (error) {
      setMensagem('Erro ao atualizar tarefa', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(atualizar)} className='formAtualizar' noValidate>
      <h2>Editar Tarefa</h2>

      <div className="input_container">
        <label>Descrição:</label>
        <input {...register('descricao')} />
        {errors.descricao && <p><CircleAlert /> {errors.descricao.message}</p>}
      </div>

      <div className="input_container">
        <label>Setor:</label>
        <input {...register('setor')} />
        {errors.setor && <p><CircleAlert /> {errors.setor.message}</p>}
      </div>

      <div className="input_container">
        <label>Prioridade:</label>
        <select {...register('prioridade_id')}>
          {prioridades.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
      </div>

      <div className="input_container">
        <label>Usuário Vinculado:</label>
        <select {...register('usuario_id')}>
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>{u.username}</option>
          ))}
        </select>
      </div>

      <button type="submit">Salvar</button>
      <p>{mensagem}</p>
    </form>
  );
}