<template>
  <div class="main">
    <p>
      <font-awesome-icon :icon="['fab', 'github-alt']" />Repositórios
    </p>
    <form>
      <input placeholder="Adicionar Repositório" v-model="newRepo" />
      <button type="submit" @click.prevent="send">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
    </form>
    <ul id="repo-list">
      <li v-for="repo in repos" :key="repo.name">
        <span>{{ repo.name }}</span>
        <router-link :to="{ name: 'Repository', params: { name: repo.name } }">Detalhes</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  name: "Main",

  data() {
    return {
      repos: [],
      newRepo: ""
    };
  },

  created() {
    const repositories = localStorage.getItem("repositories");

    if (repositories) {
      this.repos = JSON.parse(repositories);
    }
  },

  methods: {
    async send(e) {
      e.preventDefault();
      if (this.newRepo !== "") {
        const response = await api.get(`/repos/${this.newRepo}`);

        const data = {
          name: response.data.full_name
        };

        this.repos = [...this.repos, data];

        localStorage.setItem("repositories", JSON.stringify(this.repos));
      }
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

form {
  margin-top: 30px;
  display: flex;

  button {
    display: flex;
    background: green;
    margin-left: 10px;

    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;

    svg {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    &:disabled {
      /* &[disabled] { */
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input {
    flex: 1;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;

    border: 1px solid #eee;
  }
}

p {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: black;

  svg {
    margin-right: 10px;
  }
}

h1 {
  font-size: 20px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
}

ul {
  list-style-type: none;
  margin-top: 30px;

  li {
    display: flex;
    justify-content: space-between;

    span {
      color: #000;
      font-size: 14px;
    }

    a {
      color: green;
      font-size: 14px;
    }
  }
}
</style>
