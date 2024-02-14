<script lang="ts" setup>
const IconDark = resolveComponent('IconDark')
const IconLight = resolveComponent('IconLight')
const IconSystem = resolveComponent('IconSystem')

const colorMode = useColorMode()
// $colorMode.preference = color
const handleColorModeChange = () => {
  if(colorMode.preference === 'light'){
    colorMode.preference = 'dark'
  }else if(colorMode.preference === 'dark'){
    colorMode.preference = 'system'
  }else{
    colorMode.preference = 'light'
  }
  
}

</script>

<template>
  <div>
    <component class="cursor-pointer" :is="$colorMode.preference === 'light' ? IconDark :  $colorMode.preference === 'dark' ? IconSystem : IconLight" @click="handleColorModeChange" />
  </div>
</template>

<style scoped></style>
