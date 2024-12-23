import React, { useEffect, useState } from "react";

const Users1 = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    subjects: [],
    opinion: "",
    documents: "",
    date: "",
    feedback: "",
    gmail: ""
  });

  const [allUsers, setAllUsers] = useState([]);

  const [editing, setEditing] = useState(false);

  useEffect(()=>{readUser();},[])


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox"
        ? checked
          ? [...(prevUser[name] || []), value]
          : prevUser[name]?.filter(item => item !== value) || []
        : type === "file"
        ? files[0]?.name || "" 
        : value,
    }));
  };

 
  const createUser = async() => {
    await fetch("http://localhost:3000/server", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })
    readUser()
    clearUser()
  }

  const readUser = async() =>{
    const response = await (await fetch("http://localhost:3000/server")).json();
    setAllUsers(response)
  } 

  const deleteUser = async (usr) => {
    await fetch("http://localhost:3000/server/" + usr.id, {
      method: "DELETE"
    });
    readUser();
  };

  const editUser = (usr) => {
    setUser(usr) 
    setEditing(true)
  }

  const updateUser = async() => {
    await fetch("http://localhost:3000/server/" + user.id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })
    setEditing(false)
    clearUser()
    readUser()
  }

  const clearUser = () => {
    setUser({
      firstName: "",
      lastName: "",
      gender: "",
      subjects: [],
      opinion: "",
      documents: "",
      date: "",
      feedback: "",
      gmail: ""
    })
  }

  return (
    <div>
      <form>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange}required/>
        </div>
        
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} required/>
        </div>

        <div>
          <p>Gender:</p> 
          <input type="radio" id="male" name="gender" value="Male" checked={user.gender === "Male"} onChange={handleChange} required/>
          <label htmlFor="male">Male</label>
          <br />
          <input type="radio" id="female" name="gender" value="Female"checked={user.gender === "Female"} onChange={handleChange}/>
          <label htmlFor="female">Female</label>
          <br />
          <input type="radio" id="other" name="gender" value="Other" checked={user.gender === "Other"} onChange={handleChange}/>
          <label htmlFor="other">Other</label>
        </div>
        
        <div>
          <p>Subjects:</p>
          <input type="checkbox" id="math" name="subjects" value="Math" checked={user.subjects.includes("Math")} onChange={handleChange}/>
          <label htmlFor="math">Math</label>
          <br />
          <input type="checkbox" id="science" name="subjects" value="Science" checked={user.subjects.includes("Science")} onChange={handleChange}/>
          <label htmlFor="science">Science</label>
          <br />
          <input type="checkbox" id="history" name="subjects" value="History" checked={user.subjects.includes("History")} onChange={handleChange}/>
          <label htmlFor="history">History</label>
          <br />
          <input type="checkbox" id="english" name="subjects" value="English" checked={user.subjects.includes("English")} onChange={handleChange}/>
          <label htmlFor="english">English</label>
        </div>

        <div>
          <select name="opinion" id="opinion" value={user.opinion} onChange={handleChange}>
            <option value="" disabled>Select an option</option>
            <option value="Narmal">Narmal</option>
            <option value="Average">Average</option>
            <option value="Excellent">Excellent</option>
            <option value="Bad">Bad</option>
            <option value="Good">Good</option>
          </select>
        </div>

        <div>
          <label htmlFor="documents">Documents:</label>
          <input type="file" id="documents" name="documents" onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={user.date} onChange={handleChange}required/>
        </div>

        <div>
          <label htmlFor="gmail">Gmail:</label>
          <input type="email" id="gmail" name="gmail" value={user.gmail} onChange={handleChange} required/>
        </div>

        <div>
          <label htmlFor="feedback">Feedback:</label>
          <textarea id="feedback" name="feedback" value={user.feedback} onChange={handleChange} rows="4" cols="50"></textarea>
        </div>
        
        {editing ? 
        (<button type="button" onClick={updateUser}>Update</button>) : 
        (<button type="button" onClick={createUser}>Submit</button>)}
        
        
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>Fname</th>
              <th>Lname</th>
              <th>Gender</th>
              <th>Subject</th>
              <th>Opinion</th>
              <th>Documents</th>
              <th>Date</th>
              <th>Gmail</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
             {allUsers.map((usr,i)=>(
              <tr key={i}>
                <td>{usr.firstName}</td>
                <td>{usr.lastName}</td>
                <td>{usr.gender}</td>
                <td>{usr.subjects.join(", ")}</td>
                <td>{usr.opinion}</td>
                <td>{typeof usr.documents === "string" ? usr.documents : ""}</td>
                <td>{usr.date}</td>
                <td>{usr.gmail}</td>
                <td>{usr.feedback}</td>
                <td>
                  <button onClick={()=> editUser(usr)}>Edit</button>
                </td>
                <td>
                  <button onClick={()=> deleteUser(usr)}>Delete</button>
                </td>
              </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users1;
