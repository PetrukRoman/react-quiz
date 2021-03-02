import React from 'react'
import classes from './QuizFinished.module.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const QuizFinished = props =>{
const successCount = Object.keys(props.results).reduce((total,key)=>{
if(props.results[key] === 'success'){
  total++
}
return total
},0)

return(
  <div className={classes.QuizFinished}>
  <ul>
   
    {props.quiz.map((quizItem, index )=>{
       console.log(props.results[quizItem.id])
      const cls=[
        'fa',
        props.results[quizItem.id] === 'error' ? 'fa-times' :'fa-check ',
        classes[props.results[quizItem.id]]
       ]
     return (
       <li key={index}
       >
         <strong>{index + 1}</strong>. &nbsp;
         {quizItem.question}
         <i className={cls.join(' ')}/>
       </li>
     )

    })}
    
  </ul>
  <p>Правильно {successCount} из {props.quiz.length}</p>
  <div>
  <Button onClick={props.onRetry}> Повторить </Button>
  <Link to='/'>
  <Button type="success"> Перейти к списку тестов </Button>
  </Link>
  </div>
  
</div>
)
  
}

export default QuizFinished