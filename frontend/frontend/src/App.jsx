import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-5">Issue Tracker</h1>
      <nav className="space-x-4">
        <Link to="/users" className="px-4 py-2 bg-blue-500 text-white rounded">Manage Users</Link>
        <Link to="/issues" className="px-4 py-2 bg-green-500 text-white rounded">Manage Issues</Link>
      </nav>
    </div>
  );
}

export default App;
