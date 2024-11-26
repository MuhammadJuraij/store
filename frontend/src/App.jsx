import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Componenets/Home'
import AddOrder from './Componenets/AddOrder'
import ViewOrder from './Componenets/ViewOrder'
import FileUpload from './Componenets/FileUpload'

const App = () => {
  return (
    <div>
      <Routes>
          <Route path='/' element={<FileUpload/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/addorder' element={<AddOrder/>}/>
          <Route path='/vieworder' element={<ViewOrder/>}/>

      </Routes>
    </div>
  )
}

export default App