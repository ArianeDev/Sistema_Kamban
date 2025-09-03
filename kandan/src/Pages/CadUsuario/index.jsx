import './../../style/cadCadastro.sass';
import api from '../../Service/api';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemaCadUsuario = z.object({
    username: z.string()
        .min(5, 'O nome é obrigatório, informe pelo menos 5 caracteres')
        .max(100, 'O nome deve ter no máximo 100 caracteres'),
    email: z.string()
        .min(1, 'O e-mail é obrigatório')
        .max(255, 'O e-mail deve ter no máximo 100 caracteres'),
})

export function CadUsuario() {
    const [mensagem, setMensagem] = useState('');

    const {
        register, // registra o que o usuário digitou
        handleSubmit, // no momento de enviar o formulário
        formState: { errors }, // guarda o erro
        reset
    } = useForm({
        resolver: zodResolver(schemaCadUsuario)
    })

    async function obterDados(data) {
        console.log("Dados reecebidos: ", data);

        try {
            await api.post('users/', data);
            setMensagem("Cadastrado com sucesso!");
    
            reset();
        } catch (error) {
            setMensagem('Ocorreu um erro, tente novamente!');
            console.log(error);
        }
    }

    return (
        <form method='POST' onSubmit={handleSubmit(obterDados)}>
            <h1>Cadastro de Usuário</h1>
            <label>Nome: </label>
            <input 
                type="text" 
                {...register('username')}
                placeholder='Digite seu nome...' 
            />
            {errors.username &&
                <p>{errors.username.message}</p>
            }
            <label>E-mail: </label>
            <input 
                type="email" 
                {...register('email')}
                placeholder='Digite seu email...' 
            />
            {errors.email &&
                <p>{errors.email.message}</p>
            }
            <button type="submit">Cadastrar</button>
            <p>{mensagem}</p>
        </form>
    )
}

// O required buga o zod, por isso é bom retirar
// O required é o primeiro a ser lido, depois o zod