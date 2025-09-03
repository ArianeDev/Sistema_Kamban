import './../../style/cadCadastro.sass';
import axios from 'axios';
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
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [mensagem, setMensagem] = useState('');

    const submitRegister = async () => {
        const registerUser = {
            username: username,
            email: email
        }

        try {
            await api.post('users/', registerUser);
            setMensagem("Cadastrado com sucesso!");

            setUsername('');
            setEmail('');
        } catch (error) {
            setMensagem('Ocorreu um erro, tente novamente!');
            console.log(error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && username) {
            submitRegister();
        } else {
            setMensagem('Preencha todos os campos!');
        }
    }
    return (
        <form method='POST' onSubmit={handleSubmit}>
            <h1>Cadastro de Usuário</h1>
            <label>Nome: </label>
            <input 
                type="text" 
                value={username} 
                placeholder='Digite seu nome...' 
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label>E-mail: </label>
            <input 
                type="email" 
                value={email} 
                placeholder='Digite seu email...' 
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Cadastrar</button>
            <p>{mensagem}</p>
        </form>
    )
}