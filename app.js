new Vue({
  el: '#app',
  data: {
    name:'QUIZ',
    quiz: [],
    questionNumber: 0,
    showResults: false,
    results: []
  },
  mounted () {
    console.log('mounted')
    axios.get('https://raw.githubusercontent.com/raja0612/Jack-VUEJS-Work/master/app.json',
    {crossdomain: true})
    .then(response => {
      console.log('response', response.data)
      this.quiz = response.data.data
      console.log('this.quiz ', this.quiz)
      console.log('this.quiz.length ', this.quiz.length)
    })
    .catch(error => {
      console.log(error);
    });
  },
  methods : {
    userAnswer (answer, questionNumber, question){
      console.log('userAnswer....', answer, questionNumber,question)
      console.log('userAnswers....', this.userAnswers)
      if (questionNumber === this.quiz.length-1){
         console.log('Need to show Results page')
         this.showResults = true
      } else {
        console.log('still questions are left in quiz')
        this.questionNumber++
      }

      if (answer === this.quiz[questionNumber].answer) {
         console.log('user answer is correct')
         let result = {
           'questionNumber': questionNumber,
           'question': question,
           'userAnswer': answer,
           'result': true
         }
         this.results.push(result)
      } else {
        console.log('user answer is not correct')
        let result = {
          'questionNumber': questionNumber,
          'question': question,
          'userAnswer': answer,
          'result': false
        }
        this.results.push(result)
      }

      console.log('results...', this.results)

    }
  }
});