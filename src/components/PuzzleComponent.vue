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
          :disabled="cell !== null || colors.hasWinner"
          :type="colors.colors[rowIndex][cellIndex]"
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
import type { Type as ButtonTypeType } from 'naive-ui/es/button/src/interface'
import {
  Dismiss12Regular as XIcon,
  Circle12Regular as OIcon,
} from '@vicons/fluent'
import { computed } from 'vue'
import { hasSpace, type TicTacToeBoard } from '@/logic'

const props = defineProps<{ board: TicTacToeBoard }>()

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

const colors = computed(() => {
  // if someone has won, highlight the winning line (use "primary" color)
  const colors: Array<Array<ButtonTypeType>> = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => 'default'),
  )

  // check rows
  for (let i = 0; i < 3; i++) {
    if (
      props.board[i][0] === props.board[i][1] &&
      props.board[i][1] === props.board[i][2] &&
      props.board[i][0] !== null
    ) {
      colors[i][0] = colors[i][1] = colors[i][2] = 'primary'
      return { colors, hasWinner: true }
    }
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      props.board[0][i] === props.board[1][i] &&
      props.board[1][i] === props.board[2][i] &&
      props.board[0][i] !== null
    ) {
      colors[0][i] = colors[1][i] = colors[2][i] = 'primary'
      return { colors, hasWinner: true }
    }
  }

  // check diagonal from top-left to bottom-right
  if (
    props.board[0][0] === props.board[1][1] &&
    props.board[1][1] === props.board[2][2] &&
    props.board[0][0] !== null
  ) {
    colors[0][0] = colors[1][1] = colors[2][2] = 'primary'
    return { colors, hasWinner: true }
  }

  // check diagonal from top-right to bottom-left
  if (
    props.board[0][2] === props.board[1][1] &&
    props.board[1][1] === props.board[2][0] &&
    props.board[0][2] !== null
  ) {
    colors[0][2] = colors[1][1] = colors[2][0] = 'primary'
    return { colors, hasWinner: true }
  }

  if (!hasSpace(props.board)) {
    colors.forEach((row, _rowIndex) => {
      row.fill('info')
    })
  }

  return { colors, hasWinner: false }
})
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
