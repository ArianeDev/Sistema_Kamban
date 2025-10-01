import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../Service/api';
import { useState, useEffect } from 'react';
import { CircleAlert } from 'lucide-react';
import './style.sass';

const schema = z.object({
  descricao: z.string()
        .min(5, 'A descrição é obrigatória, informe pelo menos 5 caracteres')
        .max(50, 'A descrição deve ter no máximo 50 caracteres')
        .refine(val => {
            const palavras = val.trim().toLowerCase().split(/\s+/);
            const palavrasUnicas = new Set(palavras);
            return palavrasUnicas.size >= palavras.length - 1;
        }, {
            message: "Evite repetir a mesma palavra várias vezes",
        })
        .refine(val => val === val.trim(), {
            message: "Não pode começar ou terminar com espaço",
        })
        .regex(/^[\p{L}\p{N}\s!?".;+\-()*%$=]+$/u, {
            message: "A descrição contém caracteres inválidos",
        })
        .transform(val => {
            const texto = val.trim().toLowerCase();
            return texto.charAt(0).toUpperCase() + texto.slice(1);
        }),
    setor: z.string()
        .min(2, 'O setor é obrigatório')
        .max(50, 'O setor deve ter no máximo 50 caracteres')
        .refine(val => {
            const palavras = val.trim().toLowerCase().split(/\s+/);
            const palavrasUnicas = new Set(palavras);
            return palavrasUnicas.size >= palavras.length - 1;
        }, {
            message: "Evite repetir a mesma palavra várias vezes",
        })
        .refine(val => val === val.trim(), {
            message: "Não pode começar ou terminar com espaço",
        })
        .regex(/^[\p{L}\p{N}\s!?".;+\-()*%$=]+$/u, {
            message: "A descrição contém caracteres inválidos",
        }),
    prioridade_id: z.string()
        .min(1, 'Selecione uma prioridade'),
    usuario_id: z.string()
        .min(1, 'Selecione um responsável')
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

      <div className="input_container" role='group' aria-label='Campos para editar tarefa'>
        <label htmlFor='descricao'>Descrição:</label>
        <input id='descricao' {...register('descricao')} />
        {errors.descricao && <p><CircleAlert /> {errors.descricao.message}</p>}
      </div>

      <div className="input_container" role='group' aria-label='Campos para editar tarefa'>
        <label htmlFor='setor'>Setor:</label>
        <input id='setor' {...register('setor')} />
        {errors.setor && <p><CircleAlert /> {errors.setor.message}</p>}
      </div>

      <div className="input_container" role='group' aria-label='Campos para editar tarefa'>
        <label htmlFor='prioridade_id'>Prioridade:</label>
        <select id='prioridade_id' {...register('prioridade_id')}>
          {prioridades.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
      </div>

      <div className="input_container" role='group' aria-label='Campos para editar tarefa'>
        <label htmlFor='usuario_id'>Usuário Vinculado:</label>
        <select id='usuario_id' {...register('usuario_id')}>
          {usuarios.map(index => (
            <option key={index.id} value={index.id}>{index.username}</option>
          ))}
        </select>
      </div>

      <button type="submit">Salvar</button>
      <p>{mensagem}</p>
    </form>
  );
}