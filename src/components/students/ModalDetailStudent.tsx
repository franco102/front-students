import {  Dialog,DialogContent, DialogTitle } from '@mui/material'
import { useStudentStore } from '../../store/students.store'   
 

export const ModalDetailStudent = () => {
    const dialogDetailStudent=useStudentStore(state=>state.dialogDetailStudent)
    const setDialogDetailStudent=useStudentStore(state=>state.setDialogDetailStudent) 
    const studentDetail=useStudentStore(state=>state.studentDetail) 

  return (
    <Dialog
        maxWidth='md'
        open={dialogDetailStudent}
        onClose={()=>setDialogDetailStudent(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='text-orange-500 text-center border-b-2 border-orange-500'>
          Detalle del Estudiante
        </DialogTitle>
        <DialogContent className='flex justify-between flex-col mt-4'>  
            <div className='flex justify-start items-center gap-4 border border-orange-400 border-dotted p-2 rounded-lg'>
                <div className={`${(studentDetail.status??false)?'bg-green-300 ':'bg-red-300 '} rounded-lg p-2`}>
                    <img src="/alumno.png" alt="Logotipo Studens"  className="w-20 h-20" />
                </div>
                <div>
                    <div className='flex  justify-between'>
                        <h3 className='text-lg text-orange-500'>Nombre: </h3>
                        <p className='font-bold border-b-2 border-orange-500 ms-2'>
                            {studentDetail.first_name??''}
                        </p>
                    </div>
                    <div className='flex  justify-between'>
                        <h3 className='text-lg text-orange-500'>Apellido: </h3>
                        <p className='font-bold border-b-2 border-orange-500  ms-2'>
                            {studentDetail.last_name??''}
                        </p>
                    </div> 
                    <div className='flex  justify-between'>
                        <h3 className='text-lg text-orange-500'>Email: </h3>
                        <p className='font-bold border-b-2 border-orange-500  ms-2'>
                            {studentDetail.email??''}
                        </p>
                    </div> 
                    <div className='flex  justify-between'>
                        <h3 className='text-lg text-orange-500'>Celular: </h3>
                        <p className='font-bold border-b-2 border-orange-500  ms-2'>
                            {studentDetail.phone??''}
                        </p>
                    </div> 
                    <div className='flex justify-between'>
                        <h3 className='text-lg text-orange-500'>Fecha Nacimiento: </h3>
                        <p className='font-bold border-b-2 border-orange-500  ms-2'>
                            {studentDetail.birth_date??''}
                        </p>
                    </div> 
                </div> 
            </div>
            <p className='text-xs'>
            Fecha Registro: <span className='font-extrabold'>{studentDetail.enrollment_date??''}</span> 
            </p>
        </DialogContent> 
      </Dialog>
  )
}
