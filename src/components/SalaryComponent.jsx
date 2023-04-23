import React, {useState, useContext} from "react";
import SalaryContext from "./SalaryContext";

const SalaryComponent = () => {
    const [data, setData] = useState({
        dailyRate: 0,
        noOfDays: 30
    });

    const {setSalary} = useContext(SalaryContext);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData((prev) => {
            return {...prev, [name]: value}
        });
    }

    const updateSalary = () => setSalary(parseFloat(data.dailyRate) * parseFloat(data.noOfDays));
    return(
        <div><h2>Salary Detail</h2>
        <p>
            <label>Daily Rate </label>
            <input type="number" name="dailyRate" onChange={handleChange} value={data.dailyRate} ></input>
        </p>
        <p>
            <label>No Of Days </label>
            <input type="number" name="noOfDays" onChange={handleChange} value={data.noOfDays} ></input>
        </p>
        <button onClick={updateSalary}> Update </button>

        </div>
    );
}
export default SalaryComponent;