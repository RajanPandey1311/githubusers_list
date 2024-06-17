import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
      setUsers(response.data.items);
    } catch (error) {
      console.error('Fetching issue:', error);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Users List</h1>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Username" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-item">
            <a href={user.html_url} target="_blank">
              <img src={user.avatar_url} alt={user.login} />
              <span>{user.login}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
