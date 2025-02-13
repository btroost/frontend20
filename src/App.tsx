import { useEffect, useState, useRef } from "react";
import type { Schema } from "../amplify/data/resource";

import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const apiUrl = 'https://p0go49fgi5.execute-api.eu-west-3.amazonaws.com/Prod/hello';

  // Get REST API button, Jsonify to text
  const [jsonResponse, setJsonResponse] = useState<string | null>(null);
  const [error] = useState<string | null>(null);

  const fetchData = async () => {
    //   alert('De knop "Get REST API" is ingedrukt');
    try {
      const response = await fetch(apiUrl);
      // Zorg dat je CORS enabled in de API Gateway
      if (!response.ok) {
        throw new Error('Netwerkresponse was niet ok');
      }
      const result = await response.json();
      // Zet de JSON om in een string en sla het op in de state
      setJsonResponse(JSON.stringify(result, null, 2)); // 'null, 2' voor nette opmaak
    } 
    catch (err) {
      throw new Error('Er is een fout opgetreden: ');
    }
  }
  
  const fetchformatData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Netwerkresponse was niet ok');
      } 
      const result = await response.json();
      alert(`result is:  ${result.statusCode}  ${result.body}`)
    } 
    catch (err) {
      throw new Error('Er is een fout opgetreden: ');
    }
  }

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li           
          onClick={() => deleteTodo(todo.id)} 
          key={todo.id}>{todo.content}
          </li>))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
      <button onClick={fetchData}>Get REST API</button>
     
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {jsonResponse ? (
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {jsonResponse}
          </pre>
        ) : (
          <p>Geen gegevens beschikbaar</p>
        )}
      </div>
      <input type="text" ref={inputRef} placeholder="Voer iets in" />

      <button onClick={fetchformatData}>Json velden REST API</button>
    </main>
  );
}

export default App;
