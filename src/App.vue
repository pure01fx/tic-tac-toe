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
          <n-flex justify="space-between">
            <span>井字棋</span><span>qwq</span>
          </n-flex>
        </n-layout-header>
        <n-layout has-sider style="align-items: stretch">
          <n-layout-content
            content-style="padding: 24px;"
            content-class="center-content"
          >
            <PuzzleComponent
              :board="machine.puzzle.value"
              @click="machine.onCellClick"
            />
          </n-layout-content>
          <n-layout-sider content-style="padding: 24px;">
            <p>
              设置
              <n-flex vertical>
                <n-flex>
                  <span>下一颗：</span
                  ><n-switch>
                    <template #checked> 就让电脑下棋 </template>
                    <template #unchecked> 不让电脑下棋 </template>
                  </n-switch>
                </n-flex>
              </n-flex>
            </p>
            <p>
              状态：<br />
              下一颗：{{ machine.nextPlayer.value }}<br />
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
} from 'naive-ui'
import PuzzleComponent from './components/PuzzleComponent.vue'

import { createMachine } from './logic'

const machine = createMachine()
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
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}
</style>
