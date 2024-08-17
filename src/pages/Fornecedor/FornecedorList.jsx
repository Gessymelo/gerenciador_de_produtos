import React, { useEffect , useState } from 'react'
import axios from '../../api'
import { Link } from 'react-router-dom'
import {FaEdit, FaPlus, FaTrash, FaExclamationTriangle,FaCheckCircle, FaQuestionCircle} from 'react-icons/fa'
import Modal from 'react-modal'

const FornecedorList = () => {

    // Declara uma variável de estado chamada "fornecedores" e uma função "setFornecedores" para atualizá-la.
    // Inicialmente, "fornecedores" é um array vazio.
    const [fornecedores, setFornecedores] = useState([]);

    // Estado para armazenar o fornecedor atualmente selecionado.
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);

    // Estado para controlar a visibilidade do modal de confirmação de exclusão.
    const [modalAberto, setModalAberto] = useState(false);

    // Estado para controlar a visibilidade do modal de sucesso após exclusão.
    const [modalSucessoAberto, setModalSucessoAberto] = useState(false);

    const [tooltipAberto, setTooltipAberto] = useState(false)

    // useEffect é usado para executar código quando o componente é montado na tela.
    // Aqui, estamos buscando os dados dos fornecedores.
    useEffect(() => {
        // Função para buscar os fornecedores da API
        const buscarFornecedores = () => {
            // Faz uma requisição HTTP GET para a URL "/fornecedores" usando axios.
            axios.get('/fornecedores')
                // Quando a requisição é bem-sucedida, atualiza o estado "fornecedores" com os dados recebidos.
                .then(response => {
                    setFornecedores(response.data);
                })
                .catch(error => {
                    // Se ocorrer um erro durante a requisição, exibe uma mensagem de erro no console.
                    console.error("Ocorreu um erro", error);
                });
        };
        // Chama a função para buscar os fornecedores quando o componente é montado.
        buscarFornecedores();
    }, []); // O array vazio [] garante que o useEffect seja executado apenas uma vez, após a montagem do componente.

    // Função para abrir o modal de confirmação de exclusão.
    const abrirModal = (fornecedor) => {
        setFornecedorSelecionado(fornecedor); // Define o fornecedor selecionado.
        setModalAberto(true); // Abre o modal.
    };

    // Função para fechar o modal de confirmação de exclusão.
    const fecharModal = () => {
        setModalAberto(false); // Fecha o modal.
        setFornecedorSelecionado(null); // Reseta o fornecedor selecionado.
    };

    // Função para abrir o modal de sucesso.
    const abrirModalSucesso = () => {
        setModalSucessoAberto(true); // Abre o modal de sucesso.
        setTimeout(() => setModalSucessoAberto(false), 2000); // Fecha automaticamente após 2 segundos.
    };

    // Função para remover o fornecedor selecionado.
    const removerFornecedor = () => {
        axios.delete(`/fornecedores/${fornecedorSelecionado.id}`) // Faz a requisição DELETE para remover o fornecedor.
            .then(() => {
                // Atualiza o estado "fornecedores" removendo o fornecedor excluído.
                setFornecedores(prevFornecedores => prevFornecedores.filter(fornecedor => fornecedor.id !== fornecedorSelecionado.id));
                fecharModal(); // Fecha o modal de confirmação.
                abrirModalSucesso(); // Abre o modal de sucesso.
            });
    };

    const toggleTooltip = () => {
        setTooltipAberto(!tooltipAberto)
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4" style={{ position:'relative' }}>
                Lista de Fornecedores {' '}
                 <FaQuestionCircle
                  className="tooltip-icon"
                 onClick={toggleTooltip}
                 />
                 {tooltipAberto && (
                    <div className='tooltip'>
                       Aqui você pode ver, editar ou excluir 
                       fornecedores cadrastados no sistema. 
                     </div>
                 )}
                 
                  </h2>

                

            {/* Link para adicionar um novo fornecedor */}
            <Link to="/add-fornecedores" className="btn btn-primary mb-2">
                <FaPlus className="icon" /> Adicionar Fornecedor
            </Link>

            {/* Tabela de fornecedores */}
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
                    {/* Mapeia os fornecedores para criar linhas na tabela */}
                    {fornecedores.map(fornecedor => (
                        <tr key={fornecedor.id}>
                            <td>{fornecedor.nome}</td>
                            <td>{fornecedor.cnpj}</td>
                            <td>{fornecedor.email}</td>
                            <td>
                                {/* Link para editar o fornecedor */}
                                <Link to={`/edit-fornecedores/${fornecedor.id}`} className="btn-sm btn-warning">
                                    <FaEdit className="icon icon-btn" /> Editar
                                </Link>
                                {/* Botão para abrir o modal de exclusão */}
                                <button onClick={() => abrirModal(fornecedor)} className='btn btn-sm btn-danger'>
                                    <FaTrash className="icon icon-btn" /> Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de confirmação de exclusão */}
            <Modal
                isOpen={modalAberto}
                onRequestClose={fecharModal}
                className="modal"
                overlayClassName="overlay"
            >
                <div className='modalContent'>
                    <FaExclamationTriangle className="icon" />
                    <h2>Confirmar Exclusão</h2>
                    <p>Tem certeza que deseja excluir o fornecedor {fornecedorSelecionado && fornecedorSelecionado.nome}?</p>
                    <div className="modalButtons">
                        <button onClick={fecharModal} className="btn btn-secondary">Cancelar</button>
                        <button onClick={removerFornecedor} className="btn btn-danger">Excluir</button>
                    </div>
                </div>
            </Modal>

            {/* Modal de sucesso após exclusão */}
            <Modal
                isOpen={modalSucessoAberto}
                onRequestClose={() => setModalSucessoAberto(false)}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modalContent">
                    <FaCheckCircle className="icon successIcon" />
                    <h2>Fornecedor excluído com sucesso!</h2>
                </div>
            </Modal>
        </div>
    );
};

export default FornecedorList