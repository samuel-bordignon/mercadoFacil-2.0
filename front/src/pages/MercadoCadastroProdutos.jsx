import React, { useState, useContext, useEffect } from "react"
import Select from "react-select"
import Sidebar from "../components/Sidebar"
import "./MercadoCadastroProdutos.css"
import { GlobalContext } from "../contexts/GlobalContext"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { div } from "framer-motion/client"

function MercadoCadastroProdutos() {
  const { unidadeOptions, uploadImage, getLocalStorage, getDataByForeignKey, getDataById, getData, loading, updateData , addRelation } = useContext(GlobalContext)
  const [image, setImage] = useState(null)
  const [filePath, setFilePath] = useState('')
  const idProduto = getLocalStorage('id_produto')
  const storageLocal = getLocalStorage('produtoData')
  const [categoriaProdutos, setCategoriaProdutos] = useState([])
  const [idEstoqueProduto, setIdEstoqueProduto] = useState(null)

  const produtoSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    preco: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Preço deve ser um número válido")
      .transform((val) => parseFloat(val).toFixed(2)),
    codigo: z
      .string()
      .min(5, "O código do produto deve ter pelo menos 5 caracteres")
      .max(20, "O código do produto não pode exceder 20 caracteres"),
    quantidade_estoque: z
      .string()
      .regex(/^\d+$/, "Quantidade deve ser um número inteiro")
      .transform((val) => parseInt(val, 10).toString()), // Retorna string
    quantidade: z
      .string()
      .regex(/^\d+$/, "Quantidade deve ser um número inteiro")
      .transform((val) => parseInt(val, 10).toString()), // Retorna string
    categoria: z.array(z.object({ value: z.string(), label: z.string() })), // Formato esperado pelo Select
    imagem_file_path: z
      .string()
      .min(1, { message: "A imagem é obrigatória" })
      .regex(/^data:image\/[a-zA-Z]+;base64,/, "O formato da imagem deve ser Base64"),
    descricao: z
      .string()
      .max(255, "A descrição não pode ultrapassar 255 caracteres")
      .optional(),
    unidade: z.object({
      value: z.string(),
      label: z.string(),
    }),

  })



  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      codigo: "",
      descricao: "",
      imagem_file_path: "",
      nome: "",
      preco: "",
      quantidade: "",
      categoria: [], // Inicial vazio, preenchido dinamicamente
      unidade: {}, // `null` para começar vazio no react-select,
    },
  })

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#FAFAFA',
      borderColor: ' #ccc',
      boxShadow: state.isFocused ? 'none' : 'none',
      '&:hover': {
        borderColor: '#0C194E',
      },
      borderRadius: 'var(--Corner-Extra-small, 4px)',
      padding: '7px 5px',
      width: '100%', // Corrigido para ocupar todo o espaço disponível
      height: "45px", // Define a altura do Select
      minHeight: "45px",
      borderRadius: "4px", // Certifique-se de usar o mesmo estilo do input
      fontSize: "16px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'gray',
      fontSize: '14px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#0C194E',
      fontWeight: '600',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#898989',
      '&:hover': {
        color: '#00C677',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%', // Alinha o dropdown com o controle
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(0, 123, 255, 0.1)' : 'white',
      color: state.isSelected ? '#0C194E' : 'black',
      fontWeight: state.isSelected ? '600' : '400',
      padding: '10px',
      '&:active': {
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
      },
    }),
  }


  useEffect(() => {
    const fetchData = async () => {
      if (!idProduto) return
      try {
        const produto = getLocalStorage("produtoData")
        const tabelaRelacao = await getDataByForeignKey(
          "palavrachave_produto_relacao",
          "fk_id_produto",
          produto.id_produto
        )
        const categoriasRelacionadas2 = await Promise.all(
          tabelaRelacao.map((item) =>
            getDataById("palavrachave", item.fk_id_palavrachave)
          )
        )

        const categoriasFormatadasDefout = categoriasRelacionadas2.map(
          (categoria) => ({
            value: categoria.id_palavrachave.toString(), // Converte para string
            label: categoria.nome_palavra,
          })
        )

        const estoque = await getDataByForeignKey(
          "estoqueprodutos",
          "fk_id_produto",
          produto.id_produto
        )

        // Garantir que os valores estejam no formato correto
        setValue("nome", produto.nome || "")
        setValue("preco", produto.preco?.toFixed(2).toString() || "") // Converte para string
        setValue("descricao", produto.descricao || "")
        setValue("codigo", produto.codigo || "")
        setValue(
          "quantidade_estoque",
          estoque[0]?.quantidade_estoque?.toString() || "0" // Converte para string
        )
        setValue("quantidade", produto.quantidade?.toString() || "") // Converte para string
        setValue("unidade", produto.unidademedida
          ? { value: produto.unidademedida, label: produto.unidademedida }
          : null
        );
        setValue("unidade", { value: produto.unidademedida, label: produto.unidademedida } || "") // Certifique-se de que é string
        setValue("categoria", categoriasFormatadasDefout) // Certifique-se de que está no formato correto
        setValue("imagem_file_path", produto.imagem_file_path || "")

        const data = await getData("palavrachave")
        const categorias = data.map((item) => ({
          value: item.id_palavrachave.toString(), // Converte para string
          label: item.nome_palavra,
        }))

        setCategoriaProdutos(categorias)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      }
    }

    fetchData()
  }, [setValue, idProduto])



  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String); // Atualiza o estado localx     
        setValue("imagem_file_path", base64String); // Define o valor do campo no formulário
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = () => {
    document.getElementById('file-input').click()
  }

  const onSubmit = async (data) => {
    if (idProduto) {
      // const filePath = await uploadImage(data.imagem_file_path)
      // setFilePath(filePath)
      // await updateData('produtos', idProduto, {
      //   nome: data.nome,
      //   preco: data.preco,
      //   descricao: data.descricao,
      //   codigo: data.codigo,
      //   quantidade: data.quantidade,
      //   unidade: data.unidade.value,
      //   imagem_file_path: filePath
      // })
      // const idEstoqueProduto = await getDataByForeignKey('estoqueprodutos', 'fk_id_produto', idProduto)

      // await updateData('estoqueprodutos', idEstoqueProduto, {
      //   quantidade_estoque: data.quantidade_estoque
      // })  

      data.categoria.map(async (categoria) => {
        const result = await getDataByForeignKey('palavrachave_produto_relacao', 'fk_id_produto', idProduto);
        const categoriasRelacionadas = result.map((item) => {
          console.log(item.fk_id_palavrachave)
          console.log(categoria.value)
          if (item.fk_id_palavrachave === parseInt(categoria.value)) {
            return item
          }else{
            const newCategory = addRelation('palavrachave_produto_relacao', idProduto, categoria.value)
          }
        })
        console.log(categoriasRelacionadas)
        
      })
    } else {
      const newEndereco = await addData('enderecoclientes', {
        cep: data.cep,
        bairro: data.bairro,
        logradouro: data.logradouro,
        numero: data.numero,
        latitude: lat,
        longitude: lng,
        apelido: data.apelido,
        complemento: data.complemento,
      })
      await addRelation('endereco_cliente_relecao', idCliente, newEndereco.id_enderecocliente)
      setEnderecosCliente([...enderecosCliente, newEndereco])
    }
  };

  return (
    <div>
      <Sidebar />
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (

        <div className="container-CadastroProdutos">
          <div className="titulo">
            <h1>{idProduto !== null ? "Editar Produto" : "Novo Produto"}</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-formulario">
              <div className="container-vitrine">
                <div className="container-image" onClick={handleDivClick}>
                  <div className="imagemProduto">
                    {image ? (
                      <img src={image} alt="Imagem carregada" style={{ maxWidth: "100%" }} />
                    ) : (
                      <p>Clique para adicionar uma imagem</p>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("imagem_file_path")}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="file-input"
                  />
                </div>
                {errors.imagem_file_path && <span className="error-message">{errors.imagem_file_path.message}</span>}
                {/* Nome do Produto */}
                <p>Nome do Produto</p>
                <input
                  {...register("nome")}
                  type="text"
                  placeholder="Ex: Banana Prata"
                  className={errors.nome}
                />
                {errors.nome && <span className="error-message">{errors.nome.message}</span>}

                {/* descricao */}
                <p>Descrição</p>
                <input
                  {...register("descricao")}
                  type="text"
                  placeholder="Ex: 500g"
                />
                {errors.descricao && (
                  <span className="error-message">{errors.descricao.message}</span>
                )}

                {/* Preço */}
                <p>Preço de venda</p>
                <input
                  {...register("preco")}
                  type="text"
                  placeholder="Preço de Venda"
                  className={errors.preco}
                />
                {errors.preco && <span className="error-message">{errors.preco.message}</span>}
              </div>

              {/* descricao */}
              <div className="container-detalhes">
                {/* Código do Produto */}
                <p>Código do Produto</p>
                <input
                  {...register("codigo")}
                  type="text"
                  placeholder="Ex: 1234567890"
                />
                {errors.codigo && (
                  <span className="error-message">{errors.codigo.message}</span>
                )}

                {/* Categoria */}
                <p>Categoria</p>
                <Controller
                  control={control}
                  name="categoria"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={categoriaProdutos} // Todas as opções disponíveis
                      isMulti
                      placeholder="Busque por palavra-chave"
                      className={`select-category`}
                    />
                  )}
                />
                {errors.categoria && (
                  <span className="error-message">{errors.categoria.message}</span>
                )}


                {/* Quantidade */}
                <p>Quantidade em estoque</p>
                <input
                  {...register("quantidade_estoque")}
                  type="text"
                  placeholder="Quantidade em estoque"
                  className={errors.quantidade_estoque}
                />
                {errors.quantidade_estoque && (
                  <span className="error-message">{errors.quantidade_estoque.message}</span>
                )}

                {/* Unidade */}
                <p>Peso, volume ou unidade de medida</p>
                <div className="input-unidade-container">
                  <input
                    {...register("quantidade")}
                    type="text"
                    id="quantidade-input"
                    placeholder="Quantidade em estoque"
                    className={errors.quantidade}
                  />
                  {errors.quantidade && (
                    <span className="error-message">{errors.quantidade.message}</span>
                  )}
                  <Controller
                    control={control}
                    name="unidade"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={unidadeOptions} // Certifique-se de que unidadeOptions está no formato [{value, label}]
                        placeholder="Selecione a unidade"
                        className={`select-unidade ${errors.unidade}`}
                        styles={customStyles}
                      />
                    )}
                  />
                </div>
                {errors.unidade && (
                  <span className="error-message">{errors.unidade.message}</span>
                )}


                {/* Botões */}
                <div className="borda-botoes">
                  <div className="botoes">
                    <button type="submit" className="salvar">
                      Salvar Alterações
                    </button>
                    <button type="button" className="cancelar">
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )

}

export default MercadoCadastroProdutos
