import React from 'react';
import {Link} from "react-router-dom";
import s from './PreviewCard.module.css'

const PreviewCard = (props) => {
    return (
        <>
            <Link className={s.link} to={`/user/${props.id}`}>
                <div className={s.container}>
                    <div className={s.avatar} style={{backgroundImage: `url("${props.avatar}")`}}></div>
                    <div className={s.name}>
                        <div className={s.firstName}>{`${props.first_name} ${props.last_name}`}</div>
                    </div>
                    <div className="likes"></div>
                </div>
            </Link>
        </>
    );
};

export default PreviewCard;