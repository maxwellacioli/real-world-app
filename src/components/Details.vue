<template>
  <div class="main">
    <img :src="repo.img" />
    <h1>{{ repo.name }}</h1>
    <ul id="issues">
      <li v-for="issue in issues" :key="issue.id.toString()">
        {{ issue.title }}
      </li>
    </ul>
    <div class="page">
      <button v-on:click="handlePage('back')">Anterior</button>
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
      api.get(`repos/${repoName}/issues`,
        {
          params: {
            per_page: 5,
            page: this.page,
          }
        }
      )
    ]);
    
    this.repo = {
      name: repoName,
      data: repoResp.data,
      img: repoResp.data.owner.avatar_url
    };

    this.issues = issuesResp.data;
  },

  methods: {
    async send(e) {
      e.preventDefault();
    },

    async handlePage(action) {
      if(action === 'next') {
        this.page++;
      } else {
        if(this.page > 1) {
          this.page--;
        }
      }
      
      this.handleIssues();

      console.log(this.issues);
    },

    async handleIssues() {
      const response = await api.get(`repos/${this.repo.name}/issues`,
        {
          params: {
            per_page: 5,
            page: this.page,
          }
        }
      );

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
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  img {
    padding: 20px;
    width: 200px;
    border-radius: 100px;
  }
}

ul {
  color: black;
  
  li {
    list-style-type: none;
  }
}

.page {
  display: flex;
  justify-content: space-between;

  button {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    border: 0;
    color: #fff;
    background: green;
    font-weight: bold;
  }
}

h1 {
  color: black;
}
</style>
