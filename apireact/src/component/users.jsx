import React, { useEffect, useState } from "react";

const Users = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    subjects: [],
  });

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    readUser();
  }, []);
//handle change for
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]:
        type === "checkbox"
          ? checked
            ? [...(prevUser[name] || []), value]
            : prevUser[name]?.filter((item) => item !== value) || []
          : type === "file"
          ? files
          : value,
    }));
  };

  const createUser = async () => {
    await fetch("http://localhost:3000/server", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    readUser();
  };

  const readUser = async () => {
    const response = await fetch("http://localhost:3000/server");
    const data = await response.json();
    setAllUsers(data);
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <p>Gender:</p>{" "}
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            checked={user.gender === "Male"}
            onChange={handleChange}
            required
          />
          <label htmlFor="male">Male</label>
          <br />
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            checked={user.gender === "Female"}
            onChange={handleChange}
          />
          <label htmlFor="female">Female</label>
          <br />
          <input
            type="radio"
            id="other"
            name="gender"
            value="Other"
            checked={user.gender === "Other"}
            onChange={handleChange}
          />
          <label htmlFor="other">Other</label>
        </div>

        <div>
          <p>Subjects:</p>
          <input
            type="checkbox"
            id="math"
            name="subjects"
            value="Math"
            checked={user.subjects.includes("Math")}
            onChange={handleChange}
          />
          <label htmlFor="math">Math</label>
          <br />
          <input
            type="checkbox"
            id="science"
            name="subjects"
            value="Science"
            checked={user.subjects.includes("Science")}
            onChange={handleChange}
          />
          <label htmlFor="science">Science</label>
          <br />
          <input
            type="checkbox"
            id="history"
            name="subjects"
            value="History"
            checked={user.subjects.includes("History")}
            onChange={handleChange}
          />
          <label htmlFor="history">History</label>
          <br />
          <input
            type="checkbox"
            id="english"
            name="subjects"
            value="English"
            checked={user.subjects.includes("English")}
            onChange={handleChange}
          />
          <label htmlFor="english">English</label>
        </div>
        <button type="button" onClick={createUser}>
          Submit
        </button>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>Fname</th>
              <th>Lname</th>
              <th>Gender</th>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((usr, i) => (
              <tr key={i}>
                <td>{usr.firstName}</td>
                <td>{usr.lastName}</td>
                <td>{usr.gender}</td>
                <td>{usr.subjects.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
