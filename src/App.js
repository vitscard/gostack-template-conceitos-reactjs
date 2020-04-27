import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {      
      setRepositories(response.data)      
    })

  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories",{
      title:`Repositorio add em:  ${Date.now()}`,
      url:"https://testeRepo.desafio",
      techs:["React-Native","NodeJs","ReactJs"]
    });

    const repo = response.data;
    
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {    
    const response =  await api.delete(`/repositories/${id}`);
    console.log(response);
    if (response.status === 204) {
      const newRepositories = repositories.filter(repo => !repo.id.includes(id))
      setRepositories(newRepositories)
    }else{
      alert(response.statusText);
    }
  }

  return (
    <div>
      <h1>Repositórios</h1>
      <ul data-testid="repository-list">
        {repositories.map(repo =>(
            <li key={repo.id}>
              <label>{repo.title}</label>
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
