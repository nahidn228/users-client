import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    console.log(users);
  }, []);
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUser = [...users, data];
        setUsers(newUser);
        form.reset();
      });
  };
  return (
    <>
      <h1>Users Management System</h1>
      <h3>Numbers of users: {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" />
        <br />
        <input type="text" name="email" />
        <br />
        <input type="submit" value="ADD" />
      </form>

      <div>
        {users?.map((user, idx) => (
          <div key={idx}>
            <p>
              {user.id} = {user.name} : {user.email}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
