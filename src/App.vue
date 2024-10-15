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
              <n-tooltip trigger="hover" placement="bottom">
                <template #trigger>
                  <n-button
                    strong
                    type="info"
                    :disabled="machine.searchTree === null"
                    round
                    @click="showSearchTree = true"
                  >
                    <template #icon>
                      <TreeIcon />
                    </template>
                  </n-button>
                </template>
                搜索树
              </n-tooltip>
              <n-tooltip trigger="hover" placement="bottom">
                <template #trigger>
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
                </template>
                去吧！<del>AI</del>
              </n-tooltip>
              <n-tooltip trigger="hover" placement="bottom">
                <template #trigger>
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
                </template>
                重置棋盘
              </n-tooltip>
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
            <div class="github-link">
              <a href="https://github.com/pure01fx/tic-tac-toe">
                <n-flex align="center">
                  <n-icon>
                    <LogoGithub />
                  </n-icon>
                  pure01fx/tic-tac-toe
                </n-flex>
              </a>
            </div>
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
                <n-select
                  v-model:value="machine.algorithm"
                  :options="algorithmOptions"
                />
                <n-input-number
                  :min="1"
                  :max="10"
                  :precision="0"
                  v-model:value="machine.depth"
                >
                  <template #prefix> 最大深度 </template>
                </n-input-number>
              </n-flex>
            </p>
            <p>
              状态：<br />
              下一颗：{{ machine.nextPlayer }}<br />
              搜索树节点数量：{{ machine.nodeCount }}
            </p>
          </n-layout-sider>
        </n-layout>
      </n-layout>
    </div>
    <n-modal v-model:show="showSearchTree">
      <search-tree-dialog-card
        title="搜索树"
        :show="showSearchTree"
        :tree="machine.searchTree"
        @close="showSearchTree = false"
      />
    </n-modal>
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
  NModal,
  NSelect,
  NInputNumber,
  NTooltip,
  NIcon,
} from 'naive-ui'
import type { Type as ButtonTypeType } from 'naive-ui/es/button/src/interface'
import PuzzleComponent from './components/PuzzleComponent.vue'
import SearchTreeDialogCard from './components/SearchTreeDialogCard.vue'
import {
  ArrowReset32Filled as ResetIcon,
  AnimalDog24Filled as AutoIcon,
  CubeTree24Regular as TreeIcon,
} from '@vicons/fluent'
import { LogoGithub } from '@vicons/ionicons5'

import { algorithmOptions, createMachine } from './logic'
import { computed, ref } from 'vue'

const machine = createMachine()

const resetButtonType = computed<ButtonTypeType>(() => {
  return machine.hasWinner || !machine.hasSpace ? 'primary' : 'default'
})

const enableAINext = computed(() => {
  return machine.hasSpace && !machine.hasWinner
})

const showSearchTree = ref(false)
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

.github-link {
  position: absolute;
  bottom: 12px;
  left: 12px;
  font-family: 'Courier New', Courier, monospace;
}

.github-link a {
  color: gray;
}
</style>
