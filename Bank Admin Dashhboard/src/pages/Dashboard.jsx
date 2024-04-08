import React, { useState } from 'react'

const Dashboard = () => {
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try{
      setIsLoading(true)
      const response = await fetch('http://127.0.0.1:5000/processed_data')
      const result = await response.json()
      console.log(result)
      setMsg(result.status)
      setIsLoading(false)
    }catch(e){
      console.log(e)
      setIsLoading(false)
    }
  }

  return (
    <div className='container my-5'>
        <h2 className='text-3xl backdrop-blur-sm text-slate-600 font-bold'>Admin Dashboard</h2>
        <button onClick={handleClick} className='btn btn-primary my-4'>{isLoading ? 'Shipping...' : 'SHIP DATA'}</button>
        <h3>{msg}</h3>
    </div>
  )
}

export default Dashboard