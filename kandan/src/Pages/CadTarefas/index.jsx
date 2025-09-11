import { useForm } from "react-hook-form";
import api from "../../Service/api";
import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaCadTarefas = z.object({
    descricao: z.string()
        .min(5, 'A descrição é obrigatória, informe pelo menos 5 caracteres')
        .max(255, 'A descrição deve ter no máximo 255 caracteres'),
    setor: z.string()
        .min(2, 'O setor é obrigatório')
        .max(50, 'O setor deve ter no máximo 50 caracteres'),
    prioridade_id: z.string()
        .min(1, 'Selecione uma prioridade'),
    status_id: z.string()
        .min(1, "Selecione um status"),
    usuario_id: z.string()
        .min(1, 'Selecione um responsável')
    })

export function CadTarefas() {
    const [mensagem, setMensagem] = useState('');
    const [dataPrioridade, setDataPrioridade] = useState([]);
    const [dataResponsavel, setDataResponsavel] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaCadTarefas),
        defaultValues: {
            status_id: 1
        }
    });

    async function selectDadosPrioridades() {
        try {
            const response = await api.get('prioridades/');
            setDataPrioridade(response.data);
        } catch (error) {
            console.log("Erro ao carregar.");
        }
    }

    async function selectDadosResponsavel() {
        try {
            const response = await api.get('users/');
            setDataResponsavel(response.data);
        } catch (error) {
            console.log("Erro ao carregar.");
        }
    }
    
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

    useEffect(() => {
        selectDadosPrioridades();
        selectDadosResponsavel();
    }, []);
    
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
                {...register('prioridade_id')}
            >
                <option value="">Selecione</option>
                {dataPrioridade.map((data) => (
                    <option key={data.id} value={data.id}>{data.nome}</option>
                ))}
            </select>
            {errors.prioridade_id &&
                <p>{errors.prioridade_id.message}</p>
            }
            <label>Responsável</label>
            <select 
                name="prioridade" 
                {...register('usuario_id')}
            >
                <option value="">Selecione</option>
                {dataResponsavel.map((data) => (
                    <option key={data.id} value={data.id}>{data.username}</option>
                ))}
            </select>
            {errors.usuario_id &&
                <p>{errors.usuario_id.message}</p>
            }
            <input type="hidden" value="1" {...register('status_id')} />
            <input type="submit" value="Cadastrar" />
        </form>
    )
}