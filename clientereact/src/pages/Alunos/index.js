import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom'

import {FiEdit, FiUserX, FiXCircle} from 'react-icons/fi';

import logoCadastro from '../../assets/icon-cadastro.png'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService.js';

export default function Aluno(){

    const[nome, setNome] = useState('');
    const[alunos, setAlunos] = useState([]); 

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const history = useNavigate();

    const authorization = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  
    useEffect(() => {
      apiService.get('api/alunos', authorization)
        .then(response => {
          setAlunos(response.data);
        })
        .catch(error => {
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
            <input type='text' placeholder='Nome' />
            <button type='button' className='button'>
                Filtrar aluno por nome (parcial)
            </button>
            </form>
            <h1>Relação de Alunos</h1>
            <ul>
                {alunos.map(aluno=>(
                    <li key={aluno.id}>
                        <b>Nome: </b>{aluno.nome}<br/><br/>
                        <b>Emial: </b>{aluno.email}<br/><br/>
                        <b>Idade: </b>{aluno.idade}<br/><br/>

                        <button onClick={()=> editAluno(aluno.id)} type='button'>
                            <FiEdit size={25} color='#17202a'></FiEdit>
                        </button>

                        <button type='button'>
                            <FiUserX size={25} color='#17202a'></FiUserX>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}