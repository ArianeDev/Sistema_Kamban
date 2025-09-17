import './../../style/cadCadastro.sass';
import api from "../../Service/api";
import { Column } from "../../Components/Column"
import { useEffect, useState } from "react";

export function Home() {
    const [dataTarefas, setDataTarefas] = useState([]);
    const [mensagem, setMensagem] = useState('');

    async function getTarefas() {
        try {
            const response = await api.get('tarefas/');
            setDataTarefas(response.data);            
        } catch (error) {
            console.log("Erro ao carregar.");
        }
    }

    async function deleteTarefas(id) {
        try {
            await api.delete(`tarefas/${id}/`);
            getTarefas();       

            setMensagem("Tarefa deletado com sucesso");
        } catch (error) {
            setMensagem("Erro ao deletar tarefa");
        }
    
    }
    async function patchTarefas(id) {
        try {
            await api.patch(`tarefas/${id}/`);
            getTarefas();       

            setMensagem("Tarefa deletado com sucesso");
        } catch (error) {
            setMensagem("Erro ao deletar tarefa");
        }
    }

    useEffect(() => {
        getTarefas();
    },[])

    const tarefasAFazer = dataTarefas.filter(tarefa => tarefa.status_id == 1);
    const tarefasAndamento = dataTarefas.filter(tarefa => tarefa.status_id == 2);
    const tarefasConcluido = dataTarefas.filter(tarefa => tarefa.status_id == 3);

    return (
        <>
            <section className="sectionQuadro">
                {tarefasAFazer.length > 0 &&
                    <Column nomeColuna="A fazer" items={tarefasAFazer} deleteTarefa={deleteTarefas}/>
                }
                {tarefasAndamento.length > 0 &&
                    <Column nomeColuna="Andamento" items={tarefasAndamento} deleteTarefa={deleteTarefas}/>
                }
                {tarefasConcluido.length > 0 &&
                    <Column nomeColuna="Concluido" items={tarefasConcluido} deleteTarefa={deleteTarefas}/>
                }
            </section>
            {mensagem &&
                <p className='mensagemCard'>{mensagem}</p>
            }
        </>
    )
}