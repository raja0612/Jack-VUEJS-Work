new Vue({
  el: '#app',
  data: {
    name:'QUIZ',
    quiz: [],
    questionNumber: 0,
    userAnswers: []
  },
  mounted () {
    console.log('mounted')
    axios.get('https://raw.githubusercontent.com/raja0612/Jack-VUEJS-Work/master/app.json',
    {crossdomain: true})
    .then(response => {
      console.log('response', response.data)
      this.quiz = response.data.data
      console.log('this.quiz ', this.quiz)
    })
    .catch(error => {
      console.log(error);
    });
  },
  methods : {
    userAnswer (answer, questionNumber){
      console.log('userAnswer....', answer, questionNumber)
      this.userAnswers.push(answer)
      console.log('userAnswers....', this.userAnswers)
      this.questionNumber++
    }
  }
});