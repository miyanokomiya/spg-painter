<script lang="ts">
  export let x = 0
  export let y = 0
  export let selected = false

  $: color = selected ? 'green' : 'red'
</script>

<g>
  <circle cx={x} cy={y} r="5" fill={color} stroke="none" />
</g>
