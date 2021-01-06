import '../css/messages.css';
import Avatar from '@material-ui/core/Avatar';


function MessagesFromMe(props) {
    const { message } = props;

    return (
        <>
            {message &&
                <div className="divMessages" >
                    <div className="myMessagesContainer">
                        <div className="myMessages">
                            <p className="contentMessage">{message.content}</p>
                        </div>
                        <p className="date">{new Date(message.timestamp * 1000).toLocaleDateString("fr-FR")} à {new Date(message.timestamp * 1000).toLocaleTimeString("fr-FR")}</p>
                    </div>
                    <div className="dateContainer">
                        <div>
                            <Avatar alt="Avatar">{message.user_name.substring(0, 1)}</Avatar>
                            <p className="userName">{message.user_name}</p>
                        </div>
                    </div>

                </div>
            }
        </>
    );
}

export default MessagesFromMe;
