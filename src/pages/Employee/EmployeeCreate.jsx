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
    picture: null,
  });

  const navigate = useNavigate();
  const { token } = useAuth();
    
  const handleChanged = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePictureChanged = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const controller = new AbortController();
    let url = `${process.env.REACT_APP_API_URL}/employees`;

    const formData = new FormData();
    formData.append('first_name', employee.first_name);
    formData.append('last_name', employee.last_name);
    formData.append('age', employee.age);    
    formData.append('email', employee.email);    
    formData.append('picture', employee.picture, employee.picture.name);        

    const requestOptions = {
      signal: controller.signal,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
      <h1>Create Employee</h1>
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
        <p>
          <label>Picture</label>
          <input
            type="file"
            name="picture"
            accept=".png,.jpg"            
            onChange={handlePictureChanged}            
          />
        </p>


        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default EmployeeCreate;
