import './style.sass';
import { Link } from 'react-router-dom';

export function Header() {

    return (
        <header>
            <h1 className='titulo'>Gerenciamento de tarefas</h1>
            <nav className='barra'>
                <ul>
                    <Link to={'/'} className='link'>
                        <li>Gerenciamento de tarefas</li>
                    </Link>
                    <Link to={'/usuario'} className='link'>
                        <li>Cadastro de usuário</li>
                    </Link>
                    <Link to={'/tarefas'} className='link'>
                        <li>Cadastro de tarefa</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}