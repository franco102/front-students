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
      try {
        await apiStudents('/auth/validate-token',{
          headers:{
            'Authorization':`Bearer ${get().authorization.token}` 
          }
        }); 
        
      } catch (error) {
        let message = 'Token invalido'; // Mensaje por defecto
        // Verificar si el error tiene la estructura esperada
        if ( isAxiosError(error) && error.response && error.response.data && error.response.data.message ) { 
            // Intentar convertir el valor de 'detail' a JSON si es posible
            let detailString = error.response.data.message as string;
        
            // Verificar si es un array o un string
            if (typeof detailString === 'string') {
              try {
                // Intentar convertir a objeto/array en caso de que sea un string JSON válido
                detailString = JSON.parse(detailString.replace(/'/g, '"'));
              } catch (err) {
                // Si falla la conversión, asumimos que es un string simple
                message = detailString;
              }
            }
            // Verificar si es un array o un string
            if (typeof detailString === 'object') {
              try {
                // Intentar convertir a objeto/array en caso de que sea un string JSON válido
                detailString = JSON.parse(detailString).message??'';
              } catch (err) {
                // Si falla la conversión, asumimos que es un string simple
                message = detailString;
              }
            }
            // Si es un array, concatenar los mensajes
            if (Array.isArray(detailString)) {
              message = detailString.map((detail: { message: string }) => detail.message).join('<br>');
            } else if (typeof detailString === 'string') {
              // Si es un string simple, usarlo como mensaje
              message = detailString;
            }  
        } 

        ToastCustom.fire({
          icon: "error",
          title: message
        }); 
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