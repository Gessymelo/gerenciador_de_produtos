import React, { useEffect , useState } from 'react'
import axios from '../../api'
import { Link } from 'react-router-dom'
import {FaEdit, FaPlus, FaTrash, FaExclamationTriangle,FaCheckCircle} from 'react-icons/fa'

const FornecedorList = () => {

    // Declara uma variável de estado chamada "fornecedores" e uma função "setFornecedores" para atualizá-la.
    // Inicialmente, "fornecedores" é um array vazio.
    const [fornecedores, setFornecedores] = useState([])

    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null)

    const [modalAberto, setModalAberto] = useState(false)

    // useEffect é usado para executar código quando o componente é montado na tela.
    // Aqui, estamos buscando os dados dos fornecedores.
    useEffect (() => {
        // Função para buscar os fornecedores da API
        const buscarFornecedores = () => {
            // Faz uma requisição HTTP GET para a URL "/fornecedores" usando axios.
            axios.get('/fornecedores')
                // Quando a requisição é bem-sucedida, atualiza o estado "fornecedores" com os dados recebidos.
            .then(response => {
                setFornecedores(response.data)
            })
            .catch(error => {
                // Se ocorrer um erro durante a requisição, exibe uma mensagem de erro no console.
                console.error("Ocorreu um erro", error)
            })
        }
        // Chama a função para buscar os fornecedores quando o componente é montado.
        buscarFornecedores()
    }, []) // O array vazio [] garante que o useEffect seja executado apenas uma vez, após a montagem do componente.


    const abrirModal = (fornecedor) =>{
        setFornecedorSelecionado(fornecedor)
        setModalAberto(true)
    }

    const fecharModal = () => {
        setModalAberto(false)
        setFornecedorSelecionado(null)
    }

  return (
    <div className="container mt-5">
        <h2 className="mb-4"> Lista de Fornecedores</h2>
        <Link to="/add-fornecedores" className="btn btn-primary mb-2">
            <FaPlus className="icon" /> Adicionar Fornecedor
        </Link>

        <table className="table">
            <thead>
                <tr>
                    <th>Nome:</th>
                    <th>CNPJ:</th>
                    <th>Email:</th>
                    <th>Ações:</th>
                </tr>
            </thead>
            <tbody>
                {
                    fornecedores.map(fornecedor => (
                        <tr key={fornecedor.id}>
                            <td>{fornecedor.nome}</td>
                            <td>{fornecedor.cnpj}</td>
                            <td>{fornecedor.email}</td>
                            <td>
                                <Link to={`/edit-fornecedores/${fornecedor.id}`}
                                 className="btn-sm btn-warning">
                                    <FaEdit className="icon icon-btn"/> Editar                                
                                </Link>
                                <button onClick={() => abrirModal(fornecedor)} className='btn btn-sm btn-danger'>
                                    <FaTrash className="icon icon-btn"/> Excluir

                                </button>
                            </td>

                        </tr>
                    ))
                }
            </tbody>

        </table>


    </div>
  )
}

export default FornecedorList