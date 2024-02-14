import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom'

import {FiEdit, FiUserX, FiXCircle} from 'react-icons/fi';

import logoCadastro from '../../assets/icon-cadastro.png'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService.js';

export default function Aluno(){

    //Filtrar dados
    const[searchInput, setSearchInput] = useState('');
    const[filtro, setFiltro] = useState([]);

    const[alunos, setAlunos] = useState([]); 

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const history = useNavigate();

    const authorization = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const searchAlunos = (searchValue) => {
        // Atualiza o estado 'searchInput' com o valor de busca
        setSearchInput(searchValue);
    
        // Verifica se há um valor de busca não vazio
        if (searchInput !== '') {
            // Filtra os alunos com base no valor de busca, considerando correspondência em qualquer campo
            const dadosFiltrados = alunos.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            });
    
            // Atualiza o estado 'filtro' com os dados filtrados
            setFiltro(dadosFiltrados);
        } else {
            // Se o valor de busca for vazio, mostra todos os alunos (sem filtro)
            setFiltro(alunos);
        }
    }
  
    useEffect(() => {
      apiService.get('api/alunos', authorization)
        .then(response => {
          setAlunos(response.data);
        })
        .catch(error => {
            history('/');
            console.error('Erro ao carregar os alunos:', error);
        });
    }, []); // Passando um array vazio para executar apenas uma vez

    //Função para sair da aplicação e limpar o localStorage
    async function logout(){
        try {
            localStorage.clear();
            localStorage.setItem('token','');
            authorization.headers = '';
            history('/');
        } catch (error) {
            alert('Não foi possível fazer o logout' + error);
        }
    }

    async function editAluno(id){
        try {
            history(`aluno/novo/${id}`);//Usar as aspas simples invertidadas
        } catch (error) {
            alert('Não foi possivel editar o aluno');
        }
    }

    async function deleteAluno(id){
        try {
            if (window.confirm('Deseja deletar o aluno de Id = ' + id + '?')){
                await apiService.delete(`api/alunos/${id}`, authorization);
                setAlunos(alunos.filter(aluno => aluno.id !== id));
                alert(`Aluno com id ${id} foi deletado com sucesso`);
            }
        } catch(error){
            alert('Não foi possível excluir o aluno');
        }
    }

    return (
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt="Cadastro"></img>
                <span>Bem-Vindo, <strong>{email}</strong>!</span>
                <Link className='button' to='aluno/novo/0'>Novo Aluno</Link>{/* Por padrão o Id do aluno será 0 */}
                <button onClick={logout} type='button'> 
                    <FiXCircle size={35} color='#17202a' />
                </button>
            </header>
            <form>
            <form>
                <input onChange={(e) => searchAlunos(e.target.value)} type='text' placeholder='filtrar por nome'></input>
                {/*<button type='button' className='button'>Filtrar aluno por nome (parcial)</button>*/}
            </form>
            </form>
            <h1>Relação de Alunos</h1>
            {searchInput.length > 1 ? (
                <ul>
                    {filtro.map(aluno => (
                        <li key={aluno.id}>
                            <b>Nome:</b> {aluno.nome}<br /><br />
                            <b>Email:</b> {aluno.email}<br /><br />
                            <b>Idade:</b> {aluno.idade}<br /><br />

                            <button onClick={() => editAluno(aluno.id)} type='button'><FiEdit size={25} color='#17202a' /></button>
                            <button onClick={() => deleteAluno(aluno.id)} type='button'><FiUserX size={25} color='#17202a' /></button>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul>
                    {alunos.map(aluno => (
                        <li key={aluno.id}>
                            <b>Nome:</b> {aluno.nome}<br /><br />
                            <b>Email:</b> {aluno.email}<br /><br />
                            <b>Idade:</b> {aluno.idade}<br /><br />

                            <button onClick={() => editAluno(aluno.id)} type='button'><FiEdit size={25} color='#17202a' /></button>
                            <button onClick={() => deleteAluno(aluno.id)} type='button'><FiUserX size={25} color='#17202a' /></button>
                        </li>
                    ))}
                </ul>
            )} 
        </div>
    );
}