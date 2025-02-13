import { useEffect, useState, useRef } from "react";
import type { Schema } from "../amplify/data/resource";

//Auth1
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  //Auth1
  //const { signOut } = useAuthenticator();
  //Auth2
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);



  const inputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    // Via de ref kun je toegang krijgen tot de waarde van het input veld
    if (inputRef.current) {
      alert(`De ingevoerde tekst is: ${inputRef.current.value}`);
    }
  };


  const apiUrl = 'https://p0go49fgi5.execute-api.eu-west-3.amazonaws.com/Prod/hello';
    

  const fetchData = async () => {
    alert('De knop "Get REST API" is ingedrukt');
    try {
      alert('checkpoint');
      const response = await fetch(apiUrl);
      alert('checkpoint2');
      //alert('De knop "Get REST API" is ingedrukt. response is: ${response}');
      alert(`De response is: ${response}`);
     if (!response.ok) {
        throw new Error('Netwerkresponse was niet ok');
      }
 
      const result = await response.json();
      alert(`De ingevoerde tekst is: ${result}`);
   //     const data: User[] = await response.json();
 //     setUsers(data);
    } catch (err) {
      alert(`Er is een fout opgetreden ${err}` );
      throw new Error('Er is een fout opgetreden: ');
  // }
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
      <input type="text" ref={inputRef} placeholder="Voer----- iets in" />
      <button onClick={handleButtonClick}>Toon Ingevoerde Tekst</button>

      <label>Invoer</label>

      <div id="result">result</div>

    </main>
  );
}

export default App;
