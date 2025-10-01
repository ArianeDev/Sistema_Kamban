import './style.sass';
import { Link } from 'react-router-dom';

export function Header() {

    return (
        <header>
            <h1 className='titulo'>Gerenciamento de tarefas</h1>
            <nav className='barra'>
                <ul>
                    <li><Link to={'/'} className='link'>Gerenciamento de tarefas</Link></li>
                    <li><Link to={'/usuario'} className='link'>Cadastro de usuário</Link></li>
                    <li><Link to={'/tarefas'} className='link'>Cadastro de tarefa</Link></li>
                </ul>
            </nav>
        </header>
    )
}