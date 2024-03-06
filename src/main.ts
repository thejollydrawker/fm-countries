import './main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)




export const VOnClickOutside = {
    mounted: function (element: any, binding: any) {
      element.clickOutsideEvent = function (event: any) {
        const excludeComponent = document.getElementById(binding.arg)
  
        if (
          !(element == event.target || element.contains(event.target)) &&
          !(
            excludeComponent &&
            (event.target == excludeComponent || excludeComponent.contains(event.target))
          )
        ) {
          binding.value(event, element)
        }
      }
      document.addEventListener('click', element.clickOutsideEvent)
    },
    unmounted: function (element: any) {
      document.removeEventListener('click', element.clickOutsideEvent)
    }
  }

  app.directive('outside', VOnClickOutside);
  app.mount('#app')
