import React, {useEffect, useState} from 'react';
import s from './Auth.module.css'
import {register} from '../../auth_api/auth'
import {useNavigate} from "react-router";

const Auth = () => {

    const emailField = React.useRef(null);
    const passField = React.useRef(null);
    const passConfirm = React.useRef(null);
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPassValid, setIsPassValid] = useState(true)
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        let email = emailField.current.value;
        let password = passField.current.value;
        register(email, password).then(r => {
            passConfirm.current.value !== passField.current.value ? setIsPassValid(false) : setIsPassValid(true)
            if (r.token) {
                setIsEmailValid(true)
            } else {
                setIsEmailValid(false)
            }
        })
    }
    useEffect(() => {
        if (localStorage.getItem('authToken') && isPassValid && isEmailValid) {
            navigate('/userslist');
        }
    }, [isPassValid])
    useEffect(() => {
        if (localStorage.getItem('authToken') && isPassValid && isEmailValid) {
            navigate('/userslist');
        }
    }, [isEmailValid])
    return (
        <div>
            <form onSubmit={handleSubmit} className={s.form} action="" method="get">
                <div className={s.inner}>
                    <h2>Регистрация</h2>
                    <p>
                        <label htmlFor="name">Имя</label>
                        <input className={s.validInput} type="text" name="name" required/>
                    </p>
                    <p>
                        <label htmlFor="email">Электронная почта</label>
                        <input className={isEmailValid ? s.validInput : s.invalidInput} type="email" ref={emailField}
                               name="email" required/>
                        {!isEmailValid ? <h6 style={{color: '#FF6161', margin: "2px 0 0 0"}}>Ошибка. Валидный email:
                            eve.holt@reqres.in</h6> : ''}
                    </p>
                    <p>
                        <label htmlFor="pass">Пароль</label>
                        <input className={s.validInput} ref={passField} type="password" name="pass" required/>
                    </p>
                    <p>
                        <label htmlFor="confirmPass">Подтвердите пароль</label>
                        <input ref={passConfirm} className={isPassValid ? s.validInput : s.invalidInput} type="password"
                               name="confirmPass" required/>
                        {!isPassValid ?
                            <h6 style={{color: '#FF6161', margin: "2px 0 0 0"}}>Пароли не совпадают.</h6> : ''}
                    </p>

                    <button type="submit">Зарегистрироваться</button>
                </div>
            </form>
        </div>
    );
};

export default Auth;