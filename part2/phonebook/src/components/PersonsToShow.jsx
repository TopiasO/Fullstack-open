import personFilter from "./PersonFilter"
import Person from "./Person"

const PersonsToShow = ({persons, newSearch}) => {

    const personsToShow = personFilter(persons, newSearch)

    return (
        <div>
            {personsToShow.map(person =>
            <Person key={person.id} person={person} />
        )}
        </div>
    )
}

export default PersonsToShow