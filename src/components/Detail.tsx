import React, { useContext } from "react";
import { ActivityContext } from "../providers/ActivityContext";
import '../styles/detail.css';

export function Detail(){
   const { activityDetail } = useContext(ActivityContext);

   if(! activityDetail )
      return (
         <div className="detail">
            <h3 style={{textAlign: "center"}}>Nenhuma atividade selecionado</h3>
         </div>
      );
   else
      return (
         <div className="detail">
            <h3>{activityDetail.title}</h3>
            <p>{activityDetail.description}</p>
         </div>
      );
}