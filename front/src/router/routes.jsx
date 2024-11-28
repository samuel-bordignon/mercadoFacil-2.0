import { createBrowserRouter } from "react-router-dom";
// import Dragoes from "../pages/Dragoes";
import TesteAnimacao from "../pages/TesteAnimacao";
import AddEndereco from "../pages/AddEndereco";
import AcessoParceiro from "../pages/LoginParceiro";
import CadastroCliente1 from "../pages/CadastroCliente1";
import CadastroCliente2 from "../pages/CadastroCliente2";
import CadastroParceiro1 from "../pages/CadastroParceiro1";
import CadastroParceiro2 from "../pages/CadastroParceiro2";
import CadastroParceiro3 from "../pages/CadastroParceiro3";
import ComparacaoLista from "../pages/ComparacaoLista";
import EscolhaCadastro from "../pages/EscolhaCadastro";
import EscolhaLogin from "../pages/EscolhaLogin";
import EscolhaLoginCadastro from "../pages/EscolhaLoginCadastro";
import Footer from "../components/Footer";
import FormularioTeste from "../pages/FormularioTeste";
// import GerenciaLista from "../pages/GerenciaLista";
import GerenciaListas from "../pages/GerenciaListas";
import HomeLogin from "../pages/HomeLogin";
import HomeMercados from "../pages/HomeMercados";
import LoginCliente from "../pages/LoginCliente";
import LoginParceiro from "../pages/LoginParceiro";
import MenuCadastro from "../pages/MenuCadastro";
import MenuLogin from "../pages/MenuLogin";
import MercadoCadastroProdutos from "../pages/MercadoCadastroProdutos";
import MercadoEstoque from "../pages/MercadoEstoque";
import PerfilCliente from "../pages/PerfilCliente";
import PerfilGerente from "../pages/PerfilGerente";
import PerfilMercado from "../pages/PerfilMercado";
import Sidebar from "../components/Sidebar";
import TelaDentroMercado from "../pages/TelaDentroMercado";
import TelaInfoProduto from "../pages/TelaInfoProduto";

const router = createBrowserRouter([
    { path: "/", element: <HomeLogin /> },
    { path: "/acessoParceiro", element: <AcessoParceiro /> },
    { path: "/addEndereco", element: <AddEndereco /> },
    { path: "/cadastroEnderecoCliente", element: <CadastroCliente2 /> },
    { path: "/criarConta/CadastroCliente", element: <CadastroCliente1 /> },
    { path: "/criarConta/CadastroParceiro1", element: <CadastroParceiro1 /> },
    { path: "/criarConta/CadastroParceiro2", element: <CadastroParceiro2 /> },
    { path: "/criarConta/CadastroParceiro3", element: <CadastroParceiro3 /> },
    { path: "/comparacaoLista", element: <ComparacaoLista /> },
    { path: "/footer", element: <Footer /> },
    { path: "/formulario", element: <FormularioTeste /> },
    { path: "/gerencialistas", element: <GerenciaListas /> },
    // { path: "/listaCompras", element: <GerenciaLista /> },
    { path: "/loginCliente", element: <LoginCliente /> },
    { path: "/loginParceiro", element: <LoginParceiro /> },
    { path: "/loginDois", element: <EscolhaLogin /> },
    { path: "/loginParceiro", element: <LoginParceiro /> },
    { path: "/mercados", element: <HomeMercados /> },
    { path: "/mercadoEstoque", element: <MercadoEstoque /> },
    { path: "/menuCadastro", element: <MenuCadastro /> },
    { path: "/menuLogin", element: <MenuLogin /> },
    { path: "/perfilCliente", element: <PerfilCliente /> },
    { path: "/perfilGerente", element: <PerfilGerente /> },
    { path: "/perfilMercado", element: <PerfilMercado /> },
    { path: "/sidebar", element: <Sidebar /> },
    { path: "/telaDentroMercado", element: <TelaDentroMercado /> },
    { path: "/telaInfoProduto", element: <TelaInfoProduto /> },
    { path: "/anima", element: <TesteAnimacao /> }
]);

export default router;
