import { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get("http://localhost:8080/api/users");
        setUsers(response.data);
    };

    const createUser = async () => {
        if (!name.trim()) return;
        try {
            await axios.post("http://localhost:8080/api/users",
                { name },
                { headers: { "Content-Type": "application/json" } } 
            );
            setName("");
            fetchUsers();
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };


    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button onClick={createUser} className="px-4 py-2 bg-blue-500 text-white rounded">Add User</button>
            </div>
            <ul className="mt-4">
                {users.map(user => (
                    <li key={user.id} className="p-2 border-b">{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
