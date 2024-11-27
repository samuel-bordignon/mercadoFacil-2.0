import React, { useState, useContext, useEffect } from 'react'
import Select from 'react-select'
import Sidebar from '../components/Sidebar'
import './MercadoCadastroProdutos.css'
import { GlobalContext } from '../contexts/GlobalContext'
import InputMask from 'react-input-mask'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

function MercadoCadastroProdutos() {
  // Esquema de validação usando Zod
  const validationSchemaProduto = z.object({
    nome: z.string().nonempty('Nome do produto é obrigatório'),
    descricao: z.string().optional(),
    preco: z.string().refine(
      (value) => /^\d+(\.\d{2})?$/.test(value), // Valida formato do preço
      'Preço deve estar no formato válido (ex: 10.00)'
    ),
    codigoProduto: z.string().length(13, 'Código do produto deve ter 13 dígitos'),
    categoria: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .min(1, 'Selecione ao menos uma categoria'),
    quantidade: z
      .string()
      .refine((value) => !isNaN(value) && Number(value) > 0, 'Quantidade deve ser um número maior que zero'),
    informacaoAdicional: z.object({
      peso: z.string().refine(
        (value) => !isNaN(value) && Number(value) > 0,
        'Peso deve ser um número válido'
      ),
      unidade: z.string().nonempty('Unidade é obrigatória'),
    }),
  })

  // React Hook Form com zodResolver
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchemaProduto),
    defaultValues: {
      nome: '',
      descricao: '',
      preco: '',
      codigoProduto: '',
      categoria: [],
      quantidade: '',
      informacaoAdicional: {
        peso: '',
        unidade: '',
      },
    },
  })

  const { categoryOptions, produtosdb, setProdutosdb, unidadeOptions, getLocalStorage} = useContext(GlobalContext)
  const [image, setImage] = useState(null)
  const [editIndex, setEditIndex] = useState(null)
  const produtoId = getLocalStorage('id_produto')

  const handleFileImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
        setValue('imagem', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleDivImageClick = () => {
    document.getElementById('file-input').click()
  }
  

  const handleCategoryChange = (selected) => {
    setValue('categoria', selected || [])
  }

  const handleUnidadeChange = (selected) => {
    setValue('informacaoAdicional.unidade', selected ? selected.value : '')
  }

  const onSubmit = (data) => {
    const newProduct = {
      ...data,
      id: editIndex !== null ? produtosdb[editIndex].id : produtosdb.length + 1,
    }

    if (editIndex !== null) {
      const updatedProdutos = [...produtosdb]
      updatedProdutos[editIndex] = newProduct
      setProdutosdb(updatedProdutos)
    } else {
      setProdutosdb([...produtosdb, newProduct])
    }

    handleCancelEdit()
  }

  const handleCancelEdit = () => {
    setEditIndex(null)
    reset()
    setImage(null)
  }

  useEffect(() => {
    // Verificar se estamos editando e se existe um produto correspondente
    if (produtoId) {
      const produto = produtosdb.find((produto) => produto.id === produtoId);
  
      if (produto) {
        // Preenche os campos do formulário
        setValue('nome', produto.nome || '');
        setValue('descricao', produto.descricao || '');
        setValue('preco', produto.preco || '');
        setValue('codigoProduto', produto.codigoProduto || '');
        setValue('categoria', produto.categoria || []);
        setValue('quantidade', produto.quantidade || '');
        setValue('informacaoAdicional.peso', produto.informacaoAdicional?.peso || '');
        setValue('informacaoAdicional.unidade', produto.informacaoAdicional?.unidade || '');
        setImage(produto.imagem || null);
      }
    }
  }, [produtoId, produtosdb, setValue]);
  


return (
  <div>
    <Sidebar />
    <div className="container-CadastroProdutos">
      <div className="titulo">
        <h1>{editIndex !== null ? 'Editar Produto' : 'Novo Produto'}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container-formulario">
          <div className="container-vitrine">
            <div className="container-image" onClick={handleDivImageClick}>
              <div className="imagemProduto">
                {image ? (
                  <img src={image} alt="Imagem carregada" style={{ maxWidth: '100%' }} />
                ) : (
                  <p>Clique para adicionar uma imagem</p>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileImageChange}
                style={{ display: 'none' }}
                id="file-input"
              />
            </div>
            <h2 className="titulo-vitrine">Vitrine</h2>
            <p>Nome do Produto</p>
            <input
              type="text"
              {...register('nome')}
              placeholder="Ex: Banana Prata"
              className={errors.nome ? 'error' : ''}
            />
            {errors.nome && <span className="error">{errors.nome.message}</span>}

            <p>Descrição</p>
            <input
              type="text"
              {...register('descricao')}
              placeholder="Ex: 500g"
            />

            <p>Preço de venda</p>
            <input
              type="text"
              {...register('preco')}
              placeholder="Preço de Venda"
              className={errors.preco ? 'error' : ''}
            />
            {errors.preco && <span className="error">{errors.preco.message}</span>}
          </div>

          <div className="container-detalhes">
            <h2>Detalhes</h2>
            <p>Código do Produto</p>
            <InputMask
              mask="9999999999999"
              type="text"
              {...register('codigoProduto')}
              placeholder="Ex: 1234567890123"
              className={errors.codigoProduto ? 'error' : ''}
            />
            {errors.codigoProduto && <span className="error">{errors.codigoProduto.message}</span>}

            <p>Categoria</p>
            <Select
              options={categoryOptions}
              isMulti
              placeholder="Buscar por palavra-chave"
              onChange={handleCategoryChange}
              value={watch('categoria')}
              className="select-category"
              styles={{
                menu: (provided) => ({
                  ...provided,
                  maxHeight: 160,
                  overflowY: 'auto',
                }),
              }}
            />
            {errors.categoria && <span className="error">{errors.categoria.message}</span>}

            <p>Estoque</p>
            <input
              type="text"
              {...register('quantidade')}
              placeholder="Quantidade em estoque"
              className={errors.quantidade ? 'error' : ''}
            />
            {errors.quantidade && <span className="error">{errors.quantidade.message}</span>}

            <p>Unidade de medida</p>
            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              <input
                type="text"
                {...register('informacaoAdicional.peso')}
                placeholder="Peso"
                className={errors.informacaoAdicional?.peso ? 'error' : ''}
              />

              <Select
                options={unidadeOptions}
                placeholder="Unidade"
                onChange={handleUnidadeChange}
                value={unidadeOptions.find((option) => option.value === watch('informacaoAdicional.unidade'))}
                className="select-unidade"
                styles={{ minWidth: '150px', width: 'auto' }}
              />
            </div>
            {errors.informacaoAdicional?.unidade && (
              <span className="error">{errors.informacaoAdicional.unidade.message}</span>
            )}

            <div className="borda-botoes">
              <div className="botoes">
                <button type="submit" className="salvar">Salvar Alterações</button>
                <button type="button" className="cancelar" onClick={handleCancelEdit}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
)
}

export default MercadoCadastroProdutos
