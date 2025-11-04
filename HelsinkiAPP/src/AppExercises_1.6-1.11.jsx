import { useState, useEffect } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  var total = 0;
  total = good + neutral+bad
  return (
    <div>
      <Header header = 'give feedback'/>
      <Button onClick = {()=> setGood(good + 1)} text="good"/>
      <Button onClick = {()=> setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick = {()=> setBad(bad + 1)}  text="bad"/>
      
      <Header header='statistics' />
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
      

    </div>
  )
}
 
const Statistics = (props)=>{
  var total = 0;
  total = props.good + props.neutral + props.bad
  if(total <= 0){
    return(
      <p>
        No feedback given
      </p>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticsLine statName="good" statValue={props.good}/>
        <StatisticsLine statName="neutral" statValue={props.neutral}/>
        <StatisticsLine statName="bad" statValue={props.bad}/>
        <StatisticsLine statName="all" statValue={total}/>
        <StatisticsLine statName="average" statValue={((props.good) + (props.bad * -1)) / total}/>
        <StatisticsLine statName="positive" statValue={(props.good / total) * 100} statSymbol = '%'/>
      </tbody>
    </table>
  )
}

const StatisticsLine = (props)=>{
  return(
    <tr>
      <td>{props.statName}</td>
      <td>{props.statValue}</td>
      <td>{props.statSymbol}</td>
    </tr>
  )
}

const Header = (props) =>{
  return(
  <div>
    <h1>{props.header}</h1>
  </div>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

export default App