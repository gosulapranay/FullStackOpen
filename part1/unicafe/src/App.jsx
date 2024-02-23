import { useState } from 'react'

const Header = props => <h1>{props.name}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({clicks}) => {
  const total = clicks.good + clicks.neutral + clicks.bad
  const average = (clicks.good * 1 + clicks.bad * -1) / total
  const positive = `${(clicks.good /total)*100} %`

  if (total === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={clicks.good} />
          <StatisticLine text="neutral" value={clicks.neutral} />
          <StatisticLine text="bad" value={clicks.bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () =>
    setClicks({...clicks, good: clicks.good + 1})

  const handleNeutralClick = () =>
    setClicks({...clicks, neutral: clicks.neutral + 1})

  const handleBadClick = () =>
    setClicks({...clicks, bad: clicks.bad + 1})

  return (
    <div>
      <Header name="Give Feedback" />
      <Button onClick={handleGoodClick} text='Good' />
      <Button onClick={handleNeutralClick} text='Neutral' />
      <Button onClick={handleBadClick} text='Bad' />
      <Header name="Statistics" />
      <Statistics clicks={clicks} />
    </div>
  )
}

export default App