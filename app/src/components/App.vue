<template lang="pug">
  .wrap
    Greeting(:greeting="greeting")
    
</template>

<script>
import Greeting from './Greeting.vue';

export default {
  data: function() {
    return {
      greeting: 'HELLO! CRAZY WORLD!!!'
    }
  },
  components: {
    Greeting
  }
}
</script>

<style lang="sass">

</style>