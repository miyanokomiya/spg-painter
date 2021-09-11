import React from 'react'
import './App.css'

import wasm from "spg-painter-core";

async function loadWasm() {
    const { greet } = await wasm();
    greet()
}
loadWasm()


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  )
}

export default App
