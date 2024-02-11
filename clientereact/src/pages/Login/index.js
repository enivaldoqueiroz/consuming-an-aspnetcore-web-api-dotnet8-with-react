import React, {useState} from 'react';//useState vai armazenar as credencias do usuario
import './styles.css';
import logoImage from '../../assets/login-management.png'
import apiService from '../../services/apiService.js';
import {useNavigate} from 'react-router-dom';//useHistory vai armazenarno hoistorixa de navegação do usuario

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useNavigate();

    //Função para fazer Login
    async function login(event){
        event.preventDefault();//Evita o refresh na pagina de login ao clicar no botão 'Login'
    
        const data = {
            email,
            password
        };

        try {
            const response = await apiService.post('/api/Account/LoginUser', data);
        
            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('authenticatedauthenticated', response.data.authenticatedauthenticated);
            localStorage.setItem('expirationexpiration', response.data.expirationexpiration);
            localStorage.setItem('messagemessage', response.data.messagemessage);

            history('/alunos');//Direiciona para tela de alunos
        } catch(error) {
            alert('O login falhou ' + error);
        }
    }

    return(
    <div className='login-container'>
        <section className='form'>
        <img src={logoImage} alt='login' id='img-login-management'></img>

        <form onSubmit={login}>
        <h1>Cadastro de Alunos</h1>
            <input placeholder='Email'
                value={email}
                onChange={e=>setEmail(e.target.value)}
            />
            <input type='password' placeholder='Password'
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />
            <button className='button' type='submit'>Login</button>
        </form>
        </section>
    </div>
    );
}