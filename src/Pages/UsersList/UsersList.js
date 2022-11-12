import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMoreUsers, fetchUsers} from "../../store/usersSlice";
import PreviewCard from "../../Components/PreviewCard/PreviewCard";
import s from './UsersList.module.css'
import {useNavigate} from "react-router";
import buttonAsset from '../../assets/exitMobileButton.png'


const UsersList = () => {
    const navigate = useNavigate();
    const users = useSelector(state => state.users.users.data);
    const {status, action, error} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const hanldeExit = () => {
        localStorage.clear()
        navigate('/');
    }
    const hanldeLoadMore = () => {
        dispatch(fetchMoreUsers())
    }
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);
    useEffect(() => {
       if (!localStorage.getItem("authToken")) navigate('/');
    }, [localStorage]);
    const screenWidth = window.screen.width;

    return (
        <>
            <div className={s.header}>
                <div className={s.button}>
                    <button onClick={hanldeExit} style={screenWidth < 376 ? {backgroundImage: `url("${buttonAsset}")`} : {background: ''}} className={s.exitButton}>{screenWidth < 376 ? '' : 'Выход'}</button>
                </div>
                <div className={s.text}>
                    <div className={s.title}>Наша команда</div>
                    <div className={s.description}>Это опытные специалисты, хорошо разбирающиеся во всех задачах,
                        которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.

                    </div>
                </div>
            </div>
            <div className={s.container}>
                {status === 'resolved' ? users.length > 0 ? users.map((i) => (
                    <PreviewCard
                        key={i.id}
                        {...i}
                    />
                )) : '' : ''}

            </div>
            <button className={s.loadMoreButton} onClick={hanldeLoadMore}>Показать ещё</button>
        </>
    );
};

export default UsersList;