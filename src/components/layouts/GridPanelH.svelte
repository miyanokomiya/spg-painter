<script lang="ts">
  export let expanded = false
  export let rateList: number[] = [0.5, 0.5]

  $: rateSum = rateList.reduce((p, rate) => p + rate, 0)
  $: widthList = rateList.map((rate) => `${(rate / rateSum) * 100}%`)
</script>

<div class="wrapper" class:expanded>
  {#if $$slots['0']}
    <div class="item" class:expanded style="width: {widthList[0]};">
      <slot name="0" />
    </div>
  {/if}
  {#if $$slots['1']}
    <div class="item" class:expanded style="width: {widthList[1]};">
      <slot name="1" />
    </div>
  {/if}
  {#if $$slots['2']}
    <div class="item" class:expanded style="width: {widthList[2]};">
      <slot name="2" />
    </div>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    border: 1px solid #000;
    display: flex;
    align-items: center;
  }
  .item {
    padding: 4px;
    border-right: 1px solid #000;
  }
  .item:last-child {
    border: none;
  }
  .expanded {
    height: 100%;
  }
</style>
