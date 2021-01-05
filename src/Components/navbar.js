import '../css/navbar.css';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../Context/auth";
import Axios from 'axios';

function Navbar(props) {
    const { isLoggedIn } = props;
    let history = useHistory();
    let existingToken, existingId;
    if (isLoggedIn) {
        existingToken = JSON.parse(localStorage.getItem(process.env.REACT_APP_MY_LOCAL_STORAGE)).token;
        existingId = JSON.parse(localStorage.getItem(process.env.REACT_APP_MY_LOCAL_STORAGE)).id;
    }
    const handleDeconnexion = async () => {
        await Axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/logout/${existingToken}/${existingId}`)
            .then(data => {
                if (data.data.result.status === 'done') {
                    localStorage.clear();
                    history.go(0)
                }
            })
            .catch(err => console.log(err))
    };


    return !console.log(isLoggedIn) && (
        <div>
            <header>
                <h1 className="titleHeader">Messagerie Kwick</h1>
                <nav className="navMenu">
                    <ul className="navLinks">
                        {isLoggedIn ?
                            <>
                                <Link to='/'>
                                    <li id="messages">Messages</li>
                                </Link>
                                <Link to='/login' onClick={handleDeconnexion}>
                                    Se déconnecter
                                </Link>
                            </> :
                            <>
                                <Link to='/signup'>
                                    <li>S'inscrire</li>
                                </Link>
                                <Link to='/login'>
                                    <li>Se connecter</li>
                                </Link>
                            </>
                        }
                    </ul>
                </nav>
            </header>
        </div >
    );
}

export default Navbar;
