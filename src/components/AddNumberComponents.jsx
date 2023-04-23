import React, {useState} from "react";

const AddNumberComponent = () => {
  const [data, setData]  = useState({
    firstNumber: 0,
    secondNumber: 0,
    sum: 0,
  });

  const handleChanged=(e)=>{
    const {name, value} = e.target;
    setData((d) =>{
        return {...d, [name]: value}
    })
  }
  
  const calculateSum = ()=> setData((prev)=>{return {...prev, sum: parseFloat(data.firstNumber) + parseFloat(data.secondNumber)}})

    return (
      <div>
        <p>
          <label>First Number </label>
          <input
            type="number"
            name="firstNumber"
            onChange={handleChanged}
            value={data.firstNumber}
          ></input>
        </p>
        <p>
          <label>Second Number </label>
          <input
            type="number"
            name="secondNumber"
            onChange={handleChanged}
            value={data.secondNumber}            
          ></input>
        </p>
        <p>
          <label> Sum: {data.sum}</label>
        </p>
        <p>
          <button onClick={calculateSum}>Calculate</button>
        </p>
      </div>
    );
}
export default AddNumberComponent;

