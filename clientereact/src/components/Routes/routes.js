import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';     // React Router v5 utilizas o Routes
//import { BrowserRouter, Route, Switch} from 'react-router-dom';   // React Router v5 utilizas o Switch
import logoCadastro from '../../assets/icon-cadastro.png';
import Login from '../../pages/Login';
import Aluno from "../../pages/Alunos";

export default function RoutesPages(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" axect Component={Login}/>
                <Route path="/alunos" Component={Aluno}/>
            </Routes>
        </BrowserRouter>
    );
}