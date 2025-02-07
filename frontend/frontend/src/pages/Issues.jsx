import { useState, useEffect } from "react";
import axios from "axios";

function Issues() {
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editingIssue, setEditingIssue] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchIssues();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchIssues = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/issues");
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const createOrUpdateIssue = async () => {
    if (!selectedUser || !description.trim() || !category.trim()) return;
    try {
      if (!editingIssue) {
        await axios.post(
          `http://localhost:8080/api/issues/${selectedUser}`,
          { description, category },
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        await axios.put(
          `http://localhost:8080/api/issues/${editingIssue.id}`,
          { description, category },
          { headers: { "Content-Type": "application/json" } }
        );
      }
      setDescription("");
      setCategory("");
      setEditingIssue(null);
      fetchIssues();
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  const startEditing = (issue) => {
    setEditingIssue(issue);
    setDescription(issue.description);
    setCategory(issue.category);
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Issues</h2>
      <div className="mb-4">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Issue Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={createOrUpdateIssue}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          {editingIssue ? "Update issue" : "Add issue"}
        </button>
      </div>
      <ul className="mt-4">
        {issues.length === 0 ? (
          <p>No issues found.</p>
        ) : (
          issues.map((issue) => (
            <li key={issue.id} className="p-2 border-b">
              <strong>{issue.description}</strong> - {issue.category}{" "}
              (User: {issue.userName ? issue.userName : "Unknown"})
              <button onClick={() => startEditing(issue)}>Update</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Issues;
