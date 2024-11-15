const Filter = (props) => {
    console.log(props)
    return (
        <form>
            <div>
            find countries: <input
                        value={props.newFilter}
                        onChange={props.handleFilterChange} />
            </div>
        </form>
    )
}

export default Filter
