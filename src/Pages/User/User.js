import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTheUser} from "../../store/usersSlice";
import s from './User.module.css'
import {useNavigate, useParams} from "react-router";
import {NavLink} from "react-router-dom";
import buttonAsset from '../../assets/exitMobileButton.png'
import buttonBack from '../../assets/backMobileButton.png'


const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.users.data);
    const {status, action, error} = useSelector(state => state.users);
    const params = useParams();
    useEffect(() => {
        dispatch(fetchTheUser(params.id))
        if (!localStorage.getItem("authToken")) navigate('/');
    }, []);
    const screenWidth = window.screen.width;
    return (
        <>
            {status === 'resolved' ?
                <div className={s.container}>
                    <div className={s.header}>
                        <div className={s.backButtonContainer}>
                            <NavLink className={s.link} to={`/userslist`}>
                                <button className={s.backButton}
                                        style={screenWidth < 376 ? {backgroundImage: `url("${buttonBack}")`} : {background: ''}}>
                                    {screenWidth < 376 ? '' : 'Назад'}
                                </button>
                            </NavLink>
                        </div>
                        <div className={s.headerContent}>
                            <div className={s.avatar} style={{backgroundImage: `url("${user.avatar}")`}}></div>
                            <div className={s.name}>
                                {`${user.first_name} 
                                    ${user.last_name}`}
                            </div>
                        </div>
                        <div className={s.button}>
                            <button
                                style={screenWidth < 376 ? {backgroundImage: `url("${buttonAsset}")`} : {background: ''}}
                                className={s.exitButton}
                                onClick={() => localStorage.clear()}>{screenWidth < 376 ? '' : 'Выход'}</button>
                        </div>
                    </div>
                    <div className={s.content}>
                        Вы можете написать {user.first_name} на электронную почту:
                        <p><a href={user.email}>{user.email}</a></p>
                    </div>
                </div>
                : ''}
        </>
    );
};

export default User;