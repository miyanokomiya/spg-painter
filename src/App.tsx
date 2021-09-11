import React from 'react'
import './App.css'

import wasm from 'spg-painter-core'

async function loadWasm() {
  const ex = await wasm()
  console.log(ex)
}
loadWasm()

export default function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  )
}
