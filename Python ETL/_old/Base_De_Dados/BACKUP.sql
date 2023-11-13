--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-03-20 21:42:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 219 (class 1259 OID 25206)
-- Name: agendamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agendamento (
    id integer NOT NULL,
    date character varying NOT NULL,
    horario_inicio timestamp without time zone NOT NULL,
    horario_fim timestamp without time zone NOT NULL,
    id_professor character varying NOT NULL,
    id_grade character varying NOT NULL,
    id_laboratorio character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.agendamento OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25205)
-- Name: agendamento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agendamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agendamento_id_seq OWNER TO postgres;

--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 218
-- Name: agendamento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agendamento_id_seq OWNED BY public.agendamento.id;


--
-- TOC entry 217 (class 1259 OID 25197)
-- Name: disciplinas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disciplinas (
    id integer NOT NULL,
    descricao character varying NOT NULL
);


ALTER TABLE public.disciplinas OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 25196)
-- Name: disciplinas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.disciplinas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.disciplinas_id_seq OWNER TO postgres;

--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 216
-- Name: disciplinas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.disciplinas_id_seq OWNED BY public.disciplinas.id;


--
-- TOC entry 221 (class 1259 OID 25216)
-- Name: grade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grade (
    id integer NOT NULL,
    horario_inicio timestamp without time zone NOT NULL,
    horario_fim timestamp without time zone NOT NULL,
    id_professor character varying NOT NULL,
    dia_da_semana character varying NOT NULL,
    id_disciplina character varying NOT NULL,
    id_sala character varying NOT NULL,
    semestre character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.grade OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25215)
-- Name: grade_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.grade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.grade_id_seq OWNER TO postgres;

--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 220
-- Name: grade_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.grade_id_seq OWNED BY public.grade.id;


--
-- TOC entry 223 (class 1259 OID 25226)
-- Name: laboratorios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.laboratorios (
    id integer NOT NULL,
    descricao character varying NOT NULL,
    capacidade integer NOT NULL
);


ALTER TABLE public.laboratorios OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 25225)
-- Name: laboratorios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.laboratorios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.laboratorios_id_seq OWNER TO postgres;

--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 222
-- Name: laboratorios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.laboratorios_id_seq OWNED BY public.laboratorios.id;


--
-- TOC entry 215 (class 1259 OID 25087)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 25086)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 214
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 225 (class 1259 OID 25235)
-- Name: professores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.professores (
    id integer NOT NULL,
    nome_completo character varying NOT NULL,
    id_perfil_usuario integer
);


ALTER TABLE public.professores OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 25234)
-- Name: professores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.professores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.professores_id_seq OWNER TO postgres;

--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 224
-- Name: professores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.professores_id_seq OWNED BY public.professores.id;


--
-- TOC entry 3200 (class 2604 OID 25209)
-- Name: agendamento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamento ALTER COLUMN id SET DEFAULT nextval('public.agendamento_id_seq'::regclass);


--
-- TOC entry 3199 (class 2604 OID 25200)
-- Name: disciplinas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplinas ALTER COLUMN id SET DEFAULT nextval('public.disciplinas_id_seq'::regclass);


--
-- TOC entry 3202 (class 2604 OID 25219)
-- Name: grade id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade ALTER COLUMN id SET DEFAULT nextval('public.grade_id_seq'::regclass);


--
-- TOC entry 3204 (class 2604 OID 25229)
-- Name: laboratorios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laboratorios ALTER COLUMN id SET DEFAULT nextval('public.laboratorios_id_seq'::regclass);


--
-- TOC entry 3198 (class 2604 OID 25090)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3205 (class 2604 OID 25238)
-- Name: professores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professores ALTER COLUMN id SET DEFAULT nextval('public.professores_id_seq'::regclass);


--
-- TOC entry 3365 (class 0 OID 25206)
-- Dependencies: 219
-- Data for Name: agendamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agendamento (id, date, horario_inicio, horario_fim, id_professor, id_grade, id_laboratorio, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3363 (class 0 OID 25197)
-- Dependencies: 217
-- Data for Name: disciplinas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disciplinas (id, descricao) FROM stdin;
1	Administração Geral
2	Algoritmos e Lógica de Programação
3	Arquitetura e Organização de Computadores
4	Banco de Dados
5	Cálculo
6	Comunicação e Expressão
7	Contabilidade
8	Economia e Finanças
9	Eletiva - Programação para Dispositivos Móveis
10	Engenharia de Software I
11	Engenharia de Software II
12	Engenharia de Software III
13	Estatística Aplicada
14	Estruturas de Dados
15	Inglês I
16	Inglês II
17	Inglês III
18	Inglês IV
19	Interação Humano Computador
20	Laboratório de Hardware
21	Linguagem de Programação
22	Matemática Discreta
23	Metodologia da Pesquisa Científico-Tecnológica
24	Programação em Microinformática
25	Programação Orientada a Objetos
26	Sistemas de Informação
27	Sistemas Operacionais I
28	Sistemas Operacionais II
29	Sociedade e Tecnologia
\.


--
-- TOC entry 3367 (class 0 OID 25216)
-- Dependencies: 221
-- Data for Name: grade; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grade (id, horario_inicio, horario_fim, id_professor, dia_da_semana, id_disciplina, id_sala, semestre, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3369 (class 0 OID 25226)
-- Dependencies: 223
-- Data for Name: laboratorios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.laboratorios (id, descricao, capacidade) FROM stdin;
1	Sala-1	31
2	Sala-2	31
3	Sala-3	31
4	Sala-4	31
5	Sala-5	31
6	Sala-6	31
7	Sala-7	31
8	Sala-8	31
9	Sala-9	31
10	Sala-10	31
11	Sala-11	31
12	Sala-12	31
13	Sala-13	31
14	Sala-14	31
15	Sala-15	31
16	Sala-16	31
17	Sala-17	31
18	Sala-18	31
19	Sala-19	31
20	Sala-20	31
21	Laboratorio-1	31
22	Laboratorio-2	31
23	Laboratorio-3	31
24	Laboratorio-4	31
25	Laboratorio-5	31
26	Laboratorio-6	31
\.


--
-- TOC entry 3361 (class 0 OID 25087)
-- Dependencies: 215
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
3	1679358733358	default1679358733358
4	1679358908647	default1679358908647
\.


--
-- TOC entry 3371 (class 0 OID 25235)
-- Dependencies: 225
-- Data for Name: professores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.professores (id, nome_completo, id_perfil_usuario) FROM stdin;
1	Anna Renata	0
2	Cilmara	0
3	Divani	0
4	Érica	0
5	Francisco	0
6	Jean	0
7	José Geraldo	0
8	Luis Felipe	0
9	Luiz Evangelista	0
10	Manuela	0
11	Marcos Allan	0
12	Michel	0
13	Pedro Jacob	0
14	Ronaldo	0
15	Wagner	0
16	Zanetti	0
\.


--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 218
-- Name: agendamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agendamento_id_seq', 1, false);


--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 216
-- Name: disciplinas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disciplinas_id_seq', 1, false);


--
-- TOC entry 3385 (class 0 OID 0)
-- Dependencies: 220
-- Name: grade_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grade_id_seq', 1, false);


--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 222
-- Name: laboratorios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.laboratorios_id_seq', 1, false);


--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 214
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 4, true);


--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 224
-- Name: professores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.professores_id_seq', 1, false);


--
-- TOC entry 3217 (class 2606 OID 25242)
-- Name: professores PK_13f01466be85817b29ed8abf74f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professores
    ADD CONSTRAINT "PK_13f01466be85817b29ed8abf74f" PRIMARY KEY (id);


--
-- TOC entry 3213 (class 2606 OID 25224)
-- Name: grade PK_58c2176c3ae96bf57daebdbcb5e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY (id);


--
-- TOC entry 3209 (class 2606 OID 25204)
-- Name: disciplinas PK_63ac31213d82b3a8e99c1a6c4a3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplinas
    ADD CONSTRAINT "PK_63ac31213d82b3a8e99c1a6c4a3" PRIMARY KEY (id);


--
-- TOC entry 3207 (class 2606 OID 25094)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 3211 (class 2606 OID 25214)
-- Name: agendamento PK_a102b15cfec9ce6d8ac6193345f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamento
    ADD CONSTRAINT "PK_a102b15cfec9ce6d8ac6193345f" PRIMARY KEY (id);


--
-- TOC entry 3215 (class 2606 OID 25233)
-- Name: laboratorios PK_f3e5296e106c63a9f075157f4bd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laboratorios
    ADD CONSTRAINT "PK_f3e5296e106c63a9f075157f4bd" PRIMARY KEY (id);


-- Completed on 2023-03-20 21:42:10

--
-- PostgreSQL database dump complete
--

