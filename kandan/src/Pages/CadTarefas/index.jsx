import { useForm } from "react-hook-form";
import api from "../../Service/api";
import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from 'lucide-react';

const schemaCadTarefas = z.object({
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
        setValue,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaCadTarefas),
    });

    async function selectDadosPrioridades() {
        try {
            const response = await api.get('prioridades/');
            setDataPrioridade(response.data);
        } catch (error) {
            console.log("Erro ao carregar.", error);
        }
    }

    async function selectDadosResponsavel() {
        try {
            const response = await api.get('users/');
            setDataResponsavel(response.data);
        } catch (error) {
            console.log("Erro ao carregar.", error);
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

    useEffect(() => { // uma forma mais segura de mandar o status como 1 para o back, pois assim o usuário não consegue alterar no código fonte
        setValue("status_id", "1");
    }, [setValue]);

    useEffect(() => {
        selectDadosPrioridades();
        selectDadosResponsavel();
    }, []);
    
    return (
        <form method='POST' onSubmit={handleSubmit(obterDados)}>
            <h1>Cadastro de Tarefas</h1>
            <div className="input_container" role='group' aria-label='Campos para editar tarefa'>
                <label htmlFor='descricao'>Descrição: </label>
                <input
                    id='descricao'
                    type="text"
                    {...register('descricao')}
                    placeholder='Digite uma breve descrição...'
                />
                {errors.descricao &&
                    <p>
                        <CircleAlert />
                        {errors.descricao.message}
                    </p>
                }
            </div>
            <div className="input_container" role='group' aria-label='Campos para editar tarefa'>
                <label htmlFor='setor'>Setor: </label>
                <input 
                    id='setor'
                    type="text"
                    {...register('setor')}
                    placeholder='Digite o setor...'
                />
                {errors.setor &&
                    <p>
                        <CircleAlert />
                        {errors.setor.message}
                    </p>
                }
            </div>
            <div className="input_container" role='group' aria-label='Campos para editar tarefa'>
                <label htmlFor='prioridade_id'>Prioridade: </label>
                <select 
                    id='prioridade_id'
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
            </div>
            <div className="input_container" role='group' aria-label='Campos para editar tarefa'>
                <label htmlFor='usuario_id'>Responsável</label>
                <select 
                    id='usuario_id'
                    name="usuario_id" 
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
            </div>
            <button type="submit">Cadastrar</button>
            {mensagem && 
                <p>{mensagem}</p>
            }
        </form>
    )
}