import api from "../../Service/api";

const schemaCadTarefas = z.

export function CadTarefas() {
    return (
        <form method='POST'>
            <h1>Cadastro de Tarefas</h1>
            <label>Descrição: </label>
            <input
                type="text"
                placeholder='Digite uma breve descrição...'
            />
        </form>
    )
}