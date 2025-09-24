import './../../style/cadCadastro.sass';
import api from "../../Service/api";
import { Column } from "../../Components/Column"
import { useEffect, useState } from "react";
import { DndContext } from '@dnd-kit/core'; // area que permite 

export function Home() {
    const [dataTarefas, setDataTarefas] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [tarefas, setTarefas] = useState([]);

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

    function handleDragEnd(event) {
        const { active, over } = event;

        if (over && active) {
            const tarefasId = active.id;
            const novaColuna = over.id; // nova posição

            setTarefas(prev =>
                prev.map(tarefa => 
                    tarefa.id === tarefasId ? { tarefa, status: novaColuna } : tarefa
                )
            );

            patchTarefas(tarefasId, novaColuna);
        }
    }

    useEffect(() => {
        getTarefas();
    },[])

    const tarefasAFazer = dataTarefas.filter(tarefa => tarefa.status_id == 1);
    const tarefasAndamento = dataTarefas.filter(tarefa => tarefa.status_id == 2);
    const tarefasConcluido = dataTarefas.filter(tarefa => tarefa.status_id == 3);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <section className="sectionQuadro">
                <Column id={1} nomeColuna="A fazer" items={tarefasAFazer} deleteTarefa={deleteTarefas} patchTarefas={patchTarefas}/>
                <Column id={2} nomeColuna="Andamento" items={tarefasAndamento} deleteTarefa={deleteTarefas} patchTarefas={patchTarefas}/>
                <Column id={3} nomeColuna="Concluído" items={tarefasConcluido} deleteTarefa={deleteTarefas} patchTarefas={patchTarefas}/>
            </section>
            {mensagem &&
                <p className='mensagemCard'>{mensagem}</p>
            }
        </ DndContext>
    )
}