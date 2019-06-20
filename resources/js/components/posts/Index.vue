<template>
  <div class="home">
    <div v-for="post in posts" class="bs-callout bs-callout-danger">
        <h4><router-link :to="{name: 'posts', params: {id: post.id}}">{{post.title}}</router-link></h4>
        <p>{{post.body}}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  mounted() {
      axios.get('/api/Posts').then(response => {
          this.posts = response.data.data
      });
  },
  data() {
      return {
          posts : []
      }
  }
}
</script>
