import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isEditOpen,setEditOpen]=useState(false)
  const [name, setName] = useState("");
  const [rollno, setRollNo] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [section, setSection] = useState("");
  const [tamil, setTamil] = useState("");
  const [english, setEnglish] = useState("");
  const [maths, setMaths] = useState("");
  const [science, setScience] = useState("");
  const [social, setSocial] = useState("");
  const emailId =localStorage.getItem("email");

 const [PutData,setPutData]=useState({})
  const openModal = () => {
    setIsModalOpen(true);
  };
  const openEdit=async(id)=>{
    setEditOpen(true);
    const response=await axios.get(`http://localhost:8080/api/getStudent/${id}`)
    console.log(response.data);
    setPutData(response.data)
    console.log("Put:"+PutData);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeEdit=()=>{
    setEditOpen(false);
  }

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/updateStudent/${emailId}`, PutData);
      console.log("Data updated successfully:", response.data);
      // Close the edit modal
      closeEdit();
      // Update the users state to reflect the changes
      loadUsers();
    } catch (error) {
      console.log("Error updating data:", error);
    }
  };
  
  
             
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Roll Number:", rollno);
    setName("");
    setRollNo("");
    setDob("");
    setEmail("");
    setPassword("");
    setGender("");
    setSection("");
    setTamil("");
    setEnglish("");
    setMaths("");
    setScience("");
    setSocial("");
   

    // Close the modal
    closeModal();

    const data = {
      name: name,
      rollNo: rollno,
      dob: dob,
      email: email,
      password: password,
      gender: gender,
      section: section,
      tamil: parseFloat(tamil),
      english: parseFloat(english),
      maths: parseFloat(maths),
      science: parseFloat(science),
      social: parseFloat(social),
      total: parseFloat(tamil) + parseFloat(english) + parseFloat(maths) + parseFloat(science) + parseFloat(social),
      percentage: parseFloat((parseFloat(tamil) + parseFloat(english) + parseFloat(maths) + parseFloat(science) + parseFloat(social)) / 5)
    };

    axios
      .post("http://localhost:8080/api/result", data)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        // Update the users state to reflect the changes
        loadUsers();
      })
      .catch((error) => {
        console.log("Error submitting data:", error);
      });
  };

  const [users, setUsers] = useState([]);

  const { id } = useParams();

  const loadUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/getStudent`);
      console.log("User data:", result.data);
      setUsers(result.data);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [id]);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/api/deleteStudent/${id}`);
    loadUsers();
  };

  return (
    <>
      <div className="logo">
        <Link to="/login">
          <h1>Result Management</h1>
        </Link>
        <button className="but3" onClick={openModal}>
          ADD STUDENT
        </button>
      </div>

      <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Name</th>
                <th scope="col">Roll Number</th>
                <th scope="col">DOB</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Gender</th>
                <th scope="col">Section</th>
                <th scope="col">Tamil</th>
                <th scope="col">English</th>
                <th scope="col">Maths</th>
                <th scope="col">Science</th>
                <th scope="col">Social</th>
                <th scope="col">Total</th>
                <th scope="col">Percentage</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.rollNo}</td>
                  <td>{user.dob}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.gender}</td>
                  <td>{user.section}</td>
                  <td>{user.tamil}</td>
                  <td>{user.english}</td>
                  <td>{user.maths}</td>
                  <td>{user.science}</td>
                  <td>{user.social}</td>
                  <td>{user.total}</td>
                  <td>{user.percentage}</td>
                  <td>
                    <button class="but4" onClick={()=>openEdit(user.id)}>
                      Edit
                    </button>
                    <button
                      className="but5"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Roll Number:
              <input
                type="text"
                value={rollno}
                onChange={(e) => setRollNo(e.target.value)}
                required
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="Date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </label>
            <label>
              Gender:
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </label>
            <label>
              Section:
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              </label>
              <label>
              Password:
              <input
                type="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              Tamil Mark:
              <input
                type="text"
                value={tamil}
                onChange={(e) => setTamil(e.target.value)}
                required
              />
            </label>
            <label>
              English Mark:
              <input
                type="text"
                value={english}
                onChange={(e) => setEnglish(e.target.value)}
                required
              />
            </label>
            <label>
              Maths Mark:
              <input
                type="text"
                value={maths}
                onChange={(e) => setMaths(e.target.value)}
                required
              />
            </label>
            <label>
              Science Mark:
              <input
                type="text"
                value={science}
                onChange={(e) => setScience(e.target.value)}
                required
              />
            </label>
            <label>
              Social Mark:
              <input
                type="text"
                value={social}
                onChange={(e) => setSocial(e.target.value)}
                required
              />
            </label>
            
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      {isEditOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="close" onClick={closeEdit}>
              &times;
            </span>
            <h2>EDIT Student {PutData.name}</h2>
            <form onSubmit={handleEditSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={PutData.name}
                onChange={(e) => setPutData({...PutData,name:e.target.value})}
                
              />
            </label>
            <label>
              Roll Number:
              <input
                type="text"
                value={PutData.rollNo}
                onChange={(e) => setPutData({...PutData,rollNo:e.target.value})}
                
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="Date"
                value={PutData.dob}
                onChange={(e) => setPutData({...PutData,dob:e.target.value})}
                
              />
            </label>
            <label>
              Gender:
              <input
                type="text"
                value={PutData.gender}
                onChange={(e) => setPutData({...PutData,gender:e.target.value})}
                
              />
            </label>
            <label>
              Section:
              <input
                type="text"
                value={PutData.section}
                onChange={(e) => setPutData({...PutData,section:e.target.value})}
                
              />
            </label>
            <label>
              Email:
              <input
                type="Email"
                value={PutData.email}
                onChange={(e) => setPutData({...PutData,email:e.target.value})}
                disabled
              />
              </label>
              <label>
              Password:
              <input
                type="Password"
                value={PutData.password}
                onChange={(e) => setPutData({...PutData,password:e.target.value})}
                
              />
            </label>
            <label>
              Tamil Mark:
              <input
                type="text"
                value={PutData.tamil}
                onChange={(e) => setPutData({...PutData,tamil:e.target.value})}
                
              />
            </label>
            <label>
              English Mark:
              <input
                type="text"
                value={PutData.english}
                onChange={(e) => setPutData({...PutData,english:e.target.value})}
                
              />
            </label>
            <label>
              Maths Mark:
              <input
                type="text"
                value={PutData.maths}
                onChange={(e) => setPutData({...PutData,maths:e.target.value})}
                
              />
            </label>
            <label>
              Science Mark:
              <input
                type="text"
                value={PutData.science}
                onChange={(e) => setPutData({...PutData,science:e.target.value})}
                
              />
            </label>
            <label>
              Social Mark:
              <input
                type="text"
                value={PutData.social}
                onChange={(e) => setPutData({...PutData,social:e.target.value})}

              />
            </label>
            
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

