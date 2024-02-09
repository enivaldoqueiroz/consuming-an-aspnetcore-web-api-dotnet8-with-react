import React from 'react';
import {Link} from 'react-router-dom'
import './styles.css';

import {FiEdit, FiUserX, FiXCircle} from 'react-icons/fi';

import logoCadastro from '../../assets/icon-cadastro.png'

export default function Aluno(){
    return (
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt="Cadastro"></img>
                <span>Bem-Vindo, <strong>Enivaldo</strong>!</span>
                <Link className='button' to='aluno/novo'>Novo Aluno</Link>
                <button type='button'>
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
                <li>
                    <b>Nome: </b>Enivaldo Queiroz<br/><br/>
                    <b>Emial: </b>enivaldoqueiroz@gmail.com<br/><br/>
                    <b>Idade: </b>22<br/><br/>
                    <button type='button'>
                        <FiEdit size={25} color='#17202a'></FiEdit>
                    </button>
                    <button type='button'>
                        <FiUserX size={25} color='#17202a'></FiUserX>
                    </button>
                </li>
                <li>
                    <b>Nome: </b>Enivaldo Queiroz<br/><br/>
                    <b>Emial: </b>enivaldoqueiroz@gmail.com<br/><br/>
                    <b>Idade: </b>22<br/><br/>
                    <button type='button'>
                        <FiEdit size={25} color='#17202a'></FiEdit>
                    </button>
                    <button type='button'>
                        <FiUserX size={25} color='#17202a'></FiUserX>
                    </button>
                </li>
            </ul>
        </div>
    );
}