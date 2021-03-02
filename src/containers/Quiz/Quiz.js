import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import QuizFinished from  '../../components/QuizFinished/QuizFinished'

import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {fetchQuizById,quizAnswerClick,retryQuiz} from '../../redux/actions/quiz'


class Quiz extends Component {
  
    

componentDidMount(){
  this.props.fetchQuizById(this.props.match.params.id) 
}
componentWillUnmount(){
  this.props.retryQuiz()
}
  render() {
    console.log(this.props)
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {
          this.props.loading || !this.props.quiz 
          ?<Loader/>
          :this.props.isFinished
          ?<QuizFinished
            results={this.props.results}
            quiz = {this.props.quiz}
            onRetry ={this.props.retryQuiz}
          />
          :<ActiveQuiz
          answers={this.props.quiz[this.props.activeQuestion].answers}
          question={this.props.quiz[this.props.activeQuestion].question}
          onAnswerClick={this.props.quizAnswerClick}
          quizLength={this.props.quiz.length}
          answersNumder={this.props.activeQuestion+1}
          state={this.props.answerState}
        />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    activeQuestion: state.quiz.activeQuestion,
    results: state.quiz.results, 
    loading:state.quiz.loading,
    isFinished:state.quiz.isFinished,
    answerState:state.quiz.answerState,
    quiz: state.quiz.quiz
  }
}
function mapDispatchToProps(dispatch){
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Quiz)