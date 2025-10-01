import './../../style/cadCadastro.sass';
import api from "../../Service/api";
import { Column } from "../../Components/Column"
import { useEffect, useState } from "react";
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core'; // area que permite
import { Card } from '../../Components/Card'; 
import { set } from 'zod';

export function Home() {
    const [dataTarefas, setTarefas] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [activeCard, setActiveCard] = useState(null);
    const [draggerId, setDraggerId] = useState(null);

    async function getTarefas() {
        try {
            const response = await api.get('tarefas/');
            setTarefas(response.data);
        } catch (error) {
            console.log("Erro ao carregar.", error);
        }
    }

    async function deleteTarefas(id) {
        try {
            await api.delete(`tarefas/${id}/`);
            getTarefas();       

            setMensagem("Tarefa deletado com sucesso");
        } catch (error) {
            setMensagem("Erro ao deletar tarefa", error);
        }
    
    }
    async function patchTarefas(id, status_id) {
        console.log("Atualizando tarefa", id, "com status", status_id);
        try {
            await api.patch(`tarefas/${id}/`, { status_id });
            
            setTimeout(() => {
                getTarefas();
            }, 400);

            setMensagem("Status atualizado com sucesso");
        } catch (error) {
            setMensagem("Erro ao atualizar status", error);
        }
    }

    function handleDragStart(event) {
        setDraggerId(event.active.id);
        const { active } = event;
        const tarefa = dataTarefas.find(index => index.id === active.id);
        setActiveCard(tarefa);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        setDraggerId(null);
        setActiveCard(null);     

        if (!over || active.id === over.id) return;

        const match = over.id.match(/^coluna-(\d+)$/);
        const novaColuna = match ? Number(match[1]) : null;

        if (!novaColuna) {
            setMensagem("Movimento inválido");
            return;
        }

        const tarefasId = active.id;

        setTarefas(prev =>
            prev.map(tarefa => 
                tarefa.id === tarefasId ? { ...tarefa, status_id: novaColuna } : tarefa
            )
        );

        patchTarefas(tarefasId, novaColuna);
    }

    useEffect(() => {
        getTarefas();
    },[])

    const tarefasAFazer = dataTarefas.filter(tarefa => tarefa.status_id == 1);
    const tarefasAndamento = dataTarefas.filter(tarefa => tarefa.status_id == 2);
    const tarefasConcluido = dataTarefas.filter(tarefa => tarefa.status_id == 3);

    return (
        <>
            <DndContext 
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <section className="sectionQuadro">
                    <Column id={1} nomeColuna="A fazer" items={tarefasAFazer} deleteTarefa={deleteTarefas} patchTarefas={patchTarefas} draggerId={draggerId}/>
                    <Column id={2} nomeColuna="Fazendo" items={tarefasAndamento} deleteTarefa={deleteTarefas} patchTarefas={patchTarefas} draggerId={draggerId}/>
                    <Column id={3} nomeColuna="Pronto" items={tarefasConcluido} deleteTarefa={deleteTarefas} patchTarefas={patchTarefas} draggerId={draggerId}/>
                </section>
                {mensagem &&
                    <p className='mensagemCard'>{mensagem}</p>
                }
            </DndContext>
            <DragOverlay>
                {activeCard ? (
                    <Card
                    item={activeCard}
                    isOverlay={true}
                    />
                ) : null}
            </DragOverlay>
        </>
    )
}