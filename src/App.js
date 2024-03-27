
import './App.css';
import { FaMoneyBillWave } from "react-icons/fa";
import { FaPercent } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { MdOutlineCalendarMonth } from "react-icons/md";
import { MdError } from "react-icons/md";
import Temp from './Temp';
import addCommas from './comma';
function App() {
  const [amount,Setamount]=useState(100000)
  const [dp,Setdp]=useState((0.20*amount).toFixed(2))
  const [loan,Setloan]=useState((0.80*amount).toFixed(2))
  const [rate,Setrate] = useState(9)
  // const [fee,Setfee] = useState(199)
  const [tenure,Settenure]= useState(24)
  const [emi,Setemi]= useState(false)
  useEffect(()=>{
    if(amount<3000){
      return
    }
   dp<0 && Setdp(0)
   loan<0 && Setloan(0)
   amount>0 && Setdp((0.20*amount).toFixed(2));Setloan((0.80*amount).toFixed(2))
   dp>amount &&  Setdp((0.20*amount).toFixed(2))
   loan>amount && Setloan((0.80*amount).toFixed(2))

  },[amount])
  useEffect(()=>{
    if(rate<3 || amount<3000 || tenure<3){
      return
    }
    if(loan===0){
      Setemi(0)
    }
    const monthlyRate = rate / 1200;
    const emiValue = (loan * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
   
    Setemi(Math.ceil(emiValue.toFixed(2)))
  },[loan,amount,rate,tenure]);

  useEffect(()=>{
    Setdp(amount - loan)
  },[loan])
  useEffect(()=>{
    Setloan(amount- dp)
  },[dp])
  const handleChange=(e,setfunc)=>{
     e.target.name === "amount" && Setamount(e.target.value);
     (e.target.name === "dp" && amount>=3000) &&  Setdp(e.target.value);
     (e.target.name === "loan" && amount>=3000) && Setloan(e.target.value)
     e.target.name === "rate" && Setrate(e.target.value)
     e.target.name === "tenure" && Settenure(e.target.value)
  }
  return (
    <div className="App" >
     <div className='container-in'>
      <h2>Loan Calculator</h2>
      <div className='fwrap'>
      <div className='field'>
        <label htmlFor="amount">
          Total Amount:  <br></br> 
          {amount<3000 && <div className='err'>
          <MdError />  Amount less than 3000</div>}
          <div className='inwrap'>
          <input id='amount' name='amount' type='number' value={amount} onChange={(e)=>handleChange(e,Setamount)}/>
          <div className='icon'
          >
            <FaMoneyBillWave />
          </div>
          
          </div>     
        </label>
      </div>
      <div className='field'>
        <label htmlFor="dp">
          Down Payment:  <br></br> 
          <div className='inwrap'>
          <input id='dp' name='dp' type='number' value={dp} onChange={(e)=>handleChange(e,Setdp)}/>
            <div className='icon'>
            <FaMoneyBillWave />
            </div>
          </div>

        </label>
        <div className='rfield'>0
          <input id='dp' name='dp' type='range' value={dp} min={0} max={amount} onChange={(e)=>handleChange(e,Setdp)} disabled={amount < 3000}/>
          {amount}</div>
          {/* <div className='range'>
            <div className='sliderValue'>
              <span>{dp}</span>
            </div>
            <div className='field'>
              <div className='value left'>0</div>
              <input type='range' name='dp' min={0} value={dp} max={amount} onChange={(e)=>handleChange(e,Setdp)}/>
              <div className='value right'>{amount}</div>  
            </div>
        
      
        </div> */}
      </div>
      <div className='field'>
        <label htmlFor="loan">
          Loan Amount: <br></br> 
          <div className='inwrap'>
          <input id='loan'  name='loan' type='number' value={loan} onChange={(e)=>handleChange(e,Setloan)}/>
          <div className='icon'>
          <FaMoneyBillWave />
          </div>
          </div>
           
        </label>
        <div className='rfield'>0
       <input type='range' name='loan' min={0} value={loan} max={amount} onChange={(e)=>handleChange(e,Setloan)}  disabled={amount < 3000} />{amount}
        </div>
      </div>
      <div className='field'>
        <label htmlFor="rate">
          Intrest Rate: <br></br> 
          { rate<3 &&
            <div className='err'><MdError /> Rate atleast 3%</div>
          }
          <div className='inwrap'>
          <input id='rate' name='rate' type='number' value={rate} onChange={(e)=>handleChange(e,Setrate)}/>
            <div className='icon'>
              <FaPercent/>
            </div>
          </div>
        </label>
      </div>
      <div className='field tenure'>
        <label htmlFor="tenure">
          Tenure  (Months): <br></br>
          { tenure<3 && 
          <div className='err'><MdError /> Not less than 3 Months</div>}
          <div className='inwrap'>
          <input id='tenure' name='tenure' type='number' value={tenure} onChange={(e)=>handleChange(e,Settenure)}/>
         <div className='icon'>
          <MdOutlineCalendarMonth/>
         </div>
          </div>
        </label>
      </div>
      <div className='result'>
        {(emi && amount>=3000 && rate>=3 && tenure>=3) && <div>Your Monthly E.M.I is:-<span>
          {addCommas(emi)}
          </span>Rs</div>}
      </div>
      </div>
     </div>
    </div>
  );
}

export default App;
