import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/cadastro.png';

function App() {

  const baseUrl = "https://localhost:44349/api/Alunos";

  const [data, setData]=useState([]);

  const [alunoSelecionado, setAlunoSelecionado]=useState({
    id: '',
    nome: '',
    email:'',
    idade: ''
  })

  const handleChange = e=>{
    const {name,value} = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,[name]:value
    });
    console.log(alunoSelecionado);
  }

  // Estado 'modalIncluir' e função 'setModalIncluir' utilizando o hook useState.
  const [modalIncluir, setModalIncluir] = useState(false);

  // Função para abrir ou fechar o modal, alternando entre os estados 'true' e 'false'.
  const abrirFecharModalIncluir = () => {
    // A função 'setModalIncluir' é utilizada para modificar o estado 'modalIncluir'.
    // O operador de negação '!' é usado para alternar entre 'true' e 'false'.
    setModalIncluir(!modalIncluir);
  }

  // Método assíncrono para realizar uma requisição GET à API usando Axios
  const pedidoGet = async () => {
    try {
      // Aguarda a conclusão da requisição GET para a URL especificada (baseUrl)
      const response = await axios.get(baseUrl);

      // Atualiza o estado 'data' com os dados recebidos da resposta da API
      setData(response.data);
    } catch (error) {
      // Em caso de erro, imprime o erro no console
      console.log(error);
    }
  }

  // Método assíncrono para realizar uma requisição POST à API usando Axios
  const pedidoPost = async () => {
    // Remove a propriedade 'id' do objeto 'alunoSelecionado' antes de fazer o POST
    delete alunoSelecionado.id;

    // Converte a propriedade 'idade' do objeto 'alunoSelecionado' para um valor inteiro
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);

    try {
      // Aguarda a conclusão da requisição POST para a URL especificada (baseUrl)
      const response = await axios.post(baseUrl, alunoSelecionado);

      // Atualiza o estado 'data' com os dados recebidos da resposta da API concatenados aos dados existentes
      setData(data.concat(response.data));

      // Fecha o modal de inclusão após a conclusão bem-sucedida do POST
      abrirFecharModalIncluir();
    } catch (error) {
      // Em caso de erro, imprime o erro no console
      console.log(error);
    }
  }

  useEffect(()=>{
    pedidoGet();
  })

  /*// Supondo que jsonData seja o seu objeto JSON
  const jsonData = [
    {
      id: 1,
      nome: 'João',
      email: 'joao@example.com',
      idade: 25
    },
    {
      id: 2,
      nome: 'Maria',
      email: 'maria@example.com',
      idade: 30
    },
    // ... outros objetos
  ];*/

  return (
    <div className="aluno-container">
      <br/>
      <h3>Cadastro de Alunos</h3>
      <header>
        <img src={logoCadastro} alt='Cadastro'></img>
        <button onClick={()=>abrirFecharModalIncluir()} className='btn btn-success'>Incluir Novo Aluno</button>
        <h1>React Teste</h1>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operações</th>
          </tr>
        </thead>
        <tbody>
          {/*Outra forme de mapear o JSON
          
          Object.keys(data).map(key => (
          <tr key={data[key].id}>
            <td>{data[key].id}</td>
            <td>{data[key].nome}</td>
            <td>{data[key].email}</td>
            <td>{data[key].idade}</td>
            <td>
              <button className='btn btn-primary'>Editar</button>{" "}
              <button className='btn btn-danger'>Excluir</button>
            </td>
          </tr>
          ))*/}
          {data.map(aluno=>(
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button className='btn btn-primary'>Editar</button>{" "}
                <button className='btn btn-danger'>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Alunos</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nome: </label>
            <br />
            <input type='text' className='form-control' name='nome' onChange={handleChange}/>
            <br />
            <label>Email: </label>
            <br />
            <input type='text' className='form-control' name='email'
            onChange={handleChange}/>
            <br />
            <label>Idade: </label>
            <br />
            <input type='text' className='form-control' name='idade'
            onChange={handleChange}/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>pedidoPost()}>Incluir</button>{"   "}
          <button className='btn btn-danger' onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
