const router = new VueRouter({
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  data: {
    name: 'QUIZ',
    quiz: [],
    questionNumber: 0,
    showResults: false,
    results: [],
    //quizKeyUrl: 'https://fierce-everglades-50669.herokuapp.com/',
    quizKeyUrl: 'http://localhost:5000/',
    retry: false,
    userAnswers: []

  },
  mounted() {
    console.log('mounted')
    console.log('url parameters', this.$route.query)
    let parameters = this.$route.query.courseId + '/' + this.$route.query.lessonId + '.json';
    let email = this.$route.query.email
    console.log('courseId & lessonId', parameters)
    console.log('email', email)
    axios.get('https://s3.us-east-2.amazonaws.com/mlcrunch-quiz/' + parameters, {
        crossdomain: true,
      })
      .then(response => {
        console.log('response', response.data)
        this.quiz = response.data.data
        console.log('this.quiz ', this.quiz)
        console.log('this.quiz.length ', this.quiz.length)
        this.shuffleQuiz();
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    shuffleQuiz() {
      // First shuffle quiz questions
      this.quiz = this.quiz.sort(function () {
        return .5 - Math.random();
      });

      // Then Shuffle Quiz options 
      this.quiz.options = this.quiz.forEach(quiz => {
        quiz.options.sort(function () {
          return .5 - Math.random();
        });
      });
      console.log(' this.quiz ', this.quiz)
    },
    userAnswer(answer, questionNumber, id,question) {
      console.log('userAnswer....', answer, questionNumber, id,question)
      let userAnswer = {
        id: id,
        answer: answer,
        question: question,
        questionNumber: questionNumber
      }
      this.userAnswers.push(userAnswer)
      console.log('userAnswers', this.userAnswers)
      if (questionNumber === this.quiz.length - 1) {
        console.log('Need to show Results page')
        this.correctQuiz();
      } else {
        console.log('still questions are left in quiz')
        this.questionNumber++;
      }
      
    },
    reTake() {
      location.reload();
    },
    completed() {
      console.log('user cleared the quiz without any errors')
    },
    correctQuiz() {
      // call web service with userAnswers get results
      this.userAnswers.map((answer) => {
        answer.result = true
      })
      this.showResults = true;
      console.log('correctQuiz results',   this.userAnswers)

    /*   axios.get(this.quizKeyUrl, {
          crossdomain: true,
          params: {
            userAnswers: this.userAnswers
          }
        }).then(response => {
         this.userAnswers.map(answer => {
           answer.result = true
         })
         console.log('this.userAnswers', this.userAnswers)
        this.showResults = true;
        }).catch(error => {
          console.log(error);
        }); */
    }
  }

});