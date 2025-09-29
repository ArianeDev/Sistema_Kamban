// import { useDraggable } from "@dnd-kit/core"; // biblioteca que permite o drag and drop - itens que são movimentados
import { useEffect, useState } from "react";
import "./style.sass";
import api from "../../Service/api";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Modal } from "../Modal";
import { Trash } from "lucide-react";
import { FormEditarTarefa } from "../FormEditar";

export function Card({ item, onDelete, patchTarefas }) {
  const [dataStatus, setDataStatus] = useState([]);
  const [selectStatus, setSelectStatus] = useState(item.status_id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [prioridades, setPrioridades] = useState([]);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  async function selectDadosStatus() {
    const response = await api.get('status/');
    setDataStatus(response.data);
  }

  async function buscarUsuarios() {
    const response = await api.get('users/');
    setUsuarios(response.data);
  }

  async function buscarPrioridades() {
    const response = await api.get('prioridades/');
    setPrioridades(response.data);
  }

  useEffect(() => {
    selectDadosStatus();
    buscarUsuarios();
    buscarPrioridades();
  }, []);

  return (
    <>
      <article className="card" style={style}>
        <div ref={setNodeRef} {...listeners} {...attributes}>
          <h4>{item.descricao}</h4>
          <p><b>Setor:</b> {item.setor}</p>
          <p><b>Prioridade:</b> {prioridades.find(p => p.id === item.prioridade_id)?.nome || item.prioridade_id}</p>
          <p><b>Vinculado a:</b> {usuarios.find(u => u.id === item.usuario_id)?.username || item.usuario_id}</p>
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
          <button onClick={() => patchTarefas(item.id, Number(selectStatus))}>Alterar status</button>
        </section>
      </article>

      {isModalOpen &&
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <FormEditarTarefa
            tarefa={item}
            onClose={() => setIsModalOpen(false)}
            onAtualizado={() => {
              setIsModalOpen(false);
              window.location.reload();
            }}
          />
        </Modal>
      }
    </>
  );
}

// inserindo o controle atual do meu card
// atributes: é o que diz que pode ser movimentados pelo teclado ou mouse
// listeners: é o fofoqueiro, ele fica escutando quando a ação vai começar
// setNodeRef: