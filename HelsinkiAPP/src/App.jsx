
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    
  ]
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course} />
      <Content2 exercise1 = {part1.name} amount1 = {part1.exercises} exercise2 = {part2.name} amount2 = {part2.exercises} exercise3 = {part3.name} amount3 = {part3.exercises} />
      <Total total = {part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

const Header = (props) =>{
  console.log (props)
  return(
  <div>
    <p>{props.course}</p>
  </div>
  )
}

const Content = (props) =>{
  return(
  <div>
    <p>{props.exercise} {props.amount}</p>
  </div>
  )
}

const Content2 = (props) => {
  console.log(props)
  return (
    <div>
      <Part exercise = {props.exercise1} amount = {props.amount1} />
      <Part exercise = {props.exercise2} amount = {props.amount2}/>
      <Part exercise = {props.exercise3} amount = {props.amount3}/>
    </div>
  )
}

const Part = (props) =>{
  return(
    <div>
      <p>{props.exercise} {props.amount}</p>
    </div>
  )
}

const Total = (props) =>{
  console.log (props.total)
  return(
  <div>
     <p>Number of exercises {props.total} </p>
  </div>
  )
}

export default App
