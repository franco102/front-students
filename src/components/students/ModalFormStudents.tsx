import {  Dialog,DialogContent, DialogTitle, TextField } from '@mui/material'
import { useStudentStore } from '../../store/students.store'
import { useForm, SubmitHandler } from "react-hook-form";
import {  StudentForm } from '../../types';
import { useEffect } from 'react';
import { useUserStore } from '../../store/user.store';
type StudentFormInputs = {
    first_name: string;
    last_name: string;
    birth_date: string;
    email: string;
    phone: string; 
    status: number;
};
 

export const ModalFormStudents = () => {
    const dialogFormStudent=useStudentStore(state=>state.dialogFormStudent)
    const setDialogFormStudent=useStudentStore(state=>state.setDialogFormStudent)
    const selectedStudentDetail=useStudentStore(state=>state.selectedStudentDetail)
    const saveStudents=useStudentStore(state=>state.saveStudents)
    const updateStudents=useStudentStore(state=>state.updateStudents)
    const authorization = useUserStore((state) => state.authorization);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<StudentFormInputs>();
    // Manejo del envío del formulario
    const onSubmit: SubmitHandler<StudentFormInputs> = async(data) => {
        const dataStudent:StudentForm={
            birth_date:data.birth_date,
            email:data.email,
            first_name:data.first_name,
            id:selectedStudentDetail.id,
            last_name:data.last_name,
            status:data.status,
            phone:data.phone,
            user_id:selectedStudentDetail.user_id

        } 
        if(selectedStudentDetail.id){
            await updateStudents(dataStudent,authorization.token)
        }else{
            await saveStudents(dataStudent,authorization.token)
        }
        reset(); // Limpiar el formulario
    };

     
    useEffect(() => {
        if (selectedStudentDetail.id !==undefined) {
            reset({
                first_name: selectedStudentDetail.first_name || "",
                last_name: selectedStudentDetail.last_name || "",
                birth_date: selectedStudentDetail.birth_date || "",
                email: selectedStudentDetail.email || "",
                phone: selectedStudentDetail.phone || "",
                status: selectedStudentDetail.status||0,
            });
        }
    }, [selectedStudentDetail, reset]);

  return (
    <Dialog
        maxWidth='md'
        open={dialogFormStudent}
        onClose={()=>setDialogFormStudent(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='text-orange-500'>
          Formulario de Estudiante
        </DialogTitle>
        <DialogContent> 
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 grid-cols-2 pt-2">
          <TextField
            label="Nombre"
            {...register("first_name", { required: "El nombre es obligatorio" })}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
            fullWidth
          />
          <TextField
            label="Apellido"
            {...register("last_name", { required: "El apellido es obligatorio" })}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
            fullWidth
          />
          <TextField
            label="Fecha de Nacimiento"
            type="date"
            {...register("birth_date", { 
                required: "La fecha es obligatoria" ,
                validate: {
                    notFuture: (value) => {
                      const today = new Date();
                      const inputDate = new Date(value);
                      if (inputDate > today) {
                        return "La fecha no puede ser mayor a la actual.";
                      }
                      return true;
                    },
                  },
            })}
            error={!!errors.birth_date}
            helperText={errors.birth_date?.message}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Correo Electrónico"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                message: "El correo no es válido",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Teléfono"
            {...register("phone", { 
                required: "El teléfono es obligatorio",
                minLength: {
                    value: 9,
                    message: "El teléfono debe tener exactamente 9 caracteres.",
                  },
                  maxLength: {
                    value: 9,
                    message: "El teléfono debe tener exactamente 9 caracteres.",
                  }, 
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            fullWidth
          /> 
          <TextField 
            select
            SelectProps={{ native: true }}
            {...register("status", { required: "El estado es obligatorio" })}
            error={!!errors.status}
            helperText={errors.status?.message}
            fullWidth
            disabled={selectedStudentDetail.id?false:true}
          >
            <option value={1} >Activo</option>
            <option  value={0} >Inactivo</option>
          </TextField>
          <button type="submit"  className='col-span-2 bg-orange-500 hover:bg-orange-600 text-white py-2 font-bold'>
            Guardar
          </button>
        </form>
        </DialogContent> 
      </Dialog>
  )
}
