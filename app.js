

new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
    },
    created () {
      console.log('created')
      this.loadQuiz();
    },
    methods: {
      loadQuiz () {
        fetch('https://github.com/raja0612/Jack-VUEJS-Work/blob/master/app.json',{mode: 'no-cors'})
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          console.log(JSON.stringify(myJson));
        });
      }
    }
})