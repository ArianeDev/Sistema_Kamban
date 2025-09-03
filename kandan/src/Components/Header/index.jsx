import './style.sass';
import { Link } from 'react-router-dom';

export function Header() {

    return (
        <header>
            <h1 className='titulo'>Gerenciamento de tarefas</h1>
            <nav className='barra'>
                <ul>
                    <Link to={'/'}>
                        <li>Cadastro de usuário</li>
                    </Link>
                    <Link to={'/tarefas'}>
                        <li>Cadastro de tarefa</li>
                    </Link>
                    <li>Gerenciamento de tarefas</li>
                </ul>
            </nav>
        </header>
    )
}