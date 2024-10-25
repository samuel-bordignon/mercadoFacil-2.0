import { createBrowserRouter } from "react-router-dom"; 
import HomeMercados from "../pages/HomeMercados";
import GerenciaLista from "../pages/GerenciaLista";
import PerfilCliente from "../pages/PerfilCliente";
import Mercado from "../pages/Mercado";
import Dragoes from "../pages/Dragoes";

const router = createBrowserRouter([
    {path: "/", element: <HomeMercados />},
    {path: "/listaCompras", element: <GerenciaLista />},
    {path: "/perfilCliente", element: <PerfilCliente />},
    {path: "/mercado", element: <Mercado />},
    {path: "/mercado/:id", element: <Mercado />},
    {path: "/mercado/:id/produto/:id", element: <Mercado />},
    {path: "/dragoes", element: <Dragoes />},
    
])

export default router;
