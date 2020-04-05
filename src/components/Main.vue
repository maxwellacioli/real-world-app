<template>
  <div class="main">
    <p><font-awesome-icon :icon="['fab', 'github-alt']" />Repositórios</p>
    <form>
      <div>
        <input
          placeholder="Adicionar Repositório"
          v-model="newRepo"
          v-bind:class="{ 'input-error': error }"
          v-on:click="handleInput()"
        />
        <button
          type="submit"
          @click.prevent="send"
          :disabled="loading || newRepo === ''"
        >
          <font-awesome-icon :icon="['fas', 'plus']" v-if="!loading" />
          <font-awesome-icon
            :icon="['fas', 'circle-notch']"
            v-else
            v-bind:class="{ 'icon-rotation': loading }"
          />
        </button>
      </div>
      <span v-if="error">Repositório não encontrado!</span>
      <span v-if="exists">Repositório já existe!</span>
    </form>
    <ul id="repo-list">
      <li v-for="(repo, index) in repos" :key="repo.name">
        <span>{{ repo.name }}</span>
        <div>
          <router-link :to="{ name: 'Repository', params: { name: repo.name } }"
            >Detalhes</router-link
          >
          <button @click="handleRemove(index)">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>
        </div>
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
      newRepo: "",
      loading: false,
      error: false,
      exists: false
    };
  },

  watch: {
    repos: function(newRepos) {
      localStorage.setItem("repositories", JSON.stringify(newRepos));
    }
  },

  created() {
    const repositories = localStorage.getItem("repositories");

    if (repositories) {
      this.repos = JSON.parse(repositories);
    }
  },

  methods: {
    handleInput() {
      this.error = false;
      this.exists = false;
    },

    handleRemove(index) {
      this.repos.splice(index, 1);
    },

    async send(e) {
      e.preventDefault();

      if (this.newRepo !== "") {
        const exists = this.repos.find(r => r.name === this.newRepo);

        if (!exists) {
          this.loading = true;

          try {
            const response = await api.get(`/repos/${this.newRepo}`);

            const data = {
              name: response.data.full_name
            };

            this.repos = [...this.repos, data];

            this.newRepo = "";
          } catch (error) {
            this.error = true;
          } finally {
            this.loading = false;
          }
        } else {
          this.exists = true;
        }
      }
    }
  },

  props: {}
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
  flex-direction: column;

  div {
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

  span {
    margin-top: 10px;
    color: red;
    font-size: 14px;
  }
}

.input-error {
  border: 1px solid red;
}

.icon-rotation {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
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
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    border: 1px solid #eee;

    span {
      color: #000;
      font-size: 14px;
    }

    div {
      a {
        text-decoration: none;
        color: green;
        font-size: 14px;
      }

      button {
        padding: 5px 5px;
        margin-left: 10px;
        border-radius: 3px;
        border: 1px solid #eee;
        background: green;
        color: #fff;

        &:hover {
          cursor: pointer;
        }
      }
    }

    & + li {
      margin-top: 20px;
    }
  }
}
</style>
