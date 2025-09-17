import { useEffect, useState } from "react";
import "./style.sass";
import api from "../../Service/api";

export function Card({ item, onDelete}) {
    const [dataStatus, setDataStatus] = useState([]);

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
        <div className="card" key={item.id}>
            <p>Descrição: {item.descricao}</p>
            <p>Setor: {item.setor}</p>
            <p>Prioridade: {item.prioridade_id}</p>
            <p>Vinculado a: {item.usuario_id}</p>
            <button>Editar</button>
            <button onClick={onDelete}>Excluir</button>
            <select>
                <option>Selecione</option>
                {dataStatus.map((data) => (
                    <option key={data.id} value={data.id}>{data.nome}</option>
                ))}
            </select>
            <button>Alterar status</button>
        </div>
    )
}