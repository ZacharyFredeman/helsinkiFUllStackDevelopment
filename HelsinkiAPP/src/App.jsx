
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course} />
      <Content2 exercise1 = {part1} amount1 = {exercises1} exercise2 = {part2} amount2 = {exercises2} exercise3 = {part3} amount3 = {exercises3} />
      <Total total = {exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

const Header = (props) =>{
  console.log (props.course)
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
