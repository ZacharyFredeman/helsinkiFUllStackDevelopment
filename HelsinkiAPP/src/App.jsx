
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course = {course} />
      <Content2 parts = {parts} />
      <Total total = {parts}/>
    </div>
  )
}

const Header = (props) =>{
  return(
  <div>
    <p>{props.course}</p>
  </div>
  )
}

const Content2 = (props) => {
  console.log(props.parts[0])
  return (
    <div>
      <Part exercise = {props.parts[0].name} amount = {props.parts[0].exercises} />
      <Part exercise = {props.parts[1].name} amount = {props.parts[1].exercises}/>
      <Part exercise = {props.parts[2].name} amount = {props.parts[2].exercises}/>
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
  return(
  <div>
     <p>Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises} </p>
  </div>
  )
}

export default App
