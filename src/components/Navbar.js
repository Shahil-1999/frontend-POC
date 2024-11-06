import { deleteAccount } from './common';
import './Navbar.css'
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar(props) {
    const navigate = useNavigate()
    let location = useLocation()
    const userName = localStorage.getItem("userName")
    const userRole = localStorage.getItem("userRole")
    const token = localStorage.getItem('token')

    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">frontend-POC-react </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse txt_decor" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                            </li>

                            <ul className="navbar-nav">
                                {userRole === 'ADMIN' && (
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`} to="/admin">
                                            Admin
                                        </Link>
                                    </li>
                                )}
                            </ul>
                            {token && <>

                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/Post" ? "active" : ""}`} to="/Post">Post</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/PostFeed" ? "active" : ""}`} to="/PostFeed">PostFeed</Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        User Post
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/OwnPost">Own Post</Link></li>
                                        <li><Link className="dropdown-item" onClick={() => deleteAccount(navigate)} to="/">Delete Account</Link></li>
                                    </ul>
                                </li>
                            </>
                            }

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/userLogin" ? "active" : ""}`} to={userName ? '/Profile' : '/UserLogin'}>{userName ? userName : 'Login'}</Link>
                            </li>

                            <li className="nav-item">
                                {!userName && <Link className={`nav-link ${location.pathname === "/userDetails" ? "active" : ""}`} to="/UserDetails">Sign In</Link>}
                            </li>

                            <li className="nav-item">
                                {userName && <Link className={`nav-link ${location.pathname === "/Logout" ? "active" : ""}`} to="/Logout">Logout</Link>}
                            </li>

                            <li className="nav-item">
                                {userName && <Link className={`nav-link ${location.pathname === "/ImageUpload" ? "active" : ""}`} to="/ImageUpload">Profile Image</Link>}
                            </li>

                        </ul>
                        <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                            <input className="form-check-input " onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{props.checkBtn}</label>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}



export default Navbar

