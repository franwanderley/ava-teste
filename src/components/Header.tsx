import React, {useContext} from 'react';
import {FiMenu, FiX, FiPlus } from 'react-icons/fi';
import '../styles/header.css';
import { ActivityContext } from '../providers/ActivityContext';

export function Header(){
   const { openModal, isOpenSideBar, openSideBar, closeSideBar } = useContext(ActivityContext);

   return (
      <div className="header">
         <div className="title" >
            {isOpenSideBar ? (
               <a className="btnMenu" onClick={closeSideBar}>
                  <FiX size={30}/>
               </a>
            ): (
               <a className="btnMenu" onClick={openSideBar}>
                  <FiMenu size={30}/>
               </a>
            )}
            <h3>AVA Teste</h3>
         </div>
            <button className="btn-add" onClick={openModal}> 
               <FiPlus size={30} style={{color: 'var(--header)'}}/> 
            </button>
      </div>
   );
}