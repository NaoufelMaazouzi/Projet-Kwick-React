import '../css/messages.css';
import Axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Aside from './aside';
import React from 'react';
import MessagesFromMe from './messagesFromMe';
import MessagesFromPeople from './messagesFromPeople';
import IdleTimer from 'react-idle-timer';
import TimeoutDialog from './timeoutDialog';
import TypingBar from './typingBar';
import Alert from '@material-ui/lab/Alert';

function Messages(props) {
    /*Declare all states*/
    const { token, username, id } = props;
    const [messages, setMessages] = useState([]);
    const [sessionTimeout] = useState(1000 * 1200 * 1);
    const [isTimedOut, setIsTimedOut] = useState(false);
    const [open, setOpen] = useState(false);
    let idleTimer = null;
    const messagesEndRef = useRef(null);

    /*Function to fetch all messages from the API*/
    const fetchData = async () => {
        await Axios.get(`${process.env.REACT_APP_API_URL}talk/list/${token}/0`)
            .then(data => {
                if (data.data.result.status === 'failure') {
                    throw new Error();
                }
                setMessages(data.data.result.talk);
                scrollToBottom();
            })
            .catch(e => {
                /*console.log(e);*/
            });
    }

    /*Function to scroll to bottom of chat*/
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    /*Fetch data when the component mount*/
    useEffect(() => {
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /*Function to clear timeOut when user do an action on the page*/
    const onAction = () => {
        setIsTimedOut(false);
    }

    /*Function to open a pop-up if the user is inactive for 20min*/
    const onIdle = () => {
        if (isTimedOut) {
            setOpen(true);
        } else {
            setOpen(false);
            idleTimer.reset();
            setIsTimedOut(true);
        }
    }

    return (
        <>
            <IdleTimer
                ref={ref => { idleTimer = ref }}
                element={document}
                onActive={onAction}
                onIdle={onIdle}
                onAction={onAction}
                debounce={250}
                timeout={sessionTimeout}
            />
            <TimeoutDialog open={open} setOpen={setOpen} />
            <main>
                <Aside token={token} setMessages={setMessages} scrollToBottom={scrollToBottom} />
                <section className="sectionMessages">
                    <div className="messagesContainer">

                        {messages && messages.length ? messages.map((message, key) => {
                            return message.user_name !== username ?
                                <MessagesFromPeople message={message} key={key} />
                                : <MessagesFromMe message={message} key={key} />
                        }) :
                            <Alert variant="outlined" severity="error">
                                Aucun messages !
                            </Alert>
                        }
                        <div ref={messagesEndRef} />
                    </div>
                    <TypingBar fetchData={fetchData} token={token} id={id} />
                </section>
            </main>
        </>
    );
}

export default Messages;
