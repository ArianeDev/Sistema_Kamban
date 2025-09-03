import { createBrowserRouter } from "react-router-dom";
import { CadUsuario } from "./Pages/CadUsuario";
import { CadTarefas } from "./Pages/CadTarefas";
import App from "./App";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
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