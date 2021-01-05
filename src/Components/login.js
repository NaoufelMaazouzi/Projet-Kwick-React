import '../css/signUp.css';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import Axios from 'axios';
import { useAuth } from "../Context/auth";
import Alert from '@material-ui/lab/Alert';


const validate = values => {
    let errors = {};

    if (!values.name) {
        errors.name = "Nom requis";
    }
    if (!values.password) {
        errors.password = "Mot de passe requis"
    }
    return errors;
}
function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const { setAuthTokens } = useAuth();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: async (e) => {
            await Axios.get(`https://greenvelvet.alwaysdata.net/kwick/api/login/${e.name}/${e.password}`)
                .then(data => {
                    if (data.data.result.status === 'done') {
                        setAuthTokens(data.data.result);
                        setLoggedIn(true);
                    } else {
                        setIsError(true);
                    }
                })
                .catch((e) => {
                    setIsError(true)
                })
        },
        validate
    })

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <form className="formSignup" onSubmit={formik.handleSubmit}>
            {isError && <Alert severity="error">Erreur de conexion. Veuillez choisir un autre nom et mot de passe</Alert>}
            <h2 className='titleSignup'>Se connecter</h2>
            <p>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nom"
                    className="inputSignup"
                    onChange={formik.handleChange}
                    value={formik.values.name} />
                {formik.errors.name && <div className="errorMessage">{formik.errors.name}</div>}
            </p>
            <p>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    className="inputSignup"
                    onChange={formik.handleChange}
                    value={formik.values.password} />
                {formik.errors.password && <div className="errorMessage">{formik.errors.password}</div>}
            </p>
            <p>
                <input type="submit" value="Me connecter" id="submit" />
            </p>
            <p>
                <Link to='/signup'>
                    Je n'ai pas de compte
                </Link>
            </p>
        </form>
    );
}

export default Login;