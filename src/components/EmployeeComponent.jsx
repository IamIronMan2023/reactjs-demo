import React, {useContext} from "react";
import SalaryContext from "./SalaryContext";

const Employee = (props) => {
    const {salary} = useContext(SalaryContext);

    return (
        <div>
            <h2>Employee Profile</h2>
            <p>
                <label>Employee Id <b>{props.Id}</b></label>
            </p>
            <p>
                <label>Employee First Name <b>{props.firstName}</b></label>
            </p>
            <p>
                <label>Employee Last Name <b>{props.lastName}</b></label>
            </p>
            <p>
                <label>Employee Age <b>{props.age}</b></label>
            </p>
            <p>
                <label>Salary is : <b>{salary}</b></label>
            </p>
        </div>
    );
}

export default Employee;