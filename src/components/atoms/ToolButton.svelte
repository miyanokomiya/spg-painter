<button on:click>
  <slot />
</button>

<style>
  button {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #eee;
  }
  button:hover {
    opacity: 0.7;
  }
</style>
