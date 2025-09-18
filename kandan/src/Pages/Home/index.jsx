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
    async function patchTarefas(id, status_id) {
        console.log("Atualizando tarefa", id, "com status", status_id);
        try {
            await api.patch(`tarefas/${id}/`, { status_id });            
            getTarefas();       

            setMensagem("Status atualizado com sucesso");
        } catch (error) {
            setMensagem("Erro ao atualizar status");
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
                <div>
                    <h3>A fazer</h3>
                    {tarefasAFazer.length > 0 &&
                        <Column items={tarefasAFazer} deleteTarefa={deleteTarefas} patchTarefas={patchTarefas}/>
                    }
                </div>
                <div>
                    <h3>Andamento</h3>
                    {tarefasAndamento.length > 0 &&
                        <Column items={tarefasAndamento} deleteTarefa={deleteTarefas} patchTarefas={patchTarefas}/>
                    }
                </div>
                <div>
                    <h3>Concluído</h3>
                    {tarefasConcluido.length > 0 &&
                        <Column items={tarefasConcluido} deleteTarefa={deleteTarefas} patchTarefas={patchTarefas}/>
                    }
                </div>
            </section>
            {mensagem &&
                <p className='mensagemCard'>{mensagem}</p>
            }
        </>
    )
}