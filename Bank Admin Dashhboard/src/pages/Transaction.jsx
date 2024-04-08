import { useState } from "react"
// import {Twilio} from "twilio"

const Transaction = () => {
  const [time, settime] = useState('1')
  const [transactionid, settransactionid] = useState('')
  const [type, settype] = useState('transfer')
  const [amount, setamount] = useState('42136.28')
  const [nameorig, setnameorig] = useState('C866529530')
  const [oldbalanceorg, setoldbalanceorg] = useState('5334735.48')
  const [newbalanceorg, setnewbalanceorg] = useState('5292599.2')
  const [namedest, setnamedest] = useState('C837659261')
  const [oldbalancedest, setoldbalancedest] = useState('46303.0')
  const [newbalancedest, setnewbalancedest] = useState('57472.15')
  const [mobile, setmobile] = useState('+919860245752')
  const [isLoading, setIsLoading] = useState(false);
  const [location, setlocation] = useState('India')

  // const [oldbalance, setoldbalance] = useState('')
  // const [newbalance, setnewbalance] = useState('')
  // const [origchange, setorigchange] = useState('')
  // const [errordest, seterrordest] = useState('');
  // const [out, setout] = useState('')
  // const [transfer, settransfer] = useState('')

  const handleClick = async (e) => {
    function generateTransactionId() {
      const prefix = "TI";
      const randomDigits = Math.floor(Math.random() * 10000000000); // Generate random 10-digit number
      
      // Ensure the random number is padded to 10 digits
      const formattedRandomDigits = String(randomDigits).padStart(10, '0');
      
      // Concatenate prefix with the random number
      const transactionId = prefix + formattedRandomDigits;
      
      return transactionId;
  }
  
  // Example usage:
    const transactionId = generateTransactionId();
    settransactionid(transactionId) // Output a random transaction ID like "TI3249730644"
  
    e.preventDefault()
    // console.log(data)
    // console.log(typeof data)
    // console.log(mobile)
    // const data1 = data.split(',')
    // console.log(data1)

    const balance_change_orig = Math.abs(Number(newbalanceorg) - Number(oldbalanceorg));
    const balance_change_dest = Math.abs(Number(newbalancedest) - Number(oldbalancedest));
    const errorBalanceDest = Math.abs(Number(oldbalancedest) + Number(amount) - Number(newbalancedest));
    const cashout = type.trim().toLowerCase()
    const transfer = type.trim().toLowerCase()
    const custocus = nameorig[0]===namedest[0]
    const obj = {
      "step":Number(time),
      "amount":Number(amount),
      "oldbalanceOrg":Number(oldbalanceorg),
      "newbalanceDest": Number(newbalancedest),
      "balance_change_orig": Number(balance_change_orig),
      "balance_change_dest":Number(balance_change_dest),
      "errorBalanceDest": Number(errorBalanceDest),
      "type_CASH_OUT": cashout==='cashout' ? true : false,
      "type_TRANSFER" : transfer==='transfer' ? true : false,
      "transactionBetween_Customer2Customer":Boolean(custocus)
     }
     console.log(obj)
     try{
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      })
      const result = await response.json()
      const status = result.predictions[0];
      if(status === -1){
        const response = await fetch('http://localhost:8000/sendsms', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({phone: mobile})
      })
      const result = await response.json()
      console.log(result);
      }
      setIsLoading(false);
     }
     catch(e){
      console.log(e)
      setIsLoading(false);
     }
  }

  {
    // 
   
   }

  return (
    <div className='flex justify-center items-center'>
        

        {/* <form>
            <label htmlFor="">step</label>
            <input type="text" onChange={(e) => setstep(e.target.value)}/>
            <label htmlFor="">amount</label>
            <input type="text" onChange={(e) => setamount(e.target.value)}/>
            <label htmlFor="">oldbalance</label>
            <input type="text" onChange={(e) => setoldbalance(e.target.value)}/>
            <label htmlFor="">newbalance</label>
            <input type="text" onChange={(e) => setnewbalance(e.target.value)}/>
            <label htmlFor="">origchange</label>
            <input type="text" onChange={(e) => setorigchange(e.target.value)}/>
            <label htmlFor="">seterrordest</label>
            <input type="text" onChange={(e) => setseterrordest(e.target.value)}/>
        </form> */}

        

        <form className="mt-5 grid grid-cols-4 gap-4 items-center">
          <div>
          <label htmlFor="">time</label><br />
          <input type="text"  className="mb-5 bg-transparent rounded-sm px-4 py-2 border-blue-300 border-2" value={time} onChange={(e) => settime(e.target.value)}/>
          </div>
          <div>
          <label htmlFor="">type</label><br />
          <input type="text"  className="mb-5 bg-transparent rounded-sm px-4 py-2 border-blue-300 border-2" value={type} onChange={(e) => settype(e.target.value)}/>
          </div>
          <div>
          <label htmlFor="">amount</label><br />
          <input type="text"  className="mb-5 bg-transparent rounded-sm px-4 py-2 border-blue-300 border-2" value={amount} onChange={(e) => setamount(e.target.value)}/>
          </div>
          <div>
          <label htmlFor="">sender id</label><br />
          <input type="text"  className="mb-5 bg-transparent rounded-sm px-4 py-2 border-blue-300 border-2" value={nameorig} onChange={(e) => setnameorig(e.target.value)}/>
          </div>
          <div>
          <label htmlFor="">oldbalance</label><br />
          <input type="text"  className="mb-5 bg-transparent rounded-sm px-4 py-2 border-blue-300 border-2" value={oldbalanceorg} onChange={(e) => setoldbalanceorg(e.target.value)}/>
          </div>
          <div>
          <label htmlFor="">newbalance</label><br />
          <input type="text"  className="mb-5 bg-transparent rounded-sm px-4 py-2 border-blue-300 border-2" value={newbalanceorg} onChange={(e) => setnewbalanceorg(e.target.value)}/>
          </div>
          <div>
          <label htmlFor="">reciever id</label><br />
          <input type="text"  className="mb-5 bg-transparent rounded-sm px-4 py-2 border-blue-300 border-2" value={namedest} onChange={(e) => setnamedest(e.target.value)}/>
          </div>
          <div>
          <label htmlFor="">old balance reciever</label><br />
          <input type="text"  className="mb-5 bg-transparent rounded-sm px-4 py-2 border-blue-300 border-2" value={oldbalancedest} onChange={(e) => setoldbalancedest(e.target.value)}/>
          </div>
          <div>
          <label htmlFor="">new balance reciever</label><br />
          <input type="text"  className="mb-5 bg-transparent rounded-sm px-4 py-2 border-blue-300 border-2" value={newbalancedest} onChange={(e) => setnewbalancedest(e.target.value)}/>
          </div>
          <div>
          <label htmlFor="">location</label><br />
          <input type="text" className="mb-5 bg-transparent rounded-sm px-4 py-2 border-blue-300 border-2" value={location} onChange={(e) => setlocation(e.target.value)}/>
          </div>
          <div>
          <label htmlFor="">phone no.</label><br />
          <input type="text" className="mb-5 bg-transparent rounded-sm px-4 py-2 border-blue-300 border-2" value={mobile} onChange={(e) => setmobile(e.target.value)}/>
          </div>
          <br />
          <button className="btn btn-primary" onClick={handleClick}>{isLoading? 'Initiating...' : 'Make Payment'}</button>
        </form>
    </div>
  )
}

export default Transaction