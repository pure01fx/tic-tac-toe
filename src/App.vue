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
        <n-layout-header>井字棋</n-layout-header>
        <n-layout has-sider style="align-items: stretch">
          <n-layout-content
            content-style="padding: 24px;"
            content-class="center-content"
          >
            <PuzzleComponent />
          </n-layout-content>
          <n-layout-sider content-style="padding: 24px;">
            海淀桥
          </n-layout-sider>
        </n-layout>
      </n-layout>
    </div>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutSider, NLayoutContent } from 'naive-ui'
import PuzzleComponent from './components/PuzzleComponent.vue'
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
