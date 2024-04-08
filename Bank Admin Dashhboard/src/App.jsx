import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Transaction from './pages/Transaction'

const App = () => {
  return (
    <div className=''>
      <Navbar />
      <Routes>
        {/* <Route path='/'/> */}
        <Route path='/admin' element={<Dashboard />}/>
        <Route path='/payment' element={<Transaction />}/>

      </Routes>
    </div>
  )
}

export default App