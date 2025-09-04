import { useForm } from "react-hook-form";
import api from "../../Service/api";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaCadTarefas = z.object({
    descricao: z.string()
        .min(5, 'A descrição é obrigatória, informe pelo menos 5 caracteres')
        .max(255, 'A descrição deve ter no máximo 255 caracteres'),
    setor: z.string()
        .min(2, 'O setor é obrigatório')
        .max(50, 'O setor deve ter no máximo 50 caracteres'),
    prioridade: z.string()
        .min(1, 'Selecione uma prioridade'),
    status: z.string()
        .min(1, 'Selecione um status'),
    responsavel: z.string()
        .min(1, 'Selecione um responsável')
    })

export function CadTarefas() {
    const [mensagem, setMensagem] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaCadTarefas)
    })

    async function obterDados(data) {
        console.log("Dados reecebidos: ", data);

        try {
            await api.post('tarefas/', data);
            setMensagem("Cadastrado com sucesso!");

            reset();
        } catch (error) {
            setMensagem('Ocorreu um erro, tente novamente!');
            console.log(error);
        }
    }

    return (
        <form method='POST' onSubmit={handleSubmit(obterDados)}>
            <h1>Cadastro de Tarefas</h1>
            <label>Descrição: </label>
            <input
                type="text"
                {...register('descricao')}
                placeholder='Digite uma breve descrição...'
            />
            {errors.descricao &&
                <p>{errors.descricao.message}</p>
            }
            <label>Setor: </label>
            <input 
                type="text"
                {...register('setor')}
                placeholder='Digite o setor...'
            />
            {errors.setor &&
                <p>{errors.setor.message}</p>
            }
            <label>Prioridade: </label>
            <select 
                name="prioridade" 
                {...register('prioridade')}
            >
                <option value="">Alta</option>
                <option value="">Alta</option>
            </select>
            {errors.prioridade &&
                <p>{errors.prioridade.message}</p>
            }
            <label>Status: </label>
            <select name="status" {...register('status')}>
                <option value="">Alta</option>
                <option value="">Alta</option>
            </select>
            {errors.status &&
                <p>{errors.status.message}</p>
            }
            <label>Responsável</label>
            <select name="prioridade" {...register('responsavel')}>
                <option value="">Ariane</option>
                <option value="">Nicolas</option>
            </select>
            {errors.responsavel &&
                <p>{errors.responsavel.message}</p>
            }
            <input type="submit" value="Cadastrar" />
        </form>
    )
}