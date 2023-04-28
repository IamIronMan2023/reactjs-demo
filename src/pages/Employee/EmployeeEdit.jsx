import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const EmployeeEdit = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    picture: null
  });
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/employees/${id}`;

    const controller = new AbortController();

    const requestOptions = {
      method: "GET",
      headers: {
        signal: controller.signal,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => setEmployee(json));

    return () => {
      controller.abort();
    };
  }, [id, token]);

  const handleChanged = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePictureChanged = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_API_URL}/employees`;

    const formData = new FormData();
    formData.append('first_name', employee.first_name);
    formData.append('last_name', employee.last_name);
    formData.append('age', employee.age);    
    formData.append('email', employee.email);    
    formData.append('picture', employee.picture, employee.picture.name);
    formData.append('id', id);

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => navigate(`/employee/${id}`))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Employee Edit</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            required="required"
            onChange={handleChanged}
            value={employee.first_name}
          ></input>
        </p>

        <p>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            required="required"
            onChange={handleChanged}
            value={employee.last_name}
          ></input>
        </p>

        <p>
          <label>Age</label>
          <input
            type="number"
            name="age"
            required="required"
            onChange={handleChanged}
            value={employee.age}
          ></input>
        </p>

        <p>
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            required="required"
            onChange={handleChanged}
            value={employee.email}
          ></input>
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


        <input type="submit" value="Update" />
      </form>
    </>
  );
};

export default EmployeeEdit;
