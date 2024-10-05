import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const StatisticsLine = ({text, value}) => {

  if (text === "positive") {
    return (
      <tr>
      <td>{text}</td>
      <td>{value} %</td>
    </tr>
    )
  }
  
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = ({good, bad, neutral}) => {

  if (good + bad + neutral === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }


  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good + bad + neutral} />
        <StatisticsLine text="average" value={(good*1 + bad*(-1)) / (good + bad + neutral)} />
        <StatisticsLine text="positive" value={(good / (good + bad + neutral) * 100)} />
        </tbody>
      </table>
    </div>
      
 

  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>

  )
}

export default App
