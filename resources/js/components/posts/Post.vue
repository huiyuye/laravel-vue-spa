<template>
  <div class="home">
    <div class="bs-callout bs-callout-danger">
        <h4>{{post.title}}</h4>
        <p>{{post.body}}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  mounted() {
      axios.get('/api/Posts/'+this.$route.params.id).then(response => {
          this.post = response.data
      });
  },
  data() {
      return {
          post: {}
      }
  }
}
</script>
