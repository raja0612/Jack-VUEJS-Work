new Vue({
  el: '#app',
  data: {
    name: 'QUIZ',
    quiz: [],
    questionNumber: 0,
    showResults: false,
    results: [],
    quizKeyUrl: 'https://fierce-everglades-50669.herokuapp.com/',
    //quizKeyUrl: 'http://localhost:5000/',
    retry: false
  },
  mounted() {
    console.log('mounted')
    axios.get('https://raw.githubusercontent.com/raja0612/Jack-VUEJS-Work/master/quiz.json', {
        crossdomain: true
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
      this.quiz.options  = this.quiz.forEach(quiz => {
        quiz.options.sort(function () {
          return .5 - Math.random();
        });
      });
      console.log(' this.quiz ',  this.quiz )
    },
    userAnswer(answer, questionNumber, id, question) {
      console.log('userAnswer....', answer, questionNumber, id, question)
      console.log('userAnswers....', this.userAnswers)
      if (questionNumber === this.quiz.length - 1) {
        console.log('Need to show Results page')
        this.showResults = true;
      } else {
        console.log('still questions are left in quiz')
        this.questionNumber++;
      }

      axios.get(this.quizKeyUrl + id + '/' + answer, {
          crossdomain: true,
        })
        .then(response => {
          console.log('response', response.data)
          if (response.data) {
            let result = {
              'questionNumber': questionNumber,
              'question': question,
              'userAnswer': answer,
              'result': response.data
            }
            this.results.push(result)
          } else {
            // show retry button if user gets wrong answer
            this.retry = true;
            let result = {
              'questionNumber': questionNumber,
              'question': question,
              'userAnswer': answer,
              'result': false
            }
            this.results.push(result)

          }
        })
        .catch(error => {
          console.log(error);
        });
      console.log('results...', this.results)

    },
    reTake() {
      location.reload();
    }
  }

});