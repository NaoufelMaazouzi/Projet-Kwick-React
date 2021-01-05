import '../css/messages.css';
import Axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Aside from './aside';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { myLocalStorage } from '../globalVariables';
import MessagesFromMe from './messagesFromMe';
import MessagesFromPeople from './messagesFromPeople';


function Messages() {
    const existingToken = JSON.parse(localStorage.getItem(process.env.REACT_APP_MY_LOCAL_STORAGE)).token;
    const existingId = JSON.parse(localStorage.getItem(process.env.REACT_APP_MY_LOCAL_STORAGE)).id;
    const existingUsername = JSON.parse(localStorage.getItem(process.env.REACT_APP_MY_LOCAL_STORAGE)).username;

    const [messages, setMessages] = useState([]);
    const [isError, setIsError] = useState(false);

    const fetchData = async () => {
        await Axios.get(`https://greenvelvet.alwaysdata.net/kwick/api/talk/list/${existingToken}/0`)
            .then(data => {
                setMessages(data.data.result.talk);
                scrollToBottom();
            })
            .catch(err => console.log(err))
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }


    const validate = values => {
        let errors = {};

        if (!values.message) {
            errors.message = "Message requis";
        }
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: async (e) => {
            await Axios.get(`https://greenvelvet.alwaysdata.net/kwick/api/say/${existingToken}/${existingId}/${encodeURI(formik.values.message)}`)
                .then(async () => {
                    fetchData();
                    formik.values.message = ''
                })
                .catch((e) => {
                    setIsError(true);
                })
        },
        validate
    })

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <main>
            <Aside />
            <section className="sectionMessages">
                <div className="messagesContainer">
                    {messages && messages.map((message, key) => {
                        console.log('messageusername:', message.user_name, 'moi:', existingUsername)
                        return message.user_name !== existingUsername ? <MessagesFromPeople message={message} key={key} />
                            : <MessagesFromMe message={message} key={key} />
                    })}
                    <div ref={messagesEndRef} />
                </div>
                <div className="typingBar">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="input-icons">
                            <FontAwesomeIcon className="searchIcon" icon={faSearch} />
                            <input
                                type="text"
                                className="inputMessage"
                                id="message"
                                name="message"
                                placeholder="Votre message..."
                                onChange={formik.handleChange}
                                value={formik.values.message}
                            />
                        </div>
                    </form>
                </div>
            </section>
        </main >
    );
}

export default Messages;
