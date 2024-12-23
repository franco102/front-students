import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from 'zustand/middleware/immer' 
import { parse } from "valibot";  
import apiStudents from "../api/students";
import {  Student, StudentForm, StudentList, StudentListSchema, StudentSchema } from "../types";
import { withBackdrop } from "../helpers/general";
import { ToastCustom } from "../helpers/toast";
import Swal from "sweetalert2";
 
interface PerfomanceState {   
    listStudents:StudentList
    studentDetail:Student
    selectedStudentDetail:Student
    setSelectedStudentDetail:(dialog:Student)=>void
    getStudents: (token: string) => Promise<void>
    dialogFormStudent:boolean
    dialogDetailStudent:boolean
    setDialogFormStudent:(dialog:boolean)=>void
    setDialogDetailStudent:(dialog:boolean)=>void
    saveStudents: (data: StudentForm,token: string) => Promise<void>
    updateStudents: (data: StudentForm, token: string) => Promise<void>
    deleteStudents: (data: StudentForm['id'], token: string) => Promise<void>
    getStudent: (id: StudentForm["id"], token: string) => Promise<void>
  } 


const studentStore:StateCreator<PerfomanceState,[["zustand/devtools", never], ["zustand/immer", never]]>=(set,get)=>({  
    dialogFormStudent:false,
    dialogDetailStudent:false,
    studentDetail: {} as Student,
    selectedStudentDetail: {} as Student,
    setDialogFormStudent:(dialog:boolean)=>{
      set((state)=>{ state.dialogFormStudent= dialog }); 
    },
    setDialogDetailStudent:(dialog:boolean)=>{
      set((state)=>{ state.dialogDetailStudent= dialog }); 
    },
    setSelectedStudentDetail:(data:Student)=>{
      set((state)=>{ state.selectedStudentDetail= data }); 
    },
    listStudents:[], 
    getStudents:async (token:string)=>{
      await withBackdrop(async () => {
        const { data:dataResponse } = await apiStudents(`/v1/students`,
          {
            headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );  
        const responseValibot=parse(StudentListSchema,dataResponse)
        set((state)=>{ state.listStudents= responseValibot }); 
      }); 
    }, 
    getStudent:async (id: StudentForm['id'],token:string)=>{
      await withBackdrop(async () => {
        const { data:dataResponse } = await apiStudents(`/v1/students/${id}`,
          {
            headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );  
        const responseValibot=parse(StudentSchema,dataResponse)
        set((state)=>{ state.studentDetail= responseValibot }); 
      }); 
    }, 
    saveStudents: async(data: StudentForm,token:string) =>{
      await withBackdrop(async () => {
        const { data:dataResponse } = await apiStudents.post(`/v1/students`,data,
          {
            headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );  
        ToastCustom.fire({
          icon: "success",
          title: dataResponse.message
        });
        await get().getStudents(token)
        get().setDialogFormStudent(false)
      }); 
    },
    updateStudents: async(data,token) =>{
      await withBackdrop(async () => {
        const { data:dataResponse } = await apiStudents.put(`/v1/students/${data.id}`,data,
          {
            headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );  
        ToastCustom.fire({
          icon: "success",
          title: dataResponse.message
        });
        get().getStudents(token)
        get().setDialogFormStudent(false)
      }); 
    },
    deleteStudents: async(id,token) =>{
      Swal.fire({
        title: "Estás seguro?",
        text: "Usted eliminará un studiante!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          await withBackdrop(async () => {
            const { data:dataResponse } = await apiStudents.delete(`/v1/students/${id}`,
              {
                headers:{
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                }
              }
            );  
            ToastCustom.fire({
              icon: "success",
              title: dataResponse.message
            });
            get().getStudents(token)
            get().setDialogFormStudent(false)
          }); 
        }
      });
      
    }
});


export const useStudentStore=create<PerfomanceState>()(
  devtools( 
    immer(
      studentStore
    ) 
  )
);