<template>
  <div class="main">
    <h1>{{ repo.name }}</h1>
  </div>
</template>

<script>
//import api from "../services/api";

export default {
  name: "Main",

  data() {
    return {
      issues: [],
      repo: {}
    };
  },

  created() {
    const repoName = this.$route.params.name;

    this.repo = {
      name: repoName
    };
  },

  methods: {
    async send(e) {
      e.preventDefault();
    }
  },

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

h1 {
  color: black;
}
</style>
