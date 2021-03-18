import '../css/signUp.css';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import Axios from 'axios';
import { useAuth } from "../Context/auth";
import Alert from '@material-ui/lab/Alert';

/*Function to validate values from signup form*/
const validate = values => {
    let errors = {};
    if (!values.name) {
        errors.name = "Nom requis";
    }
    if (!values.email) {
        errors.email = "Email requis";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Format d'email invalide"
    }
    if (!values.password) {
        errors.password = "Mot de passe requis"
    }
    return errors;
}

function SignUp() {
    /*Declare all states*/
    const [isError, setIsError] = useState(false);
    const { setAuthTokens } = useAuth();
    let history = useHistory();

    /*Using react formik to simplify form handling*/
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        /*Get method to signup user when submiting form*/
        onSubmit: async (e) => {
            await Axios.get(`${process.env.REACT_APP_API_URL}signup/${e.name}/${e.password}`)
                .then(data => {
                    if (data.data.result.status === 'failure') {
                        setIsError(true);
                        throw new Error();
                    }
                    /*Call the SetAuthTokens Function from App.js to set token, id & username of the user logged in localStorage*/
                    setAuthTokens(data.data.result);
                    history.push('/');
                })
                .catch(e => {
                    /*console.log(e);*/
                    setIsError(true)
                })
        },
        validate
    })

    return (
        <form className="formSignup" onSubmit={formik.handleSubmit}>
            {isError && <Alert severity="error">Erreur de conexion. Veuillez choisir un autre nom et mot de passe</Alert>}
            <h2 className='titleSignup'>S'inscrire</h2>
            <div className="divInputSingup">
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nom"
                    className="inputSignup"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name} />
                {formik.touched.name && formik.errors.name && <Alert severity="error">{formik.errors.name}</Alert>}
            </div>
            <div className="divInputSingup">
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="inputSignup"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email} />
                {formik.touched.email && formik.errors.email && <Alert severity="error">{formik.errors.email}</Alert>}
            </div>
            <div className="divInputSingup">
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    className="inputSignup"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password} />
                {formik.touched.password && formik.errors.password && <Alert severity="error">{formik.errors.password}</Alert>}
            </div>
            <p>
                <input type="submit" value="Créer mon compte" id="submit" />
            </p>
            <p>
                <Link to='/login'>
                    J'ai déjà un compte
                </Link>
            </p>
        </form>
    );
}

export default SignUp;