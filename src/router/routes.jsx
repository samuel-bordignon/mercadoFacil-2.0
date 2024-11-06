import { createBrowserRouter } from "react-router-dom"; 
import HomeMercados from "../pages/HomeMercados";
import GerenciaLista from "../pages/GerenciaLista";
import PerfilCliente from "../pages/PerfilCliente";
import Mercado from "../pages/Mercado";
import Dragoes from "../pages/Dragoes";
import TesteAnimacao from "../pages/TesteAnimacao";
import AddEndereco from "../pages/AddEndereco";
import EscolhaLoginCadastro from "../pages/EscolhaLoginCadastro";
import CadastroCliente1 from "../pages/CadastroCliente1";
import CadastroPerceiro1 from "../pages/CadastroParceiro1";
import CadastroPerceiro2 from "../pages/CadastroParceiro2";
import CadastroPerceiro3 from "../pages/CadastroPerceiro3";
import AcessoParceiro from "../pages/LoginParceiro";
import LoginCliente from "../pages/LoginCliente";
import LoginParceiro from "../pages/LoginParceiro";
import EscolhaLogin from "../pages/EscolhaLogin";
import EscolhaCadastro from "../pages/EscolhaCadastro";
import CadastroCliente2 from "../pages/CadastroCliente2";
import TelaDentroMercado from "../pages/TeladentroMercado";
import Sidebar from "../components/Sidebar";
import PerfilMercado from "../pages/PerfilMercado";

const router = createBrowserRouter([
    {path: "/mercados", element: <HomeMercados />},
    {path: "/listaCompras", element: <GerenciaLista />},
    {path: "/perfilCliente", element: <PerfilCliente />},
    {path: "/mercado", element: <Mercado />},
    {path: "/", element: <EscolhaLoginCadastro />},
    {path: "/loginDois", element: <EscolhaLogin />},
    {path: "/criarConta", element: <EscolhaCadastro />},
    {path: "/loginParceiro", element: <LoginParceiro />},
    {path: "/loginCliente", element: <LoginCliente />},
    {path: "/criarConta/CadastroCliente", element: <CadastroCliente1 />},
    {path: "/cadastroEnderecoCliente", element: <CadastroCliente2 />},
    {path: "/criarConta/CadastroParceiro1", element: <CadastroPerceiro1 />},
    {path: "/criarConta/CadastroParceiro2", element: <CadastroPerceiro2 />},
    {path: "/criarConta/CadastroParceiro3", element: <CadastroPerceiro3 />},
    {path: "/acessoParceiro", element: <AcessoParceiro />},
    {path: "/dragoes", element: <Dragoes />},
    {path: "/anima", element: <TesteAnimacao />},
    {path: "/addEndereco", element: <AddEndereco />},
    {path: "/telaDentroMercado", element: <TelaDentroMercado />},
    {path: "/sidebar", element: <Sidebar />},
    {path: "/perfilMercado", element: <PerfilMercado />},

    
])

export default router;
