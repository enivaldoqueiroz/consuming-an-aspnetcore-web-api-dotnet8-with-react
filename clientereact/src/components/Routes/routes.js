import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';     // React Router v5 utilizas o Routes
//import { BrowserRouter, Route, Switch} from 'react-router-dom';   // React Router v5 utilizas o Switch

import Login from '../../pages/Login';
import Aluno from "../../pages/Alunos";
import NovoAluno from "../../pages/NovoAluno";

export default function RoutesPages(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" axect Component={Login}/>
                <Route path="/alunos" Component={Aluno}/>
                <Route path="/alunos/aluno/novo/:alunoId" Component={NovoAluno}/>
            </Routes>
        </BrowserRouter>
    );
}