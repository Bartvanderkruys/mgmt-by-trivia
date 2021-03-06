import Ember from 'ember';

export default Ember.Component.extend({
    question: null,
    shuffledAnswers: [],
    correctAnswer: null,
    answeredCorrectly: false,
    answeredIncorrectly: false,
    questionIndex: null,

    init(){
        this._super();

        this.set('correctAnswer', this.question.getProperties('correct_answer').correct_answer);

        let answers = this.question.getProperties('incorrect_answers').incorrect_answers;
        let taggedAnswers = [];

        for (let answer of answers){
            taggedAnswers.push({isCorrect: false, answer: answer});
        }

        taggedAnswers.push({
            isCorrect: true,
            answer: this.get('correctAnswer')
        });

        this.shuffledAnswers = this.fyShuffle(taggedAnswers);
    },

    fyShuffle(array) {
        let counter = array.length;

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);

            counter--;

            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    },

    actions: {
        answerQuestion(isCorrect) {
            if (isCorrect) {
                this.set('answeredCorrectly', true);
                this.get('onAnswerQuestion')(true, this.get('questionIndex'));
            } else {
                this.set('answeredIncorrectly', true);
                this.get('onAnswerQuestion')(false, this.get('questionIndex'));
            }
        }
    }
});
