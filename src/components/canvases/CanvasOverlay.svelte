<script lang="ts">
  export let viewBox = '0 0 100 100'
  export let width = 0
  export let height = 0
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="none"
  font-family="sans-serif"
  {viewBox}
  {width}
  {height}
>
  <slot />
</svg>
