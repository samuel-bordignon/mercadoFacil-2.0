--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    nome character varying(100) NOT NULL,
    id_cliente integer NOT NULL,
    telefone character varying(15) NOT NULL,
    email character varying(100) NOT NULL,
    senha character varying(100) NOT NULL,
    cpf character varying(11) NOT NULL,
    data_nasc date NOT NULL
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- Name: clientes_id_cliente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clientes_id_cliente_seq OWNER TO postgres;

--
-- Name: clientes_id_cliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_id_cliente_seq OWNED BY public.clientes.id_cliente;


--
-- Name: clientes_mercados_relacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes_mercados_relacao (
    fk_id_cliente integer,
    fk_id_mercado integer
);


ALTER TABLE public.clientes_mercados_relacao OWNER TO postgres;

--
-- Name: endereco_cliente_relecao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.endereco_cliente_relecao (
    fk_id_cliente integer,
    fk_id_enderecocliente integer
);


ALTER TABLE public.endereco_cliente_relecao OWNER TO postgres;

--
-- Name: enderecoclientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enderecoclientes (
    id_enderecocliente integer NOT NULL,
    cep character varying(8) NOT NULL,
    bairro character varying(50) NOT NULL,
    logradouro character varying(100) NOT NULL,
    numero character varying(5),
    apelido character varying(100) NOT NULL,
    complemento character varying(100),
    latitude character varying(255),
    longitude character varying(255),
    isatual boolean
);


ALTER TABLE public.enderecoclientes OWNER TO postgres;

--
-- Name: enderecoclientes_id_enderecocliente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enderecoclientes_id_enderecocliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.enderecoclientes_id_enderecocliente_seq OWNER TO postgres;

--
-- Name: enderecoclientes_id_enderecocliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enderecoclientes_id_enderecocliente_seq OWNED BY public.enderecoclientes.id_enderecocliente;


--
-- Name: enderecomercados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enderecomercados (
    id_enderecomercado integer NOT NULL,
    cep character varying(8) NOT NULL,
    bairro character varying(50) NOT NULL,
    logradouro character varying(100) NOT NULL,
    numero character varying(5) NOT NULL,
    fk_id_mercado integer,
    latitude character varying(255),
    longitude character varying(255),
    complemento character varying(100)
);


ALTER TABLE public.enderecomercados OWNER TO postgres;

--
-- Name: enderecomercados_id_enderecomercado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enderecomercados_id_enderecomercado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.enderecomercados_id_enderecomercado_seq OWNER TO postgres;

--
-- Name: enderecomercados_id_enderecomercado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enderecomercados_id_enderecomercado_seq OWNED BY public.enderecomercados.id_enderecomercado;


--
-- Name: estoqueprodutos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estoqueprodutos (
    id_estoque_produto integer NOT NULL,
    quantidade_estoque integer NOT NULL,
    fk_id_produto integer NOT NULL
);


ALTER TABLE public.estoqueprodutos OWNER TO postgres;

--
-- Name: estoqueprodutos_id_estoque_produto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estoqueprodutos_id_estoque_produto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estoqueprodutos_id_estoque_produto_seq OWNER TO postgres;

--
-- Name: estoqueprodutos_id_estoque_produto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estoqueprodutos_id_estoque_produto_seq OWNED BY public.estoqueprodutos.id_estoque_produto;


--
-- Name: formapagamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.formapagamento (
    id_formapagamento integer NOT NULL,
    img_forma character varying(10000) NOT NULL,
    descricao_forma character varying(50) NOT NULL,
    fk_id_mercado integer
);


ALTER TABLE public.formapagamento OWNER TO postgres;

--
-- Name: formapagamento_id_formapagamento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.formapagamento_id_formapagamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.formapagamento_id_formapagamento_seq OWNER TO postgres;

--
-- Name: formapagamento_id_formapagamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.formapagamento_id_formapagamento_seq OWNED BY public.formapagamento.id_formapagamento;


--
-- Name: gerentes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gerentes (
    id_gerente integer NOT NULL,
    nome character varying(100) NOT NULL,
    data_nasc date NOT NULL,
    cpf character varying(11) NOT NULL,
    email character varying(100) NOT NULL,
    mei character varying(15) DEFAULT NULL::character varying,
    telefone character varying(15) NOT NULL,
    senha character varying(10) NOT NULL
);


ALTER TABLE public.gerentes OWNER TO postgres;

--
-- Name: gerentes_id_gerente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gerentes_id_gerente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gerentes_id_gerente_seq OWNER TO postgres;

--
-- Name: gerentes_id_gerente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gerentes_id_gerente_seq OWNED BY public.gerentes.id_gerente;


--
-- Name: historicoprodutos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historicoprodutos (
    id_movimentacao integer NOT NULL,
    tipo_movimentacao character varying(20) NOT NULL,
    data_movimentacao date,
    quantidade_movimentada integer NOT NULL,
    fk_id_produto integer,
    fk_id_gerente integer,
    fk_id_mercado integer
);


ALTER TABLE public.historicoprodutos OWNER TO postgres;

--
-- Name: historicoprodutos_id_movimentacao_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historicoprodutos_id_movimentacao_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historicoprodutos_id_movimentacao_seq OWNER TO postgres;

--
-- Name: historicoprodutos_id_movimentacao_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historicoprodutos_id_movimentacao_seq OWNED BY public.historicoprodutos.id_movimentacao;


--
-- Name: horarios_mercados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.horarios_mercados (
    id_horario_mercados integer NOT NULL,
    dia_semana character varying(10) DEFAULT NULL::character varying,
    hora_inicio time without time zone DEFAULT '00:00:00'::time without time zone,
    hora_fim time without time zone DEFAULT '00:00:00'::time without time zone,
    fk_id_mercado integer
);


ALTER TABLE public.horarios_mercados OWNER TO postgres;

--
-- Name: horarios_mercados_id_horario_mercados_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.horarios_mercados_id_horario_mercados_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.horarios_mercados_id_horario_mercados_seq OWNER TO postgres;

--
-- Name: horarios_mercados_id_horario_mercados_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.horarios_mercados_id_horario_mercados_seq OWNED BY public.horarios_mercados.id_horario_mercados;


--
-- Name: listacmp_produto_relacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listacmp_produto_relacao (
    fk_id_listacompras integer,
    fk_id_produto integer
);


ALTER TABLE public.listacmp_produto_relacao OWNER TO postgres;

--
-- Name: listacompras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listacompras (
    preco_total double precision NOT NULL,
    data_compra date NOT NULL,
    id_listacompras integer NOT NULL,
    fk_id_cliente integer
);


ALTER TABLE public.listacompras OWNER TO postgres;

--
-- Name: listacompras_id_listacompras_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.listacompras_id_listacompras_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.listacompras_id_listacompras_seq OWNER TO postgres;

--
-- Name: listacompras_id_listacompras_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.listacompras_id_listacompras_seq OWNED BY public.listacompras.id_listacompras;


--
-- Name: listafxd_listacmp_relacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listafxd_listacmp_relacao (
    fk_id_listacompras integer,
    fk_id_fixadas integer
);


ALTER TABLE public.listafxd_listacmp_relacao OWNER TO postgres;

--
-- Name: listasfixadas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listasfixadas (
    id_fixadas integer NOT NULL,
    fk_id_cliente integer
);


ALTER TABLE public.listasfixadas OWNER TO postgres;

--
-- Name: listasfixadas_id_fixadas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.listasfixadas_id_fixadas_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.listasfixadas_id_fixadas_seq OWNER TO postgres;

--
-- Name: listasfixadas_id_fixadas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.listasfixadas_id_fixadas_seq OWNED BY public.listasfixadas.id_fixadas;


--
-- Name: mercados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mercados (
    id_mercado integer NOT NULL,
    logo character varying(10000) NOT NULL,
    telefone character varying(15) NOT NULL,
    email character varying(100) NOT NULL,
    nome character varying(100) NOT NULL,
    cnpj character varying(14) NOT NULL,
    fk_id_gerente integer
);


ALTER TABLE public.mercados OWNER TO postgres;

--
-- Name: mercados_id_mercado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mercados_id_mercado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mercados_id_mercado_seq OWNER TO postgres;

--
-- Name: mercados_id_mercado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mercados_id_mercado_seq OWNED BY public.mercados.id_mercado;


--
-- Name: palavrachave; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.palavrachave (
    nome_palavra character varying(50) NOT NULL,
    id_palavrachave integer NOT NULL,
    categoria character varying(100),
    sinonimos text
);


ALTER TABLE public.palavrachave OWNER TO postgres;

--
-- Name: palavrachave_id_palavrachave_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.palavrachave_id_palavrachave_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.palavrachave_id_palavrachave_seq OWNER TO postgres;

--
-- Name: palavrachave_id_palavrachave_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.palavrachave_id_palavrachave_seq OWNED BY public.palavrachave.id_palavrachave;


--
-- Name: palavrachave_produto_relacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.palavrachave_produto_relacao (
    fk_id_produto integer,
    fk_id_palavrachave integer
);


ALTER TABLE public.palavrachave_produto_relacao OWNER TO postgres;

--
-- Name: produto_promocao_relacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produto_promocao_relacao (
    fk_id_promocao integer,
    fk_id_produto integer
);


ALTER TABLE public.produto_promocao_relacao OWNER TO postgres;

--
-- Name: produtos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produtos (
    id_produto integer NOT NULL,
    descricao character varying(500) NOT NULL,
    codigo character varying(20) NOT NULL,
    quantidade double precision NOT NULL,
    imagem_file_path character varying(255) NOT NULL,
    nome character varying(100) NOT NULL,
    preco double precision NOT NULL,
    fk_id_mercado integer,
    unidademedida character varying(5)
);


ALTER TABLE public.produtos OWNER TO postgres;

--
-- Name: produtos_id_produto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produtos_id_produto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.produtos_id_produto_seq OWNER TO postgres;

--
-- Name: produtos_id_produto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produtos_id_produto_seq OWNED BY public.produtos.id_produto;


--
-- Name: promocao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promocao (
    data_inicio date NOT NULL,
    data_fim date NOT NULL,
    id_promocao integer NOT NULL,
    descricao_promocao character varying(500) NOT NULL,
    desconto_aplicado double precision NOT NULL
);


ALTER TABLE public.promocao OWNER TO postgres;

--
-- Name: promocao_id_promocao_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.promocao_id_promocao_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.promocao_id_promocao_seq OWNER TO postgres;

--
-- Name: promocao_id_promocao_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.promocao_id_promocao_seq OWNED BY public.promocao.id_promocao;


--
-- Name: clientes id_cliente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id_cliente SET DEFAULT nextval('public.clientes_id_cliente_seq'::regclass);


--
-- Name: enderecoclientes id_enderecocliente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enderecoclientes ALTER COLUMN id_enderecocliente SET DEFAULT nextval('public.enderecoclientes_id_enderecocliente_seq'::regclass);


--
-- Name: enderecomercados id_enderecomercado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enderecomercados ALTER COLUMN id_enderecomercado SET DEFAULT nextval('public.enderecomercados_id_enderecomercado_seq'::regclass);


--
-- Name: estoqueprodutos id_estoque_produto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoqueprodutos ALTER COLUMN id_estoque_produto SET DEFAULT nextval('public.estoqueprodutos_id_estoque_produto_seq'::regclass);


--
-- Name: formapagamento id_formapagamento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formapagamento ALTER COLUMN id_formapagamento SET DEFAULT nextval('public.formapagamento_id_formapagamento_seq'::regclass);


--
-- Name: gerentes id_gerente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gerentes ALTER COLUMN id_gerente SET DEFAULT nextval('public.gerentes_id_gerente_seq'::regclass);


--
-- Name: historicoprodutos id_movimentacao; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historicoprodutos ALTER COLUMN id_movimentacao SET DEFAULT nextval('public.historicoprodutos_id_movimentacao_seq'::regclass);


--
-- Name: horarios_mercados id_horario_mercados; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horarios_mercados ALTER COLUMN id_horario_mercados SET DEFAULT nextval('public.horarios_mercados_id_horario_mercados_seq'::regclass);


--
-- Name: listacompras id_listacompras; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listacompras ALTER COLUMN id_listacompras SET DEFAULT nextval('public.listacompras_id_listacompras_seq'::regclass);


--
-- Name: listasfixadas id_fixadas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listasfixadas ALTER COLUMN id_fixadas SET DEFAULT nextval('public.listasfixadas_id_fixadas_seq'::regclass);


--
-- Name: mercados id_mercado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mercados ALTER COLUMN id_mercado SET DEFAULT nextval('public.mercados_id_mercado_seq'::regclass);


--
-- Name: palavrachave id_palavrachave; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.palavrachave ALTER COLUMN id_palavrachave SET DEFAULT nextval('public.palavrachave_id_palavrachave_seq'::regclass);


--
-- Name: produtos id_produto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos ALTER COLUMN id_produto SET DEFAULT nextval('public.produtos_id_produto_seq'::regclass);


--
-- Name: promocao id_promocao; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promocao ALTER COLUMN id_promocao SET DEFAULT nextval('public.promocao_id_promocao_seq'::regclass);


--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes (nome, id_cliente, telefone, email, senha, cpf, data_nasc) FROM stdin;
João Souza Silva	2	11111111111	piroca@hotmail.com	11111111	11111111111	1111-11-11
João Souza Silva	3	11111111111	clainebordignon@hotmail.com	111111111	11111111111	1111-11-11
amenildo	4	11111111111	amenildo@gmail.com	12345678	11111111111	1111-11-11
\.


--
-- Data for Name: clientes_mercados_relacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes_mercados_relacao (fk_id_cliente, fk_id_mercado) FROM stdin;
\.


--
-- Data for Name: endereco_cliente_relecao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.endereco_cliente_relecao (fk_id_cliente, fk_id_enderecocliente) FROM stdin;
2	1
3	2
4	3
\.


--
-- Data for Name: enderecoclientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enderecoclientes (id_enderecocliente, cep, bairro, logradouro, numero, apelido, complemento, latitude, longitude, isatual) FROM stdin;
1	88058089	Ingleses do Rio Vermelho	Servidão Nossa Senhora Aparecida	45	pintopolis	Andar 2, Apartamento 1	-27.43691	-48.40211	\N
2	88058089	Ingleses do Rio Vermelho	Servidão Nossa Senhora Aparecida	45	pintopolis	apto 301	-27.43691	-48.40211	\N
3	88058089	Barra da Lagoa	Servidão Recanto da Vovó	6565	minha casinha	Andar 2, Apartamento 1	-27.43691	-48.40211	t
\.


--
-- Data for Name: enderecomercados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enderecomercados (id_enderecomercado, cep, bairro, logradouro, numero, fk_id_mercado, latitude, longitude, complemento) FROM stdin;
5	88058512	Ingleses do Rio Vermelho	Servidão Leonel Domingos da Silva	123	5	-27.44879	-48.38145	dsjvvkjdsvsdl
6	88058088	Saco Grande	Rodovia José Carlos Daux	 3730	6	-27.54083	-48.50561	Fiesc Senai
9	88058732	Ingleses do Rio Vermelho	Servidão Andorinhas do Costão	232	10	-27.44935	-48.37694	
10	88058732	Ingleses do Rio Vermelho	Servidão Andorinhas do Costão	45	11	-27.44935	-48.37694	apto 301
2	88058093	Ingleses do Rio Vermelho	Servidão Paraíso dos Ingleses	2000	2	-27.43699	-48.39881	do lado da praça
\.


--
-- Data for Name: estoqueprodutos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estoqueprodutos (id_estoque_produto, quantidade_estoque, fk_id_produto) FROM stdin;
5	1	5
6	1	6
7	1	7
8	1	8
9	1	9
10	1	10
11	1	11
12	1	12
13	1	13
14	1	14
19	1	19
15	1	15
16	1	16
17	1	17
18	1	18
20	1	20
21	1	21
22	1	22
23	1	23
24	1	24
43	1	60
47	20	64
46	30	63
48	10	117
49	10	118
50	9	119
51	39	120
52	200	121
53	22	122
54	200	123
55	200	124
56	200	125
57	100	126
58	39	127
59	300	128
60	200	129
61	39	130
62	200	131
63	20	132
64	39	133
65	10	134
66	98	135
67	39	136
68	10	137
69	39	138
70	200	139
71	100	140
72	100	141
73	200	142
\.


--
-- Data for Name: formapagamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.formapagamento (id_formapagamento, img_forma, descricao_forma, fk_id_mercado) FROM stdin;
\.


--
-- Data for Name: gerentes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gerentes (id_gerente, nome, data_nasc, cpf, email, mei, telefone, senha) FROM stdin;
8	Gabriel Fernandes 	2007-01-16	70565351605	gj16012007@gmail.com	\N	31995007516	Biel125141
7	Juan Francisco García Flores	1111-11-11	11111111545	ejemplo@ejemplo.mx	\N	55534284005	11111111
1	Osmar Pinto de Jesus	1111-11-11	22222222222	osmar@gmail.com	\N	11111111111	111111111
9	João Souza Silva	1111-11-11	12345678909	joao@exemplo.com	\N	11111111111	12345678
11	João Souza Silva	1111-11-11	11111111121	joao2@gmail.com	\N	11111111111	12345678
12	João Souza Silva	1111-11-11	11111133333	Joao@hotmail.com	\N	11111111111	11111111
13	João Souza Silva	2006-01-16	00000000000	joao4@gmail.com	\N	48998767876	12345678
17	João Souza Silva	1111-11-11	11111111111	samuelborwie@gmail.comm	\N	31212868002	11111111
18	João Souza Silva	1111-11-11	11111111111	samuelborwie@gmail.com	\N	48999749819	11111111
19	João Souza Silva	1111-11-11	11111111111	samuelborwie@gmail.commm	\N	48999749819	11111111
20	Vitor Azevedo	2006-01-16	12345678901	VitorAzevedo@gmail.com	\N	48999749819	12345678
2	julia cacetuda	1111-11-11	11111111111	teste@exemplo.us	\N	31212868001	11111111
\.


--
-- Data for Name: historicoprodutos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historicoprodutos (id_movimentacao, tipo_movimentacao, data_movimentacao, quantidade_movimentada, fk_id_produto, fk_id_gerente, fk_id_mercado) FROM stdin;
\.


--
-- Data for Name: horarios_mercados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.horarios_mercados (id_horario_mercados, dia_semana, hora_inicio, hora_fim, fk_id_mercado) FROM stdin;
\.


--
-- Data for Name: listacmp_produto_relacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.listacmp_produto_relacao (fk_id_listacompras, fk_id_produto) FROM stdin;
\.


--
-- Data for Name: listacompras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.listacompras (preco_total, data_compra, id_listacompras, fk_id_cliente) FROM stdin;
\.


--
-- Data for Name: listafxd_listacmp_relacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.listafxd_listacmp_relacao (fk_id_listacompras, fk_id_fixadas) FROM stdin;
\.


--
-- Data for Name: listasfixadas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.listasfixadas (id_fixadas, fk_id_cliente) FROM stdin;
\.


--
-- Data for Name: mercados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mercados (id_mercado, logo, telefone, email, nome, cnpj, fk_id_gerente) FROM stdin;
2	1733695698980.jpeg	48963373162	semprefarto@gmail.com	Mercado Sempre Farto	54152671872898	2
10	1733950049066.png	48999749819	samuelborwie@gmail.com	Mercado João	12755783658300	18
9	1733925741817.png	00468922222	MercadoSamuel@gmail.com	Mercado muuito Legal	12755783659993	13
11	1733950530451.png	48999749819	samuelborwie@gmail.comm	Mercado Lua	12755783658333	19
5	1733697322810.png	12345678111	Juan@gmail.com	Logo Aali	12345899876543	7
6	1733855072023.avif	31996786884	mercadodeGabriel@gmail.com	Mercado Company	56787657816116	8
\.


--
-- Data for Name: palavrachave; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.palavrachave (nome_palavra, id_palavrachave, categoria, sinonimos) FROM stdin;
Arroz	21	Grãos	Cereal, Grão, Parboilizado
Feijão	22	Grãos	Leguminosa, Preto, Carioca
Leite	23	Laticínios	Integral, Desnatado, Semidesnatado
Pão	24	Padaria	Francês, Integral, Caseiro
Sabonete	25	Higiene	Barra, Líquido, Perfumado
Café	26	Bebidas	Solúvel, Torrado, Moído
Açúcar	27	Mercearia	Cristal, Refinado, Mascavo
Óleo	28	Mercearia	Soja, Milho, Canola
Frango	29	Carnes	Peito, Coxa, Sobrecoxa
Shampoo	30	Higiene	Cabelos, Hidratante, Anti-queda
Banana	31	Frutas	Doce, Versátil, Prata, Nanica
Maçã	32	Frutas	Ácida, Fuji, Verde, Gala
Laranja	33	Frutas	Doce, Pera, Bahia, Lima
Batata	34	Verduras	Inglesa, Doce, Versátil
Cenoura	35	Verduras	Baby, Fresca, Rica, Vitaminas
Tomate	36	Verduras	Italiano, Cereja, Saboroso
Cebola	37	Verduras	Roxa, Branca, Fresca, Adocicada
Pimentão	38	Verduras	Amarelo, Vermelho, Verde, Doce
Alface	39	Verduras	Lisa, Crespa, Americana, Crocante
Couve Flor	40	Verduras	Fresca, Nutritiva, Suave
Mamão	41	Frutas	Formosa, Doce, Café da manhã
Abacaxi	42	Frutas	Pérola, Doce, Suculento
Abóbora	43	Verduras	Moranga, Versátil, Purê
Quiabo	44	Verduras	Fresco, Típico, Ensopados
Chuchu	45	Verduras	Leve, Ensopados, Fresco
Brócolis	46	Verduras	alguma coisa
Cerveja	47	Alcoólicas	Gelada, Lata, Garrafa
Vinho Tinto	48	Alcoólicas	Seco, Suave, Uvas
Espumante	49	Alcoólicas	Champanhe, Brinde, Festivo
Whisky	50	Alcoólicas	Bourbon, Malte, Premium
Vodka	51	Alcoólicas	Destilado, Cocktails, Festas
Refrigerante	52	Não Alcoólicas	Gaseificado, Lata, Garrafa
Água Mineral	53	Não Alcoólicas	Sem gás, Com gás, Garrafa
Água de Coco	54	Não Alcoólicas	Natural, Hidratante, Saúde
Energético	55	Não Alcoólicas	Lata, Estimulante, Cafeína
Suco de Laranja	56	Sucos	Natural, Vitaminado, Frutas cítricas
Suco de Uva	57	Sucos	Integral, Doce, Antioxidante
Suco de Maracujá	58	Sucos	Natural, Calmante, Refrescante
Néctar de Pêssego	59	Sucos	Doce, Concentrado, Bebida leve
Chá Gelado	60	Outros	Refrescante, Ervas, Limonada
Café	61	Outros	Quente, Expresso, Aromático
Achocolatado	62	Outros	Doce, Cremoso, Leite
Leite	63	Outros	Integral, Desnatado, Fonte de cálcio
Detergente	64	Detergentes	Lavar louça, Espuma, Desengordurante
Sabão em Pó	65	Detergentes	Roupas, Máquina, Brancura
Amaciante	66	Cuidados com Roupas	Perfume, Maciez, Roupa limpa
Alvejante	67	Cuidados com Roupas	Cloro, Roupas brancas, Limpeza pesada
Desinfetante	68	Desinfetantes	Cheiroso, Antisséptico, Banheiro
Água Sanitária	69	Desinfetantes	Cloro, Bactericida, Multiuso
Limpador Multiuso	70	Multiuso	Vidros, Superfícies, Versátil
Esponja de Aço	71	Utensílios	Panela, Lavar, Resistente
Vassoura	72	Utensílios	Varredura, Piso, Limpeza
Rodo	73	Utensílios	Secagem, Piso, Prático
Pano de Chão	74	Utensílios	Limpeza pesada, Absorvente, Prático
Álcool em Gel	75	Desinfetantes	Antisséptico, Higienizar, Multiuso
Lustra-móveis	76	Produtos Especiais	Brilho, Madeira, Conservação
Removedor	77	Produtos Especiais	Manchas, Pisos, Multiuso
Inseticida	78	Produtos Especiais	Dedetizar, Repelente, Aerosol
Desodorizador	79	Produtos Especiais	Aromas, Cheiroso, Frescor
Picanha	80	Bovinos	Carne nobre, Grelhar, Churrasco
Alcatra	81	Bovinos	Macia, Bifes, Churrasco
Fraldinha	82	Bovinos	Churrasco, Desfiar, Suculenta
Costela	83	Bovinos	Churrasco, Assados, Saborosa
Pernil	84	Suínos	Assados, Temperado, Suculento
Lombo	85	Suínos	Assados, Marinados, Macio
Linguiça	86	Suínos	Churrasco, Temperada, Versátil
Sobrecoxa	87	Aves	Frango, Assados, Suculenta
Coxa	88	Aves	Frango, Ensopados, Macia
Filé de peito	89	Aves	Frango, Grelhar, Saudável
Salmão	90	Peixes	Grelhado, Omega 3, Sashimi
Tilápia	91	Peixes	Frito, Assado, Saudável
Bacalhau	92	Peixes	Tradicional, Salgado, Cozido
Água Tônica	93	Bebidas	Tônica
Suco de maçã	94	Sucos	Maçã, Doce
iogurte	95	Laticínios	iogurte natural, iogurte grego, iogurte de leite
água com gás	96	Bebidas	água gaseificada, água com gás mineral
Cerveja	97	Alcoólicas	Gelada, Lata, Garrafa
\.


--
-- Data for Name: palavrachave_produto_relacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.palavrachave_produto_relacao (fk_id_produto, fk_id_palavrachave) FROM stdin;
5	31
6	32
7	33
8	34
9	35
10	36
11	37
12	38
13	39
15	31
16	32
17	33
18	34
19	35
20	36
21	37
22	38
23	39
24	46
60	21
14	40
63	80
64	81
117	82
118	83
119	84
120	85
121	88
122	88
123	97
124	97
125	52
126	67
127	37
128	52
129	52
130	27
131	52
132	53
133	52
134	52
135	67
136	52
137	57
138	94
139	53
140	34
141	74
142	42
\.


--
-- Data for Name: produto_promocao_relacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produto_promocao_relacao (fk_id_promocao, fk_id_produto) FROM stdin;
\.


--
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produtos (id_produto, descricao, codigo, quantidade, imagem_file_path, nome, preco, fk_id_mercado, unidademedida) FROM stdin;
117	Fraldinha bovina resfriada sem osso	12342435	1	1734013072171.png	Fraldinha Bovina	44.99	2	Kg
118	Costela Dessosada resfriada	5272FSHE2	1	1734013199546.png	Costela bovina Dessosada	39.99	2	Kg
119	Pernil Dessosado resfriado	565E768	1	1734013313841.png	Pernil dessosado	34.99	5	Kg
5	Banana doce e versátil para receitas ou consumo direto.	501	60	banana_prata.png	Banana Prata	3.99	5	kg
6	Maçã de sabor ácido, ótima para saladas.	502	28	maca_verde.png	Maçã Verde	6.79	5	kg
7	Laranja de casca grossa e sabor forte.	503	45	laranja_bahia.png	Laranja Bahia	4.39	5	kg
8	Batata fresca para diversas preparações.	504	110	batata_inglesa.png	Batata Inglesa	3.59	5	kg
9	Cenoura pequena e macia, ideal para snacks.	505	70	cenoura_baby.png	Cenoura Baby	3.29	5	kg
10	Tomate de formato alongado e sabor intenso.	506	55	tomate_italiano.png	Tomate Italiano	5.39	5	kg
11	Cebola de sabor levemente adocicado.	507	60	cebola_roxa.png	Cebola Roxa	4.69	5	kg
12	Pimentão doce e de coloração vibrante.	508	35	pimentao_amarelo.png	Pimentão Amarelo	4.29	5	kg
13	Alface macia, ideal para sanduíches.	509	20	alface_lisa.png	Alface Lisa	2.99	5	un
14	Couve-flor fresca e de sabor suave.	510	18	couve_flor.png	Couve Flor	4.89	5	un
120	Linguiça defumada resfriada	5272FSHE2	1	1734013453105.png	Linguiça de calabresa defumada	22	5	Kg
121	Filè de peito desfiado resfriado	123424300	400	1734013820146.png	Filé de peito desfiado	23.99	5	g
122	Sobrecoxa dessosada e temperada	23w324686	500	1734013667494.png	Sobrecoxa Dessosada	18.99	2	g
123	Cerveja resfriada	1111233	350	1734014023061.png	Cerveja Corona Extra	5.99	5	ml
124	Cerveja lata resfriada	23w3246899	250	1734014119768.png	Cerveja Eisenbahn Pilsen	3.99	5	ml
125	Coca cola retornavel	565E768	2	1734014222269.png	Coca cola 2L retornavel	7.99	5	L
126	Iorgute de morango Parcialmente Desnatado	11112332	1000	1734014532418.png	Iorgute de morango	12.99	2	g
127	Suco de uva de caixa com zinco e vitaminas.	1223434	200	1734014663037.png	Nectar uva Dell Valle	15	2	ml
128	Pepsi pequena resfriada	2321rewf32	200	1734014750475.png	Refrigerante Pepsi	2.99	5	ml
129	Coca cola lata resfriada	12312ewd89	350	1734014799214.png	Refrigerante Coca Cola Lata	5.99	2	ml
130	Cerveja Heineken Resfriada	eewue72	250	1734014978356.png	Cerveja Heineken	4.99	5	ml
131	Guaraná Original lata	1111233	350	1734015365797.png	Refrigerante Guaraná antarctica Original	4.99	5	ml
132	Garrafa de água com gas	67627ey2178	500	1734015841219.png	Garrafa de água Crystal com gas	3.5	5	ml
133	Refrigerante Schweppes fresfriado	1111239	1	1734016008570.png	Refrigerante Schweppes	11.5	5	ml
134	Lata de 350ml de Fanta Laranja	123rfdsa	350	1734018721660.png	Fanta Laranja Lata 350ml	3.98	5	ml
135	Iogurte zero sabor coco	1234easfg	170	1734018840728.png	Iogurte Zero Frimesa	2.93	5	g
136	Guaraná Antártica Original Garrafa 2L	987324gag	2	1734018937567.png	Guaraná Antártica 2L	9.65	2	L
137	Suco integral de uva, engarrafado. Peso total 1.5L	367248749	1	1734019037487.png	Suco de Uva Integral Aurora 1.5L	34.99	5	L
138	Suco de Maçã Campo Largo, 900ml	1111233	900	1734019336252.png	Suco de Maçã Campo Largo	12.99	2	ml
139	Água Mineral sem Gás Bonafont, 510ml	1322wr	510	1734019492477.png	Água Mineral sem Gás Bonafont	2	2	ml
140	Água de Coco Kero Coco, 1L	2q145233y	1	1734019549699.png	Água de Coco 1L	15.76	5	L
141	Água Tônica Lata 350ml, Tônica Antarctica	345679OSJ	350	1734019716900.png	Água Tônica Lata	6.87	2	ml
142	Toddynho sabor chocolate	12312rwd3	200	1734019780126.png	Toddynho	2.5	5	ml
19	Cenoura de excelente qualidade para consumo cru ou cozido.	205	45	1733695920759.png	Cenoura	3.09	2	g
15	Banana doce e macia, ideal para sobremesas.	201	220	1733696076087.png	Banana Nanica	3.79	2	g
16	Maçã de polpa firme e sabor adocicado.	202	54	1733696118809.png	Maçã Fuji	6.59	2	g
17	Laranja doce e menos ácida, perfeita para crianças.	203	80	1733696202085.png	Laranja Lima	4.19	2	g
18	Batata doce fresca e rica em nutrientes.	204	300	1733696244110.png	Batata Doce	3.29	2	g
20	Tomate pequeno e doce, ótimo para saladas.	206	25	1733696442237.png	Tomate Cereja	5.89	2	un
21	Cebola fresca, ótima para refogados.	207	72	1733696517946.png	Cebola Branca	4.59	2	g
22	Pimentão doce e colorido, ideal para pratos decorativos.	208	58	1733696656856.png	Pimentão Vermelho	4.19	2	g
23	Alface crocante e de sabor suave.	209	390	1733696695925.png	Alface Americana	3.19	2	g
24	Brócolis fresco e rico em ferro.	210	1	1733696934435.png	Brócolis	4.99	2	un
60	bananas muito saborosas	2368DF7	100	1733926195622.png	hxjcsdgjdv	5.5	9	Kg
64	Alcatra temperada sem osso	64878	1	1733962399001.png	Alcatra sem osso	49.99	2	Kg
63	Carne resfriada de Bovino sem osso Picanha	123543	1	1733962191139.png	Picanha Resfriada	84.99	2	Kg
\.


--
-- Data for Name: promocao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promocao (data_inicio, data_fim, id_promocao, descricao_promocao, desconto_aplicado) FROM stdin;
\.


--
-- Name: clientes_id_cliente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_cliente_seq', 4, true);


--
-- Name: enderecoclientes_id_enderecocliente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enderecoclientes_id_enderecocliente_seq', 3, true);


--
-- Name: enderecomercados_id_enderecomercado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enderecomercados_id_enderecomercado_seq', 11, true);


--
-- Name: estoqueprodutos_id_estoque_produto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estoqueprodutos_id_estoque_produto_seq', 73, true);


--
-- Name: formapagamento_id_formapagamento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.formapagamento_id_formapagamento_seq', 1, false);


--
-- Name: gerentes_id_gerente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gerentes_id_gerente_seq', 20, true);


--
-- Name: historicoprodutos_id_movimentacao_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historicoprodutos_id_movimentacao_seq', 1, false);


--
-- Name: horarios_mercados_id_horario_mercados_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.horarios_mercados_id_horario_mercados_seq', 1, false);


--
-- Name: listacompras_id_listacompras_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.listacompras_id_listacompras_seq', 1, false);


--
-- Name: listasfixadas_id_fixadas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.listasfixadas_id_fixadas_seq', 1, false);


--
-- Name: mercados_id_mercado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mercados_id_mercado_seq', 12, true);


--
-- Name: palavrachave_id_palavrachave_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.palavrachave_id_palavrachave_seq', 97, true);


--
-- Name: produtos_id_produto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produtos_id_produto_seq', 142, true);


--
-- Name: promocao_id_promocao_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.promocao_id_promocao_seq', 1, false);


--
-- Name: clientes clientes_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_email_key UNIQUE (email);


--
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id_cliente);


--
-- Name: enderecoclientes enderecoclientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enderecoclientes
    ADD CONSTRAINT enderecoclientes_pkey PRIMARY KEY (id_enderecocliente);


--
-- Name: enderecomercados enderecomercados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enderecomercados
    ADD CONSTRAINT enderecomercados_pkey PRIMARY KEY (id_enderecomercado);


--
-- Name: estoqueprodutos estoqueprodutos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoqueprodutos
    ADD CONSTRAINT estoqueprodutos_pkey PRIMARY KEY (id_estoque_produto);


--
-- Name: formapagamento formapagamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formapagamento
    ADD CONSTRAINT formapagamento_pkey PRIMARY KEY (id_formapagamento);


--
-- Name: gerentes gerentes_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gerentes
    ADD CONSTRAINT gerentes_email_key UNIQUE (email);


--
-- Name: gerentes gerentes_mei_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gerentes
    ADD CONSTRAINT gerentes_mei_key UNIQUE (mei);


--
-- Name: gerentes gerentes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gerentes
    ADD CONSTRAINT gerentes_pkey PRIMARY KEY (id_gerente);


--
-- Name: historicoprodutos historicoprodutos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historicoprodutos
    ADD CONSTRAINT historicoprodutos_pkey PRIMARY KEY (id_movimentacao);


--
-- Name: horarios_mercados horarios_mercados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horarios_mercados
    ADD CONSTRAINT horarios_mercados_pkey PRIMARY KEY (id_horario_mercados);


--
-- Name: listacompras listacompras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listacompras
    ADD CONSTRAINT listacompras_pkey PRIMARY KEY (id_listacompras);


--
-- Name: listasfixadas listasfixadas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listasfixadas
    ADD CONSTRAINT listasfixadas_pkey PRIMARY KEY (id_fixadas);


--
-- Name: mercados mercados_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mercados
    ADD CONSTRAINT mercados_email_key UNIQUE (email);


--
-- Name: mercados mercados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mercados
    ADD CONSTRAINT mercados_pkey PRIMARY KEY (id_mercado);


--
-- Name: palavrachave palavrachave_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.palavrachave
    ADD CONSTRAINT palavrachave_pkey PRIMARY KEY (id_palavrachave);


--
-- Name: produtos produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_pkey PRIMARY KEY (id_produto);


--
-- Name: promocao promocao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promocao
    ADD CONSTRAINT promocao_pkey PRIMARY KEY (id_promocao);


--
-- Name: clientes_mercados_relacao fk_clientes_mercados_relacao_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_mercados_relacao
    ADD CONSTRAINT fk_clientes_mercados_relacao_1 FOREIGN KEY (fk_id_cliente) REFERENCES public.clientes(id_cliente) ON DELETE CASCADE;


--
-- Name: clientes_mercados_relacao fk_clientes_mercados_relacao_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_mercados_relacao
    ADD CONSTRAINT fk_clientes_mercados_relacao_2 FOREIGN KEY (fk_id_mercado) REFERENCES public.mercados(id_mercado) ON DELETE CASCADE;


--
-- Name: endereco_cliente_relecao fk_endereco_cliente_relecao_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endereco_cliente_relecao
    ADD CONSTRAINT fk_endereco_cliente_relecao_1 FOREIGN KEY (fk_id_cliente) REFERENCES public.clientes(id_cliente) ON DELETE CASCADE;


--
-- Name: endereco_cliente_relecao fk_endereco_cliente_relecao_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endereco_cliente_relecao
    ADD CONSTRAINT fk_endereco_cliente_relecao_2 FOREIGN KEY (fk_id_enderecocliente) REFERENCES public.enderecoclientes(id_enderecocliente) ON DELETE CASCADE;


--
-- Name: enderecomercados fk_enderecomercado_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enderecomercados
    ADD CONSTRAINT fk_enderecomercado_2 FOREIGN KEY (fk_id_mercado) REFERENCES public.mercados(id_mercado) ON DELETE CASCADE;


--
-- Name: formapagamento fk_formapagamento_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formapagamento
    ADD CONSTRAINT fk_formapagamento_2 FOREIGN KEY (fk_id_mercado) REFERENCES public.mercados(id_mercado) ON DELETE CASCADE;


--
-- Name: historicoprodutos fk_historicoproduto_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historicoprodutos
    ADD CONSTRAINT fk_historicoproduto_2 FOREIGN KEY (fk_id_produto) REFERENCES public.produtos(id_produto) ON DELETE CASCADE;


--
-- Name: historicoprodutos fk_historicoproduto_3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historicoprodutos
    ADD CONSTRAINT fk_historicoproduto_3 FOREIGN KEY (fk_id_gerente) REFERENCES public.gerentes(id_gerente) ON DELETE CASCADE;


--
-- Name: historicoprodutos fk_historicoproduto_4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historicoprodutos
    ADD CONSTRAINT fk_historicoproduto_4 FOREIGN KEY (fk_id_mercado) REFERENCES public.mercados(id_mercado) ON DELETE CASCADE;


--
-- Name: horarios_mercados fk_horarios_mercados_3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horarios_mercados
    ADD CONSTRAINT fk_horarios_mercados_3 FOREIGN KEY (fk_id_mercado) REFERENCES public.mercados(id_mercado) ON DELETE CASCADE;


--
-- Name: listacmp_produto_relacao fk_listacmp_produto_relacao_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listacmp_produto_relacao
    ADD CONSTRAINT fk_listacmp_produto_relacao_1 FOREIGN KEY (fk_id_listacompras) REFERENCES public.listacompras(id_listacompras) ON DELETE CASCADE;


--
-- Name: listacmp_produto_relacao fk_listacmp_produto_relacao_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listacmp_produto_relacao
    ADD CONSTRAINT fk_listacmp_produto_relacao_2 FOREIGN KEY (fk_id_produto) REFERENCES public.produtos(id_produto) ON DELETE CASCADE;


--
-- Name: listacompras fk_listacompras_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listacompras
    ADD CONSTRAINT fk_listacompras_2 FOREIGN KEY (fk_id_cliente) REFERENCES public.clientes(id_cliente) ON DELETE CASCADE;


--
-- Name: listafxd_listacmp_relacao fk_listafxd_listacmp_relacao_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listafxd_listacmp_relacao
    ADD CONSTRAINT fk_listafxd_listacmp_relacao_1 FOREIGN KEY (fk_id_listacompras) REFERENCES public.listacompras(id_listacompras) ON DELETE CASCADE;


--
-- Name: listafxd_listacmp_relacao fk_listafxd_listacmp_relacao_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listafxd_listacmp_relacao
    ADD CONSTRAINT fk_listafxd_listacmp_relacao_2 FOREIGN KEY (fk_id_fixadas) REFERENCES public.listasfixadas(id_fixadas) ON DELETE SET NULL;


--
-- Name: listasfixadas fk_listasfixadas_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listasfixadas
    ADD CONSTRAINT fk_listasfixadas_2 FOREIGN KEY (fk_id_cliente) REFERENCES public.clientes(id_cliente) ON DELETE CASCADE;


--
-- Name: mercados fk_mercado_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mercados
    ADD CONSTRAINT fk_mercado_2 FOREIGN KEY (fk_id_gerente) REFERENCES public.gerentes(id_gerente) ON DELETE RESTRICT;


--
-- Name: palavrachave_produto_relacao fk_palavrachave_produto_relacao_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.palavrachave_produto_relacao
    ADD CONSTRAINT fk_palavrachave_produto_relacao_1 FOREIGN KEY (fk_id_produto) REFERENCES public.produtos(id_produto) ON DELETE CASCADE;


--
-- Name: palavrachave_produto_relacao fk_palavrachave_produto_relacao_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.palavrachave_produto_relacao
    ADD CONSTRAINT fk_palavrachave_produto_relacao_2 FOREIGN KEY (fk_id_palavrachave) REFERENCES public.palavrachave(id_palavrachave) ON DELETE RESTRICT;


--
-- Name: estoqueprodutos fk_produto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoqueprodutos
    ADD CONSTRAINT fk_produto FOREIGN KEY (fk_id_produto) REFERENCES public.produtos(id_produto) ON DELETE CASCADE;


--
-- Name: produto_promocao_relacao fk_produto_promocao_relacao_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_promocao_relacao
    ADD CONSTRAINT fk_produto_promocao_relacao_1 FOREIGN KEY (fk_id_promocao) REFERENCES public.promocao(id_promocao) ON DELETE RESTRICT;


--
-- Name: produto_promocao_relacao fk_produto_promocao_relacao_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_promocao_relacao
    ADD CONSTRAINT fk_produto_promocao_relacao_2 FOREIGN KEY (fk_id_produto) REFERENCES public.produtos(id_produto) ON DELETE CASCADE;


--
-- Name: produtos fk_produtos_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT fk_produtos_2 FOREIGN KEY (fk_id_mercado) REFERENCES public.mercados(id_mercado) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

