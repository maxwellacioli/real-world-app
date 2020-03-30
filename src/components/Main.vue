<template>
  <div class="main">
    <p>
      <font-awesome-icon :icon="['fab', 'github-alt']" />Repositórios
    </p>
  </div>
</template>

<script>
export default {
  name: "Main",

  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
}

p {
  color: black;
}

h1 {
  font-size: 20px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
}
</style>
