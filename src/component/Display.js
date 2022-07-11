import React from "react";
import "./Display.css";
import deleteIcon from "../Assets/icons/delete-black-18dp.svg";
import editIcon from "../Assets/icons/create-black-18dp.svg";
import profile1 from "../Assets/profile-images/Ellipse -1.png";
import profile2 from "../Assets/profile-images/Ellipse -3.png";
import profile3 from "../Assets/profile-images/Ellipse -7.png";
import profile4 from "../Assets/profile-images/Ellipse -8.png";
import EmployeeService from "../Service/EmployeeService";
import {useNavigate } from "react-router-dom";

const Display = (props) => {
 let navigate = useNavigate();
  const update = (employeeId) => {
    
    navigate(`/Employeeform/${employeeId}`);
     
  };

  const remove = (employeeId) => {
    EmployeeService
      .deleteEmployee(employeeId)
      .then((data) => {
        var answer = window.confirm("Data once deleted cannot be restored!! Do you wish to continue ?",data);
        if(answer === true){
            alert("Data deleted successfully!!");
            window.location.reload();
            props.getAllEmployees();
        }
        else{
          window.location.reload();
        }
      })
    //   .catch((error) => {
    //     toast.error("Something Went Wrong!");
    //   });
  };
   
    return (
      <>
      <table id="display" className="display">
        <tbody>
              
          <tr>
            <th>Profile Image</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Departments</th>
            <th>Salary</th>
            <th>Start Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
          {
              props.employeeArray &&
                props.employeeArray.map((employees,index) => (
                  <tr key={`${index}`}>
                    <td><img className="profile" 
                      src={
                        employees.profilePic ===
                        "../../Assets/profile-images/Ellipse -1.png"
                          ? profile1
                          : employees.profilePic ===
                            "../../Assets/profile-images/Ellipse -3.png"
                          ? profile2
                          : employees.profilePic ===
                            "../../Assets/profile-images/Ellipse -7.png"
                          ? profile3
                          : profile4
                      }
                      alt=""
                      />
                    </td>
                   
                    <td>{employees.name}</td>
                    <td className="gender">{employees.gender}</td>
                    <td>
                      {employees.departments &&
                        employees.departments.map((dept) => (
                          <div className="dept-label">{dept}</div>
                        ))}
                    </td>
                    <td> ₹{employees.salary}</td>
                    <td>{employees.startDate}</td>
                    <td>{employees.note}</td>
                    <td>
                      <img onClick={() => remove(employees.employeeId)}
                      src={deleteIcon}
                      alt="delete" />
                    <img onClick={() => update(employees.employeeId)}
                      src={editIcon}
                      alt="edit" />
                    </td>
                  </tr>
                ))
            }
          </tbody>
      </table>
      </>
    );
  };
  export default (Display); 