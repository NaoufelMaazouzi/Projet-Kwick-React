import '../css/navbar.css';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

function Navbar(props) {
    const { token, id } = props;
    let history = useHistory();

    /*Method to handle the deconnexion & clear the localStorage*/
    const handleDeconnexion = async () => {
        await Axios.get(`${process.env.REACT_APP_API_URL}logout/${token}/${id}`)
            .then(data => {
                if (data.data.result.status === 'done') {
                    localStorage.clear();
                    history.go(0)
                }
            })
            .catch(err => console.log(err))
    };

    return (
        <div>
            <header>
                <nav className="navMenu">
                    <ul className="navLinks">
                        {token ?
                            <>
                                <Link to='/' className="Link">
                                    <li id="messages">Messages</li>
                                </Link>
                                <Link to='/login' onClick={handleDeconnexion} className="Link">
                                    Se déconnecter
                                </Link>
                            </> :
                            <>
                                <Link to='/signup' className="Link">
                                    <li>S'inscrire</li>
                                </Link>
                                <Link to='/login' className="Link">
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
