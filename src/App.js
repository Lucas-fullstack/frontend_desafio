import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repository, setRepo] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepo(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    setRepo([...repository, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepo(repository.filter((repo) => (repo.id = !id)));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map((repo) => (
          <li key={repo.id}>
            {repo.title}
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
