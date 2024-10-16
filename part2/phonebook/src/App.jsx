import { useState } from 'react'
import sameName from './components/SameName'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PersonsToShow from './components/PersonsToShow'
 

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)


  }


  const addPerson = (event) => {
    event.preventDefault()


    if (sameName(persons, newName)) {
      alert(`${newName} is already added to phonebook`)
      return;

    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }





  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} 
      handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName}
      handleNameChange={handleNameChange} newNumber={newNumber}
      handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonsToShow persons={persons} newSearch={newSearch} />
    </div>
  )
}

export default App
