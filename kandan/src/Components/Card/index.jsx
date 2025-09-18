import { useEffect, useState } from "react";
import "./style.sass";
import api from "../../Service/api";

export function Card({ item, onDelete, patchTarefas }) {
    const [dataStatus, setDataStatus] = useState([]);
    const [selectStatus, setSelectStatus] = useState('');

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
        <section className="card" key={item.id}>
            <p><b>Descrição:</b> {item.descricao}</p>
            <p><b>Setor:</b> {item.setor}</p>
            <p><b>Prioridade:</b> {item.prioridade_id}</p>
            <p><b>Vinculado a:</b> {item.usuario_id}</p>
            <div 
                role="section"
                className="section_card_button"
            >
                <button>Editar</button>
                <button onClick={onDelete}>Excluir</button>
            </div>
            <select onChange={(e) => setSelectStatus(e.target.value)}>
                <option>Selecione</option>
                {dataStatus.map((data) => (
                    <option key={data.id} value={data.id}>{data.nome}</option>
                ))}
            </select>
            <button onClick={() => {
                if (selectStatus) {
                    patchTarefas(item.id, Number(selectStatus))
                }
            }}>Alterar status</button>
        </section>
    )
}