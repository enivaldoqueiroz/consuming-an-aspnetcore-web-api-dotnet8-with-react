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

      // Atualiza 'updateData' para evitar chamadas excessivas do useEffect
      setUpdateData(true);
      
      // Fecha o modal de inclusão após a conclusão bem-sucedida do POST
      abrirFecharModalIncluir();
    } catch (error) {
      // Em caso de erro, imprime o erro no console
      console.log(error);
    }
  }

  const [modalEditar, setModalEditar]=useState(false);

  const abrirFecharModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const selecionarAluno=(aluno, opcao)=>{
    setAlunoSelecionado(aluno);
      (opcao==="Editar") ? abrirFecharModalEditar() : abrirFecharModalExcluir();
  }

// Estado 'updateData' e função 'setUpdateData' usando o hook useState.
const [updateData, setUpdateData] = useState(true);

// Método assíncrono para realizar uma requisição PUT à API usando Axios
const pedidoPut = async () => {
  // Converte a propriedade 'idade' do objeto 'alunoSelecionado' para um valor inteiro
  alunoSelecionado.idade = parseInt(alunoSelecionado.idade);

  try {
    // Aguarda a conclusão da requisição PUT para a URL específica, com o ID do aluno
    const response = await axios.put(baseUrl + "/" + alunoSelecionado.id, alunoSelecionado);

    // Extrai os dados da resposta da API
    var resposta = response.data;

    // Cria uma cópia dos dados existentes para realizar as atualizações
    var dadosAuxiliar = data;

    // Percorre os alunos existentes e atualiza os dados do aluno correspondente
    dadosAuxiliar.map(aluno => {
      if (aluno.id === alunoSelecionado.id) {
        aluno.nome = resposta.nome;
        aluno.email = resposta.email;
        aluno.idade = resposta.idade;
      }
    });

    // Atualiza o estado 'updateData' para acionar o useEffect
    setUpdateData(true);

    // Atualiza 'updateData' para evitar chamadas excessivas do useEffect
    setUpdateData(true);

    // Fecha o modal de edição após o PUT bem-sucedido
    abrirFecharModalEditar();
  } catch (error) {
    // Em caso de erro, imprime o erro no console
    console.log(error);
  }
}

// Estado 'modalExcluir' e função 'setModalExcluir' usando o hook useState.
const [modalExcluir, setModalExcluir] = useState(false);

// Função para abrir ou fechar o modal de exclusão, alternando entre 'true' e 'false'.
const abrirFecharModalExcluir = () => {
  setModalExcluir(!modalExcluir);
}

// Função assíncrona para realizar uma requisição DELETE à API usando Axios
const pedidoDelete = async () => {
  try {
    // Realiza uma requisição DELETE para a URL específica, com o ID do aluno
    await axios.delete(baseUrl + "/" + alunoSelecionado.id);

    // Filtra os dados para remover o aluno excluído com base no ID
    setData(data.filter(aluno => aluno.id !== alunoSelecionado.id));

    // Atualiza 'updateData' para evitar chamadas excessivas do useEffect
    setUpdateData(true);

    // Fecha o modal de exclusão após o DELETE bem-sucedido
    abrirFecharModalExcluir();
  } catch (error) {
    // Em caso de erro, imprime o erro no console
    console.log(error);
  }
}

// Hook useEffect para realizar ações quando 'updateData' é alterado
useEffect(() => {
  // Verifica se 'updateData' foi alterado
  if (updateData) {
    // Realiza um pedido GET para atualizar os dados da API
    pedidoGet();
    
    // Atualiza 'updateData' para evitar chamadas excessivas do useEffect
    setUpdateData(false);
  }
}, [updateData]);


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
                <button className='btn btn-primary' onClick={()=>selecionarAluno(aluno, "Editar")}>Editar</button>{" "}
                <button className='btn btn-danger' onClick={()=>selecionarAluno(aluno, "Excluir")}>Excluir</button>
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

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Alunos</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Id: </label><br/>
            <input type='text' className='form-control' readOnly value={alunoSelecionado && alunoSelecionado.id}></input>
            <br />
            <label>Nome: </label>
            <br />
            <input type='text' className='form-control' name='nome' onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.nome}/>{/* Exibi o valor atual no input caso exista */}
            <br />
            <label>Email: </label>
            <br />
            <input type='text' className='form-control' name='email' onChange={handleChange} 
              value={alunoSelecionado && alunoSelecionado.email}/>{/* Exibi o valor atual no input caso exista */}
            <br />
            <label>Idade: </label>
            <br />
            <input type='text' className='form-control' name='idade' onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.idade}/>{/* Exibi o valor atual no input caso exista */}
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>pedidoPut()}>Editar</button>{"   "}
          <button className='btn btn-danger' onClick={()=>abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão deste(a) aluno(a) : {alunoSelecionado && alunoSelecionado.nome}
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={()=>pedidoDelete()}> Sim </button>{"   "}
          <button className='btn btn-secondary' onClick={()=>abrirFecharModalExcluir()}> Não </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
