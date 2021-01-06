import '../css/messages.css';
import Avatar from '@material-ui/core/Avatar';


function MessagesFromPeople(props) {
    const { message } = props;

    return (
        <>
            {message &&
                <div className="divMessages">
                    <div className="divAvatar">
                        <div className="divAlignAvatar">
                            <Avatar alt="Avatar">{message.user_name.substring(0, 1)}</Avatar>
                        </div>
                        <p className="userName">{message.user_name}</p>
                    </div>
                    <div className="messageBubble">
                        <p className="contentMessage">{message.content}</p>
                    </div>
                    <p className="dateFromPeople">{new Date(message.timestamp * 1000).toLocaleDateString("fr-FR")} à {new Date(message.timestamp * 1000).toLocaleTimeString("fr-FR")}</p>
                </div>
            }
        </>
    );
}

export default MessagesFromPeople;
