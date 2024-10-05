import { useState } from 'react'



const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const CreateRandomInt = (max) => {
  return (
    Math.floor(Math.random() * max)
    
  )
}
 
const MostVotes = ({votes, anecdotes}) => {

  let maxVotes = 0
  let maxIndex = 0
  
  votes.forEach((value, index) => {
    if (value > maxVotes) {
      maxVotes = value
      maxIndex = index
      
    }
  })  
  
  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[maxIndex]}<br></br>
      has {maxVotes} votes
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  

  const handleNextClick = () => {

    const randomInt = CreateRandomInt(anecdotes.length)
    setSelected(randomInt)
  }

  const handleVoteClick = () => {
    const copy = [...votes]  
    copy[selected] += 1
    setVotes(copy)

  }
   


  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br></br>
      has {votes[selected]} votes<br></br>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextClick} text="next" />
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App
