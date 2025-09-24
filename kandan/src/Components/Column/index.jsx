import { useDroppable } from '@dnd-kit/core';
import { Card } from '../Card';
import './style.sass';

// olha aqui
export function Column({id,  nomeColuna, items, deleteTarefa, patchTarefas }) {
    // faço o uso da referência do item no Drag and Frop e saindo o dom
    const { setNodeRef } = useDroppable({ id });

    return (
        <section className='coluna' ref={ setNodeRef }>
            <h3>{nomeColuna}</h3>

            {items.map((item, key) =>
                <Card key={item.id} item={item} onDelete={() => deleteTarefa(item.id)} patchTarefas={patchTarefas}/>
            )}
        </section>
    )
}

// DndContext - área onde posso ter elementos arrastáveis
    // Droppable - onde posso soltar
        // Draggable - pegar os itens

