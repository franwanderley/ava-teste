import { createContext, ReactNode, useState } from "react";
import { Modal } from "../components/Modal";
import Cookies from 'js-cookie';
import { useEffect } from "react";

export interface Activity{
   id: number;
   title: string;
   description: string;
   isCompleted: boolean;
 }

 interface ActivityContextData{
   activities: Activity[];
   activityEdit: Activity | undefined;
   activityDetail: Activity | undefined;
   isOpenModal: boolean,
  isOpenSideBar: boolean,
  addActivity: (Activity: Activity) => void;
  editActivity: (Activity: Activity) => void;
  deleteActivity: (Activity: Activity) => void;
  changeActivityEdit: (activity : Activity | undefined) => void;
  changeActivityDetail: (activity : Activity | undefined) => void;
  openModal: () => void;
  closeModal: () => void;
  openSideBar: () => void;
  closeSideBar: () => void;
 }

 interface ActivityProviderProps{
  children: ReactNode;
}

export const ActivityContext = createContext({} as ActivityContextData);
export function ActivityProvider({ children } : ActivityProviderProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityEdit, setActivityEdit] = useState<Activity>();
  const [activityDetail, setActivityDetail] = useState<Activity>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);

  function changeActivityEdit(activity: Activity | undefined){
    setActivityEdit(activity);
  }
  function changeActivityDetail(activity: Activity | undefined){
    setActivityDetail(activity);
  }

  async function addActivity(activity: Activity){
 
    if(!activity){
      throw new Error('Prato vazio');
    }
    activity.id = activities.length;
    //Salvar no context
    if(activities)
      setActivities([
        ...activities,
        activity
      ]);
    else
      setActivities([activity]);

  }

  async function editActivity(activity: Activity){
    if(! activity)
      throw new Error('Atividade Vazio!');

    //1 parte excluir
    const newactivitys = activities.filter(p => p.title !== activity.title);

    newactivitys.push(activity);
    newactivitys.sort((a,b) => {
      if(a.id < b.id)
        return -1;
      return 1;
    });
    //2 parte adiciona
     setActivities(newactivitys);

    if(activity.id === activityDetail?.id){
      setActivityDetail(activity);
    }
  }
  async function deleteActivity(activity: Activity){
    const newactivitys = activities.filter(p => p.id !== activity.id);
    setActivities(newactivitys);

    if(activity === activityDetail){
        setActivityDetail(undefined);
    }

  }

  function openModal(){
    setIsOpenModal(true);
  }
  function openSideBar(){
    setIsOpenSideBar(true);
  }
  function closeModal(){
    setIsOpenModal(false);
  }
  function closeSideBar(){
    setIsOpenSideBar(false);
  }

  //Pegar as atividades do Cookies
  useEffect(() => {
    const activityCookies = Cookies.get('avateste/activity');
    if(activityCookies){
      console.log(JSON.parse(activityCookies));
      setActivities(JSON.parse(activityCookies));
    }
  }, []);
  //Salvar atividades
  useEffect(() => {
    if(activities){
    Cookies.set(
      'avateste/activity',
      JSON.stringify(activities)
    );
    }
  }, [activities]);

  return (
    <ActivityContext.Provider value={{
      activities, 
      activityEdit,
      activityDetail, 
      changeActivityEdit, 
      changeActivityDetail,
      addActivity, 
      editActivity,
      deleteActivity, 
      isOpenModal, 
      openModal, 
      closeModal,
      isOpenSideBar,
      openSideBar,
      closeSideBar
   }}>
          {isOpenModal && <Modal/>}
          {children}
      </ActivityContext.Provider>
  );
}