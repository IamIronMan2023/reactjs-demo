import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const EmployeeCreate = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    id: 0,
  });

  const navigate = useNavigate();
  const { token } = useAuth();

  const handleChanged = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const controller = new AbortController();
    let url = `${process.env.REACT_APP_API_URL}/employees`;

    const requestOptions = {
      signal: controller.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        first_name: employee.first_name,
        last_name: employee.last_name,
        age: employee.age,
        email: employee.email,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        navigate(`/employee/${data.id}`);
      });

    return () => {
      controller.abort();
    };
  };

  return (
    <div>
      <h1>Employee Edit</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            required="required"
            onChange={handleChanged}
          />
        </p>
        <p>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            required="required"
            onChange={handleChanged}
          />
        </p>
        <p>
          <label>Age</label>
          <input
            type="number"
            name="age"
            required="required"
            onChange={handleChanged}
          />
        </p>
        <p>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            required="required"
            onChange={handleChanged}
          />
        </p>

        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default EmployeeCreate;
