<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import '@/assets/scss/main.scss'

UIkit.use(Icons)

export default {
  name: 'App'
}
</script>