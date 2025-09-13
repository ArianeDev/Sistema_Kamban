import './../../style/cadCadastro.sass';
import api from '../../Service/api';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert } from 'lucide-react';

const schemaCadUsuario = z.object({
    username: z.string()
        .trim()
        .min(5, 'O nome é obrigatório, informe pelo menos 5 caracteres')
        .max(100, 'O nome deve ter no máximo 100 caracteres')
        .regex(/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/, {
            message: 'O nome deve conter apenas letras e espaços',
        })
        .refine(val => {
            const palavras = val.trim().split(/\s+/);
            const palavrasUnicas = new Set(palavras.map(p => p.toLowerCase()));
            return palavrasUnicas.size >= palavras.length - 1; // permite no máximo 1 repetição
        }, {
            message: 'Evite repetir o mesmo nome várias vezes',
        })
        .transform(val => val
            .replace(/\s+/g, ' ') // transforma multiplos espaços por um
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
        ),
    email: z.string()
        .min(1, 'O e-mail é obrigatório')
        .max(100, 'O e-mail deve ter no máximo 100 caracteres')
        .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.-]{0,63}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
            message: 'Email inválido'
        }),
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
            if (error.response?.data?.email) {
                setMensagem(error.response.data.email[0]);
            } else if (error.response?.data?.username[0]) {
                setMensagem(error.response.data.username[0]);
            } else {
                setMensagem('Ocorreu um erro, tente mais tarde!');
            }

            console.log(error);
        }
    }

    return (
        // noValidate serve para não ter válidações padões do HTML
        <form method='POST' onSubmit={handleSubmit(obterDados)} noValidate> 
            <h1>Cadastro de Usuário</h1>
            <div className="input_container">
                <label>Nome: </label>
                <input 
                    type="text" 
                    {...register('username')}
                    placeholder='Digite seu nome...' 
                />
                {errors.username &&
                    <p>
                        <CircleAlert />
                        {errors.username.message}
                    </p>
                }
            </div>
            <div className="input_container">
                <label>E-mail: </label>
                <input 
                    type="email" 
                    {...register('email')}
                    placeholder='Digite seu email...' 
                />
                {errors.email &&
                    <p>
                        <CircleAlert />
                        {errors.email.message}
                    </p>
                }
            </div>
            <button type="submit">Cadastrar</button>
            <p>{mensagem}</p>
        </form>
    )
}

// O required buga o zod, por isso é bom retirar
// O required é o primeiro a ser lido, depois o zod