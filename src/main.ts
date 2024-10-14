import { createApp } from 'vue'
import App from './App.vue'

import { NModalProvider } from 'naive-ui'
import { h } from 'vue'

createApp(() => h(NModalProvider, null, { default: () => h(App) })).mount(
  '#app',
)
