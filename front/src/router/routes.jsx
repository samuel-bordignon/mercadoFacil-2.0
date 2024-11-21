import { createBrowserRouter } from "react-router-dom"; 
import HomeMercados from "../pages/HomeMercados";
import GerenciaLista from "../pages/GerenciaLista";
import PerfilCliente from "../pages/PerfilCliente";
// import Dragoes from "../pages/Dragoes";
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
import TelaDentroMercado from "../pages/TelaDentroMercado";
import FormularioTeste from "../pages/FormularioTeste";
import Sidebar from "../components/Sidebar";
import PerfilMercado from "../pages/PerfilMercado";
import MercadoCadastroProdutos from "../pages/MercadoCadastroProdutos";
import PerfilGerente from "../pages/PerfilGerente";
import MercadoEstoque from "../pages/MercadoEstoque";
import ComparacaoLista from "../pages/ComparacaoLista";
import GerenciaListas from "../pages/GerenciaListas";
import TelaInfoProduto from "../pages/TelaInfoProduto";

const router = createBrowserRouter([
    {path: "/mercados", element: <HomeMercados />},
    {path: "/listaCompras", element: <GerenciaLista />},
    {path: "/perfilCliente", element: <PerfilCliente />},
    {path: "/ccdsf", element: <EscolhaLoginCadastro />},
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
    // {path: "/dragoes", element: <Dragoes />},
    {path: "/anima", element: <TesteAnimacao />},
    {path: "/addEndereco", element: <AddEndereco />},
    {path: "/telaDentroMercado", element: <TelaDentroMercado />},
    {path: "/formulario", element: <FormularioTeste />},
    {path: "/sidebar", element: <Sidebar />},
    {path: "/perfilMercado", element: <PerfilMercado />},
    {path: "/perfilGerente", element: <PerfilGerente />},
    {path: "/mercadoEstoque", element: <MercadoEstoque />},
    {path: "/cadastroProdutos", element: <MercadoCadastroProdutos />},
    {path: "/comparacaoLista", element: <ComparacaoLista />},
    {path: "/gerencialistas", element: <GerenciaListas />},
    {path: "/telaInfoProduto", element: <TelaInfoProduto />}

])

export default router;
