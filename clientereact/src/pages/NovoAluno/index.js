import React from 'react';
import './styles.css';

import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiService from '../../services/apiService';

export default function NovoAluno() {

    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState(null);

    
    const history = useNavigate();
    
    var { alunoId } = useParams();
    
    const token = localStorage.getItem('token');
    //Inserindo o token no headers
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(()=>{
        if(alunoId === '0')
            return;
        else
            loadAluno();
    }, alunoId)

    async function loadAluno(){
        try{
            const response = await apiService.get(`api/alunos/${alunoId}`, authorization);
            
            setId(response.data.id);
            setId(response.data.nome);
            setId(response.data.email);
            setId(response.data.idade);
        }catch(error){
            alert('Erro ao recuperar o aluno' + error);
            history('/alunos');
        }
    }

    return (
        <div className='novo-aluno-container'>
            <div className='content'>
                <section className='form'>
                    <FiUserPlus size={105} color='#17202a' />
                    <h1>{alunoId === '0' ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</h1>
                    <Link className='back-link' to='/alunos'>
                        <FiCornerDownLeft size={25} color='#17202a' />
                        Retornar
                    </Link>
                </section>
                <form>
                    <input placeholder='Nome'
                        value={nome} //Exibir os dados
                        onChange={e=> setNome(e.target.value)} //Recebe o input do usuario
                    />
                    <input placeholder='Email' 
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                    />
                    <input placeholder='Idade' 
                        value={idade}
                        onChange={e=> setIdade(e.target.value)}
                    />
                    <button className='button' type='submit'>
                        {alunoId === '0' ? 'Incluir' : 'Atualizar'}
                    </button>
                </form>
            </div>
        </div>
    );
}