import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CadTarefas } from "../Pages/CadTarefas";

describe("Cadastro de tarefas", () => {
	it("Renderizar os campos necessários", () => {
		render(<CadTarefas />);

		const decricao = screen.getByLabelText(/Descrição/i);
		const setor = screen.getByLabelText(/Setor/i);
		const prioridade = screen.getByLabelText(/Prioridade/i);
		const responsavel = screen.getByLabelText(/Responsável/i);
		const botao = screen.getByRole("button", { name: /Cadastrar/i });

		expect(decricao).toBeTruthy();
		expect(setor).toBeTruthy();
		expect(prioridade).toBeTruthy();
		expect(responsavel).toBeTruthy();
		expect(botao).toBeTruthy();
	});
	it("Submete o formulário com todos os campos preenchidos corretamente", async () => {
		render(<CadTarefas />);

		const descricaoInput = screen.getByLabelText(/Descrição/i);
		const setorInput = screen.getByLabelText(/Setor/i);
		const prioridadeSelect = await screen.findByLabelText(/Prioridade/i);
		const responsavelSelect = await screen.findByLabelText(/Responsável/i);
		const botao = screen.getByRole("button", { name: /Cadastrar/i });

		const prioridadeOption = await screen.findByRole("option", { name: "Alta" });
		const responsavelOption = await screen.findByRole("option", { name: "Ariane" });

		fireEvent.change(descricaoInput, { target: { value: "Tarefa importante" } });
		fireEvent.change(setorInput, { target: { value: "Financeiro" } });
		fireEvent.change(prioridadeSelect, { target: { value: prioridadeOption.value } });
		fireEvent.change(responsavelSelect, { target: { value: responsavelOption.value } });

		fireEvent.click(botao);

		expect(descricaoInput.value).toBe("Tarefa importante");
		expect(setorInput.value).toBe("Financeiro");
		expect(prioridadeSelect.value).toBe(prioridadeOption.value);
		expect(responsavelSelect.value).toBe(responsavelOption.value);
	});

	it("Exibe mensagem de erro quando os selects não são selecionados", async () => {
		render(<CadTarefas />);

		const descricaoInput = screen.getByLabelText(/Descrição/i);
		const setorInput = screen.getByLabelText(/Setor/i);
		const botao = screen.getByRole("button", { name: /Cadastrar/i });

		fireEvent.change(descricaoInput, { target: { value: "Descrição da tarefa" } });
		fireEvent.change(setorInput, { target: { value: "Setor de TI" } });
		fireEvent.click(botao);

		expect(await screen.findByText(/Selecione uma prioridade/i)).toBeTruthy();
		expect(await screen.findByText(/Selecione um responsável/i)).toBeTruthy();
	})

	// Descrição
	it("Exibe mensagem de erro quando o campo descrição estiver vazio", async () => {
		render(<CadTarefas />);

		const botao = screen.getByRole("button", { name: /Cadastrar/i });
		fireEvent.click(botao);

		expect(await screen.findByText(/A descrição é obrigatória, informe pelo menos 5 caracteres/i)).toBeTruthy();
	})
	it("Exibe mensagem de erro quando o campo tem mais de 50 caracteres", async () => {
		render(<CadTarefas />);
		const descricaoInput = screen.getByLabelText(/Descrição/i);
		const descricaoLonga = 'A'.repeat(51);

		fireEvent.change(descricaoInput, { target: { value: descricaoLonga }});
		fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }))

		expect(await screen.findByText(/A descrição deve ter no máximo 50 caracteres/i)).toBeTruthy();
	})
	it("Exibe mensagem de erro quando o usuario começa ou terminal com espaço no campo descrição", async () => {
		render(<CadTarefas />);
		const descricaoInput = screen.getByLabelText(/Descrição/i);

		fireEvent.change(descricaoInput, { target: { value: "teste " }});
		fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }))

		expect(await screen.findByText(/Não pode começar ou terminar com espaço/i)).toBeTruthy();
	})
	it("Exibe mensagem de erro quando o usuário digita muitas vezes uma palavra no campo descrição", async () => {
		render(<CadTarefas />);
		const descricaoInput = screen.getByLabelText(/Descrição/i);

		fireEvent.change(descricaoInput, { target: { value: "teste teste teste" }});
		fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }))

		expect(await screen.findByText(/Evite repetir a mesma palavra várias vezes/i)).toBeTruthy();
	})
	it("Exibe mensagem de erro quando o usuário digita caracteres especiais no campo descrição", async () => {
		render(<CadTarefas />);
		const descricaoInput = screen.getByLabelText(/Descrição/i);
		
		fireEvent.change(descricaoInput, { target: { value: "teste%@" }});
		fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }))
		
		expect(await screen.findByText(/A descrição contém caracteres inválidos/i)).toBeTruthy();
	})
	
	// Setor
	it("Exibe mensagem de erro quando o campo setor estiver vazio", async () => {
		render(<CadTarefas />);
		
		const botao = screen.getByRole("button", { name: /Cadastrar/i });
		fireEvent.click(botao);
		
		expect(await screen.findByText(/O setor é obrigatório/i)).toBeTruthy();
	})
	it("Exibe mensagem de erro quando o campo setor for maior que 50 caracteres", async () => {
		render(<CadTarefas />);
		
		const setorInput = screen.getByLabelText(/Setor/i);
		const setorLongo = "A".repeat(51);
		
		fireEvent.change(setorInput, { target: { value: setorLongo }});
		fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }))
		
		expect(await screen.findByText(/O setor deve ter no máximo 50 caracteres/i)).toBeTruthy();
	})
	it("Exibe mensagem de erro quando o usuario começa ou terminal com espaço no campo setor", async () => {
		render(<CadTarefas />);
		const setorInput = screen.getByLabelText(/Setor/i);
	
		fireEvent.change(setorInput, { target: { value: "teste " }});
		fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }))
	
		expect(await screen.findByText(/Não pode começar ou terminar com espaço/i)).toBeTruthy();
	})
	it("Exibe mensagem de erro quando o usuário digita muitas vezes uma palavra no campo setor", async () => {
		render(<CadTarefas />);
		const setorInput = screen.getByLabelText(/Setor/i);
	
		fireEvent.change(setorInput, { target: { value: "teste teste teste" }});
		fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }))
	
		expect(await screen.findByText(/Evite repetir a mesma palavra várias vezes/i)).toBeTruthy();
	})
	it("Exibe mensagem de erro quando o usuário digita caracteres especiais no campo descrição", async () => {
		render(<CadTarefas />);
		const setorInput = screen.getByLabelText(/Setor/i);
		
		fireEvent.change(setorInput, { target: { value: "teste%@" }});
		fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }))
		
		expect(await screen.findByText(/O setor contém caracteres inválidos/i)).toBeTruthy();
	})
})