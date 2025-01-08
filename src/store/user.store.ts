import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware"; 
import { isAxiosError } from "axios";
import { Authorization, authorizationSchema } from "../types";
import { withBackdrop } from "../helpers/general";
import apiStudents from "../api/students";
import { ToastCustom } from "../helpers/toast";
import { immer } from "zustand/middleware/immer";
import { parse } from "valibot";
import { NavigateFunction } from "react-router-dom";


 
interface UserState { 
  authorization:Authorization;
  isAuthenticated: boolean;
  login: (user:string, password:string,navigate: NavigateFunction ) => void;
  logout: () => void; 
  validateToken: () => Promise<void>
}
const initStateUser:Authorization={
    token:'',
    name:'',
    email:'',
    id:0 ,
    message:''
}


const userStore:StateCreator<UserState,[["zustand/devtools", never], ["zustand/immer", never]]>=(set,get)=>({  
    authorization:initStateUser, 
    isAuthenticated: false, 
    logout:async () => { 
          if(get().authorization.token){
            await withBackdrop(async () => {
              await apiStudents('/auth/logout',
                {
                  headers:{
                    'Authorization':`Bearer ${get().authorization.token}`
                  }
                }
              );
            })
          }
          set({ authorization: initStateUser,isAuthenticated: false });
    }, 
    login: async (user:string, password:string,navigate) => { 
        const data = {email:user,password}; 
        const result=await withBackdrop(async () => {
            const {data:dataResponse} = await apiStudents.post('/auth/login',data);
            const responseValibot=parse(authorizationSchema,dataResponse)
            return responseValibot
        }); 
        if(result){
            set((state)=>{ state.authorization= result });   
            set((state)=>{ state.isAuthenticated= true })
            ToastCustom.fire({
                icon: "success",
                title: result.message
            }); 
            navigate('/');  
        }
    }, 
    validateToken: async () => {  
      const result=await withBackdrop(async () => {
          return await apiStudents('/auth/validate-token',{
            headers:{
              'Authorization':`Bearer ${get().authorization.token}` 
            }
          }); 
      }); 
      debugger
      if(!!result){
        get().logout()
      }
 
    }, 
});


export const useUserStore=create<UserState>()(
  devtools(
    persist(
      immer(
        userStore
      )
      ,{
         name:'user-store',
       }
    )
  )
);