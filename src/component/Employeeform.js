import React, { useState, useEffect } from 'react';
import profile1 from '../Assets/profile-images/Ellipse -3.png';
import profile2 from '../Assets/profile-images/Ellipse -1.png';
import profile3 from '../Assets/profile-images/Ellipse -8.png';
import profile4 from '../Assets/profile-images/Ellipse -7.png';
import './EmployeeForm.css';
import logo from '../Assets/images/logo.png'
import { useParams, Link } from 'react-router-dom';
import EmployeeService from '../../src/Service/EmployeeService';
//import {  toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

const Employeeform = (props) => {
    let initialValue = {
        name: '',
        profileArray: [
            { url: '../../Assets/profile-images/Ellipse -1.png' },
            { url: '../../Assets/profile-images/Ellipse -3.png' },
            { url: '../../Assets/profile-images/Ellipse -7.png' },
            { url: '../../Assets/profile-images/Ellipse -8.png' }

        ],
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departmentValue: [],
        gender: '',
        salary: '',
        day: '',
        month: '',
        year: '',
        startDate: '',
        notes: '',
        id: '',
        profilePic: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            startDate: ''
        }
        
    }
    
    const [formValue, setForm] = useState(initialValue);
    const params = useParams();
    

     useEffect(() => {
         if (params.id) {
           getDataById(params.id);
         }
       },[params.id]);

      const getDataById = (id) => {
        EmployeeService
          .getEmployee(id)
          .then((data) => {
            let obj = data.data.data;
            setData(obj);
          })
          .catch((err) => {
            alert("err is ", err);
          });
      };
    
    const setData = (obj) => {
       let array=obj.startDate;
       console.log(array);
       console.log()
        setForm({
          ...formValue,
          ...obj,
          id: obj.empId,
          name: obj.name,
          departmentValue: obj.departments,
          isUpdate: true,
          day:array[0]+array[1],
          month:array[3]+array[4]+array[5],
          year:array[7]+array[8]+array[9]+array[10],
          notes: obj.note,
        });
      };
      
    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })

    }

    const onCheckChange = (name) => {
        let index = formValue.departmentValue.indexOf(name);

        let checkArray = [...formValue.departmentValue]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, departmentValue: checkArray });
    }
    
    const getChecked = (name) => {
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }
    
    const save = async (event) => {
        event.preventDefault();
        
        let object = {
            name: formValue.name,
            departments: formValue.departmentValue,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            note: formValue.notes,
            id: formValue.id,
            profilePic: formValue.profilePic
          };
          

          if (formValue.isUpdate) {
            EmployeeService
              .updateEmployee(params.id,object)
              .then((data) => {
                  var answer =  window.confirm("Data once modified cannot be restored!! Do you wish to continue?",data);
                  if(answer === true){
                    alert("Data updated successfully!");
                    props.history.push("");
                  }else{
                      window.location.reload();
                  }
              })
            //   .catch((error) => {
            //     toast.error("WARNING!! Error updating the data!",error);
            //   });
          } else {
            EmployeeService
              .addEmployee(object)
              .then((response) => {
                console.log(response);
                alert("Data Added successfully!!",response)
                // props.history.push("");
              })
            //   .catch(error => {
            //     console.log(error);
            //       toast.dark("WARNING!! Error while adding the data!");
            //   });
          
        }     
    }
  
    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
    }
   
    return (
        <div className="payroll-main">
            <header className='header-content header'>
                <div className="logo-content">
                    <img src={logo} alt="" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span> <br />
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form className="form-head" action="#" onSubmit={save}>
                    <div className="form-head">Employee Payroll form</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name.." />
                    {/* <error className="error">{formValue.error.name}</error> */}
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="profilePic">Profile image</label>
                        <div className="profile-radio-content">
                            <label >
                                <input type="radio" name="profilePic" checked={formValue.profilePic === '../../Assets/profile-images/Ellipse -1.png'} value="../../Assets/profile-images/Ellipse -1.png" onChange={changeValue} />
                                <img className="profile" src={profile2} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profilePic" checked={formValue.profilePic === '../../Assets/profile-images/Ellipse -3.png'} value="../../Assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                <img className="profile" src={profile1} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profilePic" checked={formValue.profilePic === '../../Assets/profile-images/Ellipse -7.png'} value="../../Assets/profile-images/Ellipse -7.png" onChange={changeValue} />
                                <img className="profile" src={profile4} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profilePic" checked={formValue.profilePic === '../../Assets/profile-images/Ellipse -8.png'} value="../../Assets/profile-images/Ellipse -8.png" onChange={changeValue} />
                                <img className="profile" src={profile3} alt="profile" />
                            </label>

                        </div>
                        {/* <error className="error">{formValue.error.profilePic}</error> */}
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" checked={formValue.gender === 'male'} onChange={changeValue} name="gender" value="male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" checked={formValue.gender === 'female'} onChange={changeValue} name="gender" value="female" />
                            <label className="text" htmlFor="female">Female</label>
                        </div>
                        {/* <error className="error">{formValue.error.gender}</error> */}
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="departments">Department</label>
                        <div>
                            {formValue.allDepartment.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                        checked={getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}

                        </div>
                        {/* <error className="error">{formValue.error.department}</error> */}
                    </div>

                    <div className="row-content">
                        <label className="label text" htmlFor="salary">Salary</label>
                        <input className="input" type="text" id="salary" name="salary" value={formValue.salary} onChange={changeValue} />
                        {/* <error className="error">{formValue.error.salary}</error> */}
                    </div>

                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div>
                            <select value={formValue.day} onChange={changeValue} id="day" name="day">
                            <option value="" disabled selected>Day</option>
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select value={formValue.month} onChange={changeValue} id="month" name="month">
                            <option value="" disabled selected>Month</option>
                                <option value="Jan">January</option>
                                <option value="Feb">Febuary</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">August</option>
                                <option value="Sep">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                            </select>
                            <select value={formValue.year} onChange={changeValue} id="year" name="year">
                            <option value="" disabled selected>Year</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                        {/* <error className="error">{formValue.error.startDate}</error> */}
                    </div>

                    <div className="row-content">
                        <label className="label text" htmlFor="notes">Notes</label>
                        <textarea onChange={changeValue} id="notes" value={formValue.notes} className="input" name="notes" placeholder=""
                            style={{ height: '120%' }}></textarea>
                    {/* <error className="error">{formValue.error.notes}</error> */}
                    </div>

                    <div className="buttonParent">
                        <Link to="/home" className="resetButton button cancelButton">Cancel</Link>
                        <Link to="/home" className="resetButton button cancelButton">Employee List</Link>

                        <div className="submit-reset">
                        
                            <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="button" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div >
                </form >
            </div >
        </div >
    );
}                     
export default Employeeform;
