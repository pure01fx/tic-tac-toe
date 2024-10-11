<template>
  <n-flex vertical :size="0">
    <n-flex :size="0" v-for="(row, rowIndex) in props.board" :key="rowIndex">
      <div
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        :style="getStyle(rowIndex, cellIndex)"
      >
        <n-button
          quaternary
          circle
          @click="emit('click', rowIndex, cellIndex)"
          size="large"
        >
          <template #icon>
            <n-icon>
              <template v-if="cell === 'X'">
                <XIcon />
              </template>
              <template v-else-if="cell === 'O'">
                <OIcon />
              </template>
              <template v-else>
                <OIcon style="visibility: hidden" />
              </template>
            </n-icon>
          </template>
        </n-button>
      </div>
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
import { NFlex, NButton, NIcon } from 'naive-ui'
import {
  Dismiss12Regular as XIcon,
  Circle12Regular as OIcon,
} from '@vicons/fluent'

const props = defineProps<{ board: Array<Array<string | null>> }>()

const emit = defineEmits<{
  (event: 'click', rowIndex: number, cellIndex: number): void
}>()

const getStyle = (rowIndex: number, cellIndex: number) => {
  const style = {
    borderTop:
      rowIndex === 0 ? 'none' : 'var(--puzzle-border-thickness) transparent',
    borderLeft:
      cellIndex === 0 ? 'none' : 'var(--puzzle-border-thickness) transparent',
    borderRight:
      cellIndex === 2
        ? 'none'
        : 'var(--puzzle-border-thickness) solid var(--puzzle-border-color)',
    borderBottom:
      rowIndex === 2
        ? 'none'
        : 'var(--puzzle-border-thickness) solid var(--puzzle-border-color)',
    padding: '10px',
  }
  return style
}
</script>

<style>
/* vars: border thickness, color */
body {
  --puzzle-border-thickness: 2px;
  --puzzle-border-color: rgba(0, 0, 0, 0.5);
}

.cell-1-1 {
  border-top: var(--puzzle-border-thickness) transparent;
  border-left: var(--puzzle-border-thickness) transparent;
  border-right: var(--puzzle-border-thickness) solid black;
  border-bottom: var(--puzzle-border-thickness) solid black;
}
</style>
