import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    const url = `${process.env.REACT_APP_API_URL}/employees`;

    const requestOptions = {
      signal: controller.signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setEmployees(json);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [token]);

  return (
    <>
      <h2>Employee List</h2>
      {loading ? (
        <h3>Loading..</h3>
      ) : (
        <>
          <Link to="/employee/new">Add New Employee</Link>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>                
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id}>
                  <td>{e.first_name}</td>
                  <td>{e.last_name}</td>                  
                  <td>{e.email}</td>
                  <td>
                    <Link to={`/employee/${e._id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default EmployeeList;
