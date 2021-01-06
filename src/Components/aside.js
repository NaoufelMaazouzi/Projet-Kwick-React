import '../css/aside.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

export const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

function Aside(props) {
    const { token } = props;
    const [usersConnected, setUsersConnected] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await Axios.get(`${process.env.REACT_APP_API_URL}user/logged/${token}`)
                .then(data => {
                    setUsersConnected(data.data.result.user)
                })
                .catch(err => console.log(err))
        }
        fetchData();
    }, []);


    return (
        <aside>
            <section>
                <h4>Personnes connectées</h4>
                <ul className="connectesList">
                    <div className={usersConnected && usersConnected.length > 10 ? "scrollDiv" : null}>
                        {usersConnected && usersConnected.map((user, i) => {
                            return <li className="userBadge" key={user}>
                                <div>
                                    <StyledBadge
                                        overlap="circle"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        variant="dot"
                                    >
                                        <Avatar alt="Avatar">{user !== null && user.substring(0, 1)}</Avatar>
                                    </StyledBadge>
                                </div>
                                <p className="textPuce">{user}</p>
                            </li>
                        })}
                    </div>
                </ul>
            </section>
        </aside>
    );
}

export default Aside;
