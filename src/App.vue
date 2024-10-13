<template>
  <n-layout
    class="background"
    embedded
    content-style="display: flex; justify-content: center; align-items: center;"
  >
    <div>
      <n-layout
        class="main-content"
        content-style="display: flex; flex-direction: column;"
      >
        <n-layout-header>
          <n-flex justify="space-between" align="center">
            <span>井字棋</span>
            <n-flex>
              <n-button
                strong
                type="info"
                :disabled="!enableAINext"
                round
                @click="machine.performMove()"
              >
                <template #icon>
                  <AutoIcon />
                </template>
              </n-button>
              <n-button
                strong
                :type="resetButtonType"
                round
                @click="machine.reset()"
              >
                <template #icon>
                  <ResetIcon />
                </template>
              </n-button>
            </n-flex>
          </n-flex>
        </n-layout-header>
        <n-layout has-sider style="align-items: stretch">
          <n-layout-content
            content-style="padding: 24px;"
            content-class="center-content"
          >
            <PuzzleComponent
              :board="machine.puzzle"
              @click="machine.onCellClick"
            />
          </n-layout-content>
          <n-layout-sider content-style="padding: 24px;">
            <p>
              设置
              <n-flex vertical>
                <n-flex>
                  <span>下一颗：</span
                  ><n-switch v-model:value="machine.enableAI">
                    <template #checked> 就让电脑下棋 </template>
                    <template #unchecked> 不让电脑下棋 </template>
                  </n-switch>
                </n-flex>
              </n-flex>
            </p>
            <p>
              状态：<br />
              下一颗：{{ machine.nextPlayer }}<br />
              {{ machine.hasWinner ? '有' : '无' }}胜者
            </p>
          </n-layout-sider>
        </n-layout>
      </n-layout>
    </div>
  </n-layout>
</template>

<script setup lang="ts">
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NFlex,
  NSwitch,
  NButton,
} from 'naive-ui'
import type { Type as ButtonTypeType } from 'naive-ui/es/button/src/interface'
import PuzzleComponent from './components/PuzzleComponent.vue'
import {
  ArrowReset32Filled as ResetIcon,
  AnimalDog24Filled as AutoIcon,
} from '@vicons/fluent'

import { createMachine } from './logic'
import { computed } from 'vue'

const machine = createMachine()

const resetButtonType = computed<ButtonTypeType>(() => {
  return machine.hasWinner || !machine.hasSpace ? 'primary' : 'default'
})

const enableAINext = computed(() => {
  return machine.hasSpace && !machine.hasWinner
})
</script>

<style>
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.background {
  height: 100vh;
  width: 100vw;
}

.main-content {
  width: 800px;
  height: 600px;
}

.n-layout-header {
  padding: 24px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.3);
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}
</style>
