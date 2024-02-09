import React from 'react';
import './styles.css';

import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom';

export default function NovoAluno() {
    return (
        <div className='novo-aluno-container'>
            <div className='content'>
                <section className='form'>
                    <FiUserPlus size={105} color='#17202a' />
                    <h1>Text</h1>
                    <Link className='back-link' to='/alunos'>
                        <FiCornerDownLeft size={25} color='#17202a' />
                        Retornar
                    </Link>
                </section>
                <form>
                    <input placeholder='Nome'></input>
                    <input placeholder='Email'></input>
                    <input placeholder='Idade'></input>
                    <button className='button' type='submit'>Texto</button>
                </form>
            </div>
        </div>
    );
}