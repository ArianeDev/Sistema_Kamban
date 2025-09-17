import { createBrowserRouter } from "react-router-dom";
import { CadUsuario } from "./Pages/CadUsuario";
import { CadTarefas } from "./Pages/CadTarefas";
import App from "./App";
import { Home } from "./Pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'usuario',
                element: <CadUsuario />
            },
            {
                path: 'tarefas',
                element: <CadTarefas />
            }
        ]
    },
])

export default router;