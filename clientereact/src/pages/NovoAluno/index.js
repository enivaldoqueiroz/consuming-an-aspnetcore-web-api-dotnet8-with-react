import React from 'react';
import './styles.css';

import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiService from '../../services/apiService';

export default function NovoAluno() {

    // Estado para gerenciar os detalhes do aluno
    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState(0);

    // Hook de navegação para redirecionamento de páginas
    const history = useNavigate();
    
    // Extraindo o ID do aluno dos parâmetros da rota
    const { alunoId } = useParams();
    
    // Recuperando o token de autorização do armazenamento localStorage
    const token = localStorage.getItem('token');//Carrega o teken
    // Criando cabeçalhos com o token de autorização
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // useEffect para carregar os dados do aluno quando o componente é montado
    useEffect(()=>{
        // Se alunoId for '0', significa um novo aluno, então nenhum dado é carregado
        if(alunoId === '0')
            return;
        else
            loadAluno();
    }, alunoId)

    
    async function loadAluno(){
        try{
            // Buscar dados do aluno na API
            const response = await apiService.get(`api/alunos/${alunoId}`, authorization);
            
            // Atualizar o estado do componente com os dados da resposta da API
            setId(response.data.id);        //Atualiza o estado do Id
            setNome(response.data.nome);    //Atualiza o estado do Nome
            setEmail(response.data.email);  //Atualiza o estado do Email
            setIdade(response.data.idade);  //Atualiza o estado do Idade
        }catch(error){
            // Lidar com erro e redirecionar para a página de alunos
            alert('Erro ao recuperar o aluno' + error);
            history('/alunos');
        }
    }

    return (
    // Container principal para o formulário de novo aluno
    <div className='novo-aluno-container'>
        <div className='content'>
            {/* Seção do formulário com ícones e título */}
            <section className='form'>
                {/* Ícone de adição de usuário */}
                <FiUserPlus size={105} color='#17202a' />
                {/* Título dinâmico com base no alunoId */}
                <h1>{alunoId === '0' ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</h1>
                {/* Link para voltar à página de alunos */}
                <Link className='back-link' to='/alunos'>
                    {/* Ícone de seta para a esquerda */}
                    <FiCornerDownLeft size={25} color='#17202a' />
                    Retornar
                </Link>
            </section>
            
            {/* Formulário para entrada de detalhes do aluno */}
            <form>
                {/* Campo de entrada para o nome do aluno */}
                <input
                    placeholder='Nome'
                    value={nome} // Propriedade value controlada pelo estado 'nome'
                    onChange={e => setNome(e.target.value)}// Função de callback para atualizar 'nome' conforme o usuário digita
                />
                {/* Campo de entrada para o e-mail do aluno */}
                <input
                    placeholder='Email'
                    value={email}// Propriedade value controlada pelo estado 'email'
                    onChange={e => setEmail(e.target.value)}// Função de callback para atualizar 'email' conforme o usuário digita
                />
                {/* Campo de entrada para a idade do aluno */}
                <input
                    placeholder='Idade'
                    value={idade}// Propriedade value controlada pelo estado 'idade'
                    onChange={e => setIdade(e.target.value)}// Função de callback para atualizar 'idade' conforme o usuário digita
                />
                {/* Botão para enviar o formulário (Incluir ou Atualizar) */}
                <button className='button' type='submit'>
                    {alunoId === '0' ? 'Incluir' : 'Atualizar'}
                </button>
            </form>
        </div>
    </div>
);
}