import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Card } from '../Card';
import './style.sass';

// olha aqui
export function Column({ id,  nomeColuna, items, deleteTarefa, patchTarefas, draggerId }) {
    // faço o uso da referência do item no Drag and Frop e saindo o dom
    const droppableId = `coluna-${id}`;
    const { setNodeRef } = useDroppable({ id: droppableId });

    return (
        <section className='coluna' ref={ setNodeRef }>
            <h2>{nomeColuna}</h2>

            <SortableContext 
                items={items.map(item => item.id)}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item) =>
                    <Card 
                        key={item.id} 
                        item={item} 
                        onDelete={() => deleteTarefa(item.id)} 
                        patchTarefas={patchTarefas} 
                        draggerId={draggerId}
                    />
                )}
            </SortableContext>
        </section>
    );
}

// DndContext - área onde posso ter elementos arrastáveis
    // Droppable - onde posso soltar
        // Draggable - pegar os itens

