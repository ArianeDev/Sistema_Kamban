import { render, screen, fireEvent } from '@testing-library/react';
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
    // Username tests
    it("Exibe erro para nome com número", async () => {
        render(<CadUsuario />);

        fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Ariane1' }});
        fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

        expect(await screen.findByText(/O nome deve conter apenas letras e espaços/i)).toBeTruthy();
    });
    it("Exibe erro para nome com caractere especial", async () => {
        render(<CadUsuario />);

        fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Ariane@' }});
        fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

        expect(await screen.findByText(/O nome deve conter apenas letras e espaços/i)).toBeTruthy();
    });
    it("Exibe erro para nome com espaço no início ou no fim", async () => {
        render(<CadUsuario />);

        fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: ' Ariane' }});
        fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

        expect(await screen.findByText(/Evite repetir o mesmo nome e não use espaços no início ou fim, e nem múltiplos espaços entre palavras/i)).toBeTruthy();
    });
    it("Exibe erro para nome com repetição excessiva", async () => {
        render(<CadUsuario />);

        fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Ariane Ariane Ariane' }});
        fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

        expect(await screen.findByText(/Evite repetir o mesmo nome e não use espaços no início ou fim, e nem múltiplos espaços entre palavras/i)).toBeTruthy();
    });
    it("Exibe erro com nomes maiores que 100 caracteres", async () => {
        render(<CadUsuario />);

        const nomeLongo = 'A'.repeat(101);
        fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: nomeLongo }});
        fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

        expect(await screen.findByText(/O nome deve ter no máximo 100 caracteres/i)).toBeTruthy();
    });
    // Email tests
    it("Exibe erro para email inválido", async () => {
        render(<CadUsuario />);

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'ariane@com' }});
        fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

        expect(await screen.findByText(/Email inválido, não pode conter espaços/i)).toBeTruthy();
    });
    // verificar esse teste
    // it("Exibe erro para email com espaço no início ou no fim", async () => {
    //     render(<CadUsuario />);

    //     fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: ' ariane@gmail.com' }});
    //     fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    //     expect(await screen.findByText(/Não pode começar ou terminar com espaço/i)).toBeTruthy();
    // });

});