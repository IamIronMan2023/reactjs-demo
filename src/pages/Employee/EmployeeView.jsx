import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const EmployeeView = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
  });

  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    setLoading(true);

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setEmployee(json);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [id, token]);

  const handleDelete = (e) => {
    if (window.confirm("Are you really sure you want to delete this record?")) {
      let url = `${process.env.REACT_APP_API_URL}/employees`;

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id
        }), 
      };

      fetch(url, requestOptions)
        .then(() => {
          navigate("/");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <h1>Employee Detail</h1>

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h3>First name: {employee.first_name}</h3>
          <h3>Last name: {employee.last_name}</h3>
          <h3>Age: {employee.age}</h3>
          <h3>Email: {employee.email}</h3>

          <p>
            <Link to="/">Employee List</Link>
          </p>
          <p>
            <Link to={`/employee/edit/${employee._id}`}>Edit</Link>
          </p>
          <p>
            <Link onClick={handleDelete}>Delete</Link>
          </p>
          <p>
            <Link to="/employee/new"> Add </Link>
          </p>
        </>
      )}
    </>
  );
};

export default EmployeeView;
