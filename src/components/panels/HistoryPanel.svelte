<script lang="ts">
  import { summaries } from '../../stores/history'
</script>

<div class="wrapper">
  <div class="list">
    {#each $summaries as summary}
      <div class="item" class:done={summary.done} title={summary.label}>
        {summary.label}
      </div>
    {/each}
  </div>
</div>

<style>
  .wrapper {
    background-color: #efefef;
  }
  .list {
    display: flex;
    flex-direction: column-reverse;
    padding: 0 8px;
  }
  .item {
    padding: 4px 0;
    color: #aaa;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
  }
  .item + .item {
    border-bottom: solid 1px #aaa;
  }
  .item.done {
    color: #000;
  }
</style>
