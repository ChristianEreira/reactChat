import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const SearchBar = ({ setSearchTerm }) => {
    return (
        <div className="search">
            <FontAwesomeIcon icon={solid('search')} className="fa-search" />
            <input type="text" id="userSearch" placeholder="Search" onInput={(e) => { setSearchTerm(e.target.value) }} />
        </div>
    )
};

export default SearchBar;