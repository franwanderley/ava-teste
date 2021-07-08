import { FormEvent, useContext, useState } from 'react';
import { FiCheckSquare, FiX } from 'react-icons/fi';
import swal from 'sweetalert';
import { Activity, ActivityContext} from '../providers/ActivityContext';
import  '../styles/modal.css';

export function Modal(){
   const {
      closeModal, activityEdit, changeActivityEdit,editActivity, addActivity
   } = useContext(ActivityContext);

   const [title, setTitle] = useState(activityEdit?.title || '');
   const [description, setDescription] = useState(activityEdit?.description || '');

   function handleSubmit(form : FormEvent){
      form.preventDefault();
      closeModal();
      changeActivityEdit(undefined);
      const activity = {
         title,
         description, 
         isCompleted: false,
      } as Activity;
      try{
         if(activityEdit){
            activity.id = activityEdit.id;
            editActivity(activity);
            swal('Atividade Editado com Sucesso', '', 'success');
         }else{
            addActivity(activity);
            swal('Atividade Salvo com Sucesso', '', 'success');
         }
      }catch(err){
         console.log(err);
         swal('Não foi possivel salvar esta Atividade', '', 'error');
      }
   }

   function handleCloseModal(){
      closeModal();
      changeActivityEdit(undefined);
   }

   return (
      <div className="overlay">
         <div className="modal">
            <button
               className="btnclose"
               onClick={handleCloseModal}
            >
               <FiX color="#444" size={30}/>
            </button>
            <h3>Nova Atividade</h3>
            <form onSubmit={handleSubmit}>
               <div className="form">
                  
                  <div className="divnome">
                     <label htmlFor="nome">Atividade</label>
                     <input 
                        type="text" 
                        id="nome"
                        value={title} 
                        required 
                        placeholder="nome da atividade"
                        onChange={e => setTitle(e.target.value)}
                     />
                  </div>

                  <label htmlFor="descricao">Descrição</label>
                  <textarea 
                     className="descricao"
                     value={description}
                     required
                     rows={5} 
                     id="descricao" 
                     onChange={e => setDescription(e.target.value)}
                  />
                 
                  <button type="submit">
                     <div className="textbutton" >
                        Salvar Atividade
                     </div>
                     <div className="iconbutton" >
                        <FiCheckSquare/>
                     </div>
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}