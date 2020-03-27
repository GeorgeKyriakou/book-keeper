import React from 'react'
import './ActionBar.scss'
import add from '../../assets/add.svg'
import { useHistory } from 'react-router'

interface Props {

}

export const ActionBar: React.FC<Props> = () => {
    const history = useHistory();
    
    const onAddNewClick=()=>{
        history.push(`book/edit`);
    }

    return (
        <div className="action-bar">
            <img src={add} alt="add" onClick={onAddNewClick}/>
        </div>
    );
}