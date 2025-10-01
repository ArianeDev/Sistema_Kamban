import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CadUsuario } from "../Pages/CadUsuario";
import { describe, it, expect } from 'vitest';

describe("Cadastro de usuário", () => {
    it("Renderizar os campos necessários", () => {
        render(<CadUsuario />); // redenreizar o componente
        const nomeInput = screen.getByLabelText(/Nome/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const botao = screen.getByRole("button", {name: /Cadastrar/i});

        expect(nomeInput).toBeTruthy();
        expect(emailInput).toBeTruthy();
        expect(botao).toBeTruthy();
    });
    it("Permite preencher os campos", () => {
        render(<CadUsuario />);

        const nomeInput = screen.getByLabelText(/Nome/i);
        const emailInput = screen.getByLabelText(/Email/i);

        fireEvent.change(nomeInput, { target: { value: 'Ariane'}});
        fireEvent.change(emailInput, { target: { value: 'ariane@example.com'}});

        expect(nomeInput.value).toBe('Ariane');
        expect(emailInput.value).toBe('ariane@example.com');
    });
    it("Exibe mensagem de erro ao submeter o formulário com campos vazios", async () => {
        render(<CadUsuario />);
        const botao = screen.getByRole("button", {name: /Cadastrar/i});

        fireEvent.click(botao);

        const mensagemNome = await screen.findByText(/O nome é obrigatório, informe pelo menos 5 caracteres/i);
        expect(mensagemNome).to.exist;

        const mensagemEmail = await screen.findByText(/O e-mail é obrigatório/i);
        expect(mensagemEmail).to.exist;
    });
});