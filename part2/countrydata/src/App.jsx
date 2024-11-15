import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import CountriesToShow from './components/CountriesToShow'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const countriesToShow = countries.filter((countries) =>
    countries.name.common.toLowerCase().includes(newFilter.toLowerCase())
  )

  useEffect(() => {
    console.log('effect run, countries length is now', countries.length)
    
    if (countries) {
      countryService
        .getAll()
        .then(allCountries => {
          setCountries(allCountries)
        })
    }
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  return (
    <div>
      <Filter new Filter={newFilter} handleFilterChange={handleFilterChange} />
      <CountriesToShow countriesToShow={countriesToShow} setNewFilter={setNewFilter}/>
    </div>
  )
}

export default App