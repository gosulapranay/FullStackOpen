import { useState } from 'react'

const Header = ({name}) => <h2>{name}</h2>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({text, votesCount}) =>
  <div>
    <p>{text}</p>
    <p>has {votesCount} votes</p>
  </div>

const Winner = ({anecdotes, allVotes}) => {
  const maxVoteCount = Math.max(...allVotes)
  const winnerIndex = allVotes.indexOf(maxVoteCount)
  const winnerAnecdote = anecdotes[winnerIndex]
  if (maxVoteCount === 0) {
    return (
      <p>No votes yet</p>
      )
    }
    
    return (
      <div>
      <p>{winnerAnecdote}</p>
      <p>has {maxVoteCount} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState(Array(anecdotes.length).fill(0))

  const handleVoteClick = () => {
    const newVotes = [...allVotes]
    newVotes[selected] += 1
    setAllVotes(newVotes)
  }
  
  const handleAnecdoteClick = () => {
    const index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }
  
  return (
    <div>
      <Header name="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votesCount={allVotes[selected]} />
      <Button onClick={handleVoteClick} text="vote"/>
      <Button onClick={handleAnecdoteClick} text="next anecdote"/>
      <br/>
      <br/>
      <Header name="Anecdote with most votes" />
      <Winner anecdotes={anecdotes} allVotes={allVotes} />
    </div>
  )
}

export default App