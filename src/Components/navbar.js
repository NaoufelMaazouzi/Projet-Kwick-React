import '../css/navbar.css';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

function Navbar(props) {
    const { token, id } = props;
    let history = useHistory();

    /*Function to handle the deconnexion & clear the localStorage*/
    const handleDeconnexion = async () => {
        await Axios.get(`${process.env.REACT_APP_API_URL}logout/${token}/${id}`)
            .then(data => {
                if (data.data.result.status === 'failure') {
                    throw new Error();
                }
                localStorage.clear();
                history.go(0);
            })
            .catch(e => {
                /*console.log(e);*/
            })
    };

    return (
        <div>
            <header>
                <nav className="navMenu">
                    <ul className="navLinks">
                        {token ?
                            <>
                                <Link to='/Projet-Kwick-React' className="Link">
                                    <li id="messages">Messages</li>
                                </Link>
                                <Link to='/Projet-Kwick-React/login' onClick={handleDeconnexion} className="Link">
                                    Se déconnecter
                                </Link>
                            </> :
                            <>
                                <Link to='/Projet-Kwick-React/signup' className="Link">
                                    <li>S'inscrire</li>
                                </Link>
                                <Link to='/Projet-Kwick-React/login' className="Link">
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
