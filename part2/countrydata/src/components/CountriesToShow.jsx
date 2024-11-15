import Country from "./Country"
import CountryInfo from "./CountryInfo"

const CountriesToShow = ({ countriesToShow, setNewFilter }) => {
    if (countriesToShow.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countriesToShow.length === 1) {
        return (
            <CountryInfo
                country={countriesToShow[0]}
            />
        )
    } else if (countriesToShow.length < 11) {
        return (
            countriesToShow.map((country) => (
                <Country
                    key={country.name.official}
                    country={country}
                    setNewFilter={setNewFilter}
                />
            )
        ))
    }
}

export default CountriesToShow