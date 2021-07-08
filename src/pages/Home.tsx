import React from 'react';
import { Detail } from '../components/Detail';
import { Header } from '../components/Header';
import { SideBar } from '../components/SideBar';
import '../styles/home.css';

export function Home(){
   return (
      <div className="home">
         <Header/>
         <div className="main">
            <SideBar/>
            <Detail/> 
         </div>
      </div>
   );
}