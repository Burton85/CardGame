<template>
  <div class="alert">
    <h3 class="heading-third">{{msg}}</h3>
    <a href="./" class="btn btn-big btn-white">restart</a>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    msg: String
  }
};
</script>
