<template>
  <n-flex>
    <n-card :title="props.title" closable @close="emit('close')" size="huge">
      <div id="search-tree-div" style="width: 80vw; height: 80vh">
        <!-- Main content goes here -->
      </div>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import {
  searchTreeToData,
  type SearchTreeNode,
  type TicTacToeBoard,
} from '@/logic'
import { NCard, NFlex } from 'naive-ui'
import * as echarts from 'echarts'
import { generateTicTacToeSVGPath } from '@/draw'
import { onMounted } from 'vue'

const props = defineProps<{
  title: string
  tree: SearchTreeNode | null
  show: boolean
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

function init() {
  // tree chart
  const treeChart = echarts.init(document.getElementById('search-tree-div')!)
  const option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    series: [
      {
        type: 'tree',
        symbol: (data: TicTacToeBoard) => {
          return (
            'path://' +
            generateTicTacToeSVGPath(
              data ?? [
                ['X', 'O', 'X'],
                [null, null, null],
                [null, 'X', null],
              ],
              10,
              2,
            )
          )
        },
        symbolSize: 34,
        label: {
          show: true,
          position: 'bottom',
        },
        data: [searchTreeToData(props.tree)],
        orient: 'TB',
        itemStyle: {
          // Dark Green
          color: 'rgb(0, 128, 0)',
        },
      },
    ],
  }

  console.log(option)

  treeChart.setOption(option)
}

onMounted(() => {
  init()
})
</script>
