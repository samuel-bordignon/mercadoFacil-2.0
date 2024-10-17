import { createBrowserRouter } from "react-router-dom"; 
import HomeMercados from "../pages/HomeMercados";
import GerenciaLista from "../pages/GerenciaLista";

const router = createBrowserRouter([
    {path: "/", element: <HomeMercados />},
    {path: "/listaCompras", element: <GerenciaLista />},
    
])

export default router;
