import '../css/messages.css';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';


function TypingBar(props) {
    const { token, id, fetchData } = props;

    /*Function to validate values*/
    const validate = values => {
        let errors = {};
        if (values.message.length > 140) {
            errors.message = "Message trop long";
        }
        return errors;
    }

    /*Using react formik to simplify form handling*/
    const formik = useFormik({
        initialValues: {
            message: '',
        },
        /*Get method to send message user when submiting form*/
        onSubmit: async (e) => {
            if (e.message.length > 140) {
                console.log('ok');
                return;
            }
            await Axios.get(`${process.env.REACT_APP_API_URL}say/${token}/${id}/${encodeURI(e.message)}`)
                .then(async () => {
                    /*Fetch data when submiting message & reset value of message*/
                    fetchData();
                    formik.values.message = '';
                })
                .catch((e) => {
                    console.log(e);
                })
        },
        validate
    })

    return (
        <div className="typingBar">
            <form onSubmit={formik.handleSubmit}>
                {formik.touched.message && formik.errors.message &&
                    <div className="errorMessage">
                        {formik.errors.message}
                    </div>}
                <div className="input-icons">
                    <FontAwesomeIcon className="searchIcon" icon={faSearch} />
                    <input
                        type="text"
                        className={formik.errors.message ? "redMessage" : "inputMessage"}
                        id="message"
                        name="message"
                        placeholder="Votre message..."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                    />

                </div>
            </form>
        </div>
    );
}

export default TypingBar;
