import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FornecedorList from './pages/Fornecedor/FornecedorList'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<FornecedorList/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App