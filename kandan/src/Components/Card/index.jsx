import { useEffect, useState } from "react";
import "./style.sass";
import api from "../../Service/api";
import { useDraggable } from "@dnd-kit/core"; // biblioteca que permite o drag and drop - itens que são movimentados
import { Modal } from "../Modal";
import { Trash } from "lucide-react"

export function Card({ item, onDelete, patchTarefas }) {
    const [dataStatus, setDataStatus] = useState([]);
    const [selectStatus, setSelectStatus] = useState(item.status_id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // inserindo o controle atual do meu card
    // atributes: é o que diz que pode ser movimentados pelo teclado ou mouse
    // listeners: é o fofoqueiro, ele fica escutando quando a ação vai começar
    // setNodeRef:
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: item.id
    })

    const style = transform
    ? {transform : `translate (${transform.x}px, ${transform.y}px)`}
    : undefined;

    async function selectDadosStatus() {
        try {
            const response = await api.get('status/');
            setDataStatus(response.data);
        } catch (error) {
            console.log("Erro ao carregar.");
        }
    }

    useEffect(() => {
        selectDadosStatus();
    },[])

    return (
        <>
            <article className="card" key={item.id}>
                <div ref={setNodeRef} {...listeners} {...attributes} >
                    <h4>{item.descricao}</h4>
                    <p><b>Setor:</b> {item.setor}</p>
                    <p><b>Prioridade:</b> {item.prioridade_id}</p>
                    <p><b>Vinculado a:</b> {item.usuario_id}</p>
                </div>

                <section className="section_card_button">
                    <button onClick={() => setIsModalOpen(true)}>Editar</button>
                    <button onClick={onDelete} className="button_delete"> 
                        <Trash /> Excluir
                    </button>
                </section>

                <section className="section_status">
                    <select onChange={(e) => setSelectStatus(e.target.value)} value={selectStatus}>
                        {dataStatus.map((data) => (
                        <option key={data.id} value={data.id}>{data.nome}</option>
                        ))}
                    </select>

                    <button onClick={() => { patchTarefas(item.id, Number(selectStatus)) }}>Alterar status</button>
                </section>
            </article>
            {isModalOpen &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    
                </Modal>
            }
        </>
    )
}