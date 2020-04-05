<template>
  <div class="main">
    <router-link :to="{ name: 'Home' }">Voltar</router-link>
    <img :src="repo.img" />
    <h1>{{ repo.name }}</h1>
    <hr />
    <ul id="issues">
      <li v-for="issue in issues" :key="issue.id.toString()">
        <img :src="issue.user.avatar_url" />
        <span>{{ issue.title }}</span>
      </li>
    </ul>
    <div class="page">
      <button v-on:click="handlePage('back')" :disabled="this.page < 2">Anterior</button>
      <span>Página {{this.page}}</span>
      <button v-on:click="handlePage('next')">Próxima</button>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  name: "Main",

  data() {
    return {
      issues: [],
      repo: {},
      page: 1
    };
  },

  async created() {
    const repoName = this.$route.params.name;

    const [repoResp, issuesResp] = await Promise.all([
      api.get(`repos/${repoName}`),
      api.get(`repos/${repoName}/issues`, {
        params: {
          per_page: 5,
          page: this.page
        }
      })
    ]);

    this.repo = {
      name: repoName,
      data: repoResp.data,
      img: repoResp.data.owner.avatar_url
    };

    this.issues = issuesResp.data;
  },

  methods: {
    async handlePage(action) {
      if (action === "next") {
        this.page++;
      } else {
        if (this.page > 1) {
          this.page--;
        }
      }

      this.handleIssues();

      console.log(this.issues);
    },

    async handleIssues() {
      const response = await api.get(`repos/${this.repo.name}/issues`, {
        params: {
          per_page: 5,
          page: this.page
        }
      });

      this.issues = response.data;
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
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
  color: #000;
}

a {
  text-decoration: none;
  font-size: 18px;
  color: green;
}

div > img {
  padding: 20px;
  width: 200px;
  height: 200px;
  border-radius: 100px;
}

hr {
  margin-top: 20px;
  border: 0px;
  border-top: 1px solid #eee;
}

ul {
  color: black;
  width: 100%;
  margin: 30px 0px;

  li {
    display: flex;
    align-items: center;

    padding: 15px 30px;
    border: 1px solid #eee;
    border-radius: 5px;
    list-style-type: none;
    margin-bottom: 10px;

    img {
      margin-right: 10px;
      width: 40px;
      border-radius: 20px;
    }

    span {
      color: #404040;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.page {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: #000;

  button {
    width: 100px;
    height: 50px;
    border-radius: 5px;
    border: 0;
    color: #fff;
    background: green;
    font-weight: bold;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

h1 {
  color: black;
}
</style>
