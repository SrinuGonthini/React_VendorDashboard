import { Link } from "react-router-dom"

const Sidebar = () => {
    const venId = localStorage.getItem('vendorId')
    return(
        <>
            <nav className="Sidebar">
                <ul>
                    <li>
                        <Link to='/home'>Home</Link>
                    </li>
                    <li>
                        <Link to='/restaurant/add'>Add Restaurant</Link>
                    </li>
                    <li>
                        <Link to={`/restaurant/vendor/${venId}`}>View Restaurants</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidebar