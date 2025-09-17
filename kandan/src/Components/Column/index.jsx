import { Card } from '../Card';
import './style.sass';

export function Column({ nomeColuna, items, deleteTarefa }) {
    return (
        <section className='coluna'>
            <h2>{nomeColuna}</h2>
            <p>Tarefas</p>

            {items.map((item, key) =>
                <Card key={item.id} item={item} onDelete={() => deleteTarefa(item.id)}/>
            )}
        </section>
    )
}