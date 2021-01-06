import '../css/messages.css';
import Axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function TypingBar(props) {
    const { token, id } = props;
    const [myMessage, setMyMessage] = useState('');
    const { fetchData } = props;

    const onSubmit = async (e) => {
        e.preventDefault();
        await Axios.get(`${process.env.REACT_APP_API_URL}say/${token}/${id}/${encodeURI(myMessage)}`)
            .then(async () => {
                fetchData();
                setMyMessage('');
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <div className="typingBar">
            <form onSubmit={onSubmit}>
                <div className="input-icons">
                    <FontAwesomeIcon className="searchIcon" icon={faSearch} />
                    <input
                        type="text"
                        className="inputMessage"
                        id="message"
                        name="message"
                        placeholder="Votre message..."
                        onChange={e => setMyMessage(e.target.value)}
                        value={myMessage}
                    />
                </div>
            </form>
        </div>
    );
}

export default TypingBar;
