import '../css/aside.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    const { token, setMessages, scrollToBottom } = props;
    const [usersConnected, setUsersConnected] = useState([]);
    const [valueOfSelect, setValueOfSelect] = useState(0);



    useEffect(() => {
        async function fetchData() {
            await Axios.get(`${process.env.REACT_APP_API_URL}user/logged/${token}`)
                .then(data => {
                    if (data.data.result.status === 'failure') {
                        throw new Error();
                    }
                    setUsersConnected(data.data.result.user);
                })
                .catch(e => {
                    /*console.log(e);*/
                })
        }
        fetchData();
    }, [token]);

    const handleChangeTimestamp = async (e) => {
        setValueOfSelect(e.target.value);
        await Axios.get(`${process.env.REACT_APP_API_URL}talk/list/${token}/${e.target.value === 0 ? 0 : Math.round((+new Date() / 1000) - e.target.value)}`)
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


    return (
        <aside>
            <section>
                <h4>Personnes connectées</h4>
                <ul className="connectesList">
                    <div className={usersConnected && usersConnected.length > 7 ? "scrollDiv" : null}>
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
                                <div className="divTextPuce">
                                    <p className="textPuce">{user}</p>
                                </div>
                            </li>
                        })}
                    </div>
                    <div className="selectMessages">
                        <h4>Quels messages afficher ?</h4>
                        <FormControl >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={valueOfSelect}
                                onChange={handleChangeTimestamp}
                            >
                                <MenuItem value={1 * 60}>Dernières 10min</MenuItem>
                                <MenuItem value={12 * 60 * 60}>Dernières 12h</MenuItem>
                                <MenuItem value={24 * 60 * 60}>Dernières 24h</MenuItem>
                                <MenuItem value={48 * 60 * 60}>Dernières 48h</MenuItem>
                                <MenuItem value={0}>Afficher tout</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </ul>
            </section>
        </aside>
    );
}

export default Aside;
