import { fireEvent, render, screen } from "@testing-library/react";
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
	// Verificar os selects
	it("Permite preencher os campos", () => {
		render(<CadTarefas />);

		const descricaoInput = screen.getByLabelText(/Descrição/i);
		const setorInput = screen.getByLabelText(/Setor/i);
		const prioridadeInput = screen.getByLabelText(/Prioridade/i);
		const responsavelInput = screen.getByLabelText(/Responsável/i);

		fireEvent.change(descricaoInput, { target: { value: "Descrição da tarefa" } });
		fireEvent.change(setorInput, { target: { value: "Setor de TI" } });

		expect(descricaoInput.value).toBe("Descrição da tarefa");
		expect(setorInput.value).toBe("Setor de TI");
	})
})