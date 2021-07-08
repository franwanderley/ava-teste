import React from 'react';
import { useContext } from 'react';
import { FiCheck, FiEdit2, FiTrash2 } from 'react-icons/fi';
import swal from 'sweetalert';
import { Activity, ActivityContext } from '../providers/ActivityContext';
import '../styles/sidebar.css';

export function SideBar(){
   const {
      isOpenSideBar, openModal, activities, editActivity, changeActivityEdit, deleteActivity,activityDetail, changeActivityDetail
   } = useContext(ActivityContext);
   
   function handleCheck(activity: Activity){
      console.log(activity.id);
      activity.isCompleted = activity.isCompleted ? false : true; 
      try{
         editActivity(activity);
      }catch(err){
         swal('Não foi possivel marcar atividade!', err, 'error');

      }
   }

   function onEdit(activity : Activity){
      openModal();
      changeActivityEdit(activity);
   }

   async function onDelete(activity : Activity){
      await swal({
         title: 'Você tem certeza?',
         text: 'Você quer apagar essa atividade?',
         icon: 'warning',
         dangerMode: true,
         buttons: ["Não", "Sim"]
       }).then(willDelete => {
         if (willDelete) {
           deleteActivity(activity);
            swal(
             'Deleted!',
             'Sua atividade foi apagado.',
             'success'
           )
         } else {
           swal(
             'Cancelled',
             'Sua atividade foi salvo',
             'error'
           )
         }
       })
   }

   if(activities.length === 0)
      return (
         <div className="sidebar" style={isOpenSideBar ? {} : { minWidth: 0}}>
            <h3>Sem Atividades no momento!</h3>
         </div>
      );
   return (
      <div 
         className="sidebar"
         style={isOpenSideBar ? {} : { minWidth: 0, width: 0}}
      > 
         {activities.map(a => (
            <div key={a.id} className="divActivity">
               <a className="check" onClick={() => handleCheck(a)}>
               <FiCheck 
                  size={30}
                  style={a.isCompleted ? {color: '#000'} : {color: '#ccc'}}
               />
               </a>
               <a 
                  className={`activity ${a.isCompleted && 'checked'}`}
                  style={activityDetail === a ? {color: 'var(--header)'}: {}}
                  onClick={() => changeActivityDetail(a)} 
               >
                  {a.title}
               </a>
               <div className="btn">
               <a 
                  href="#" 
                  className="btn-edit"
                  onClick={() => onEdit(a)}
               >
                  <FiEdit2 size={20} /> 
               </a>
               <a 
                  href="#" 
                  className="btn-trash"
                  onClick={() => onDelete(a)}
               >
                  <FiTrash2 size={20} /> 
               </a>
               </div>
            </div>
         ))}
      </div>
   );
}