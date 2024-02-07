import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/cadastro.png';

function App() {

  const baseUrl = "https://localhost:44349/api/Alunos";

  const [data, setData]=useState([]);
  const [modalIncluir, setModalIncluir]=useState(false);

  const [alunoSelecionado, setAlunoSelecionado]=useState({
    id: '',
    nome: '',
    email:'',
    idade: ''
  })

  const abrirFecharModalIncluir=()=>{
    setModalIncluir(!modalIncluir);
  }

  const handleChange = e=>{
    const {name,value} = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,[name]:value
    });
    console.log(alunoSelecionado);
  }

   //Metodo para trazer uma resquest para API Usando AXIOS
   const pedidoGet = async()=>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

    //Metodo para trazer uma post para API Usando AXIOS
    const pedidoPost = async()=>{
      delete alunoSelecionado.id;
      alunoSelecionado.idade=parseInt(alunoSelecionado.idade);
      await axios.post(baseUrl, alunoSelecionado)
      .then(response => {
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
      }).catch(error => {
        console.log(error);
      })
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
