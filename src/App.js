import React, { useState } from 'react';
import TiptapEditor from './components/TiptapEditor';
import './App.css';

function App() {
  const [user] = useState({ id: 1, name: 'Test User' }); // Removed setUser

  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">Rich Text Editor</h1>
      </header>
      <main className="container mx-auto mt-8">
        <TiptapEditor user={user} />
      </main>
    </div>
  );
}

export default App;
