import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TablePagination,
  TextField,
  Container,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useStudentStore } from "../../store/students.store";
import { useUserStore } from "../../store/user.store";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Student } from "../../types";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { formatDate } from "../../helpers/general";

const StudentList = () => {
  const listStudents = useStudentStore((state) => state.listStudents);
  const getStudents = useStudentStore((state) => state.getStudents);
  const authorization = useUserStore((state) => state.authorization);
  const setDialogFormStudent=useStudentStore(state=>state.setDialogFormStudent)
  const setDialogDetailStudent=useStudentStore(state=>state.setDialogDetailStudent)
  const setSelectedStudentDetail=useStudentStore(state=>state.setSelectedStudentDetail)
  const deleteStudents=useStudentStore(state=>state.deleteStudents)
  const getStudent=useStudentStore(state=>state.getStudent)

  useEffect(() => {
    if (authorization.token) {
      getStudents(authorization.token);
    }
  }, []);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filtrar los estudiantes por el término de búsqueda
  const filteredStudents = listStudents.filter(
    (student) =>
      student.first_name.toLowerCase().includes(search.toLowerCase()) ||
      student.last_name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  // Aplicar la paginación
  const paginatedStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0); // Reiniciar a la primera página al buscar
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log(event)
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reiniciar a la primera página al cambiar las filas por página
  };

  const handleOpenDialog=()=>{
    setDialogFormStudent(true)
    const data:Student={
      birth_date:'',
      first_name:'',
      enrollment_date:'',
      id:0,
      last_name:'',
      email:'',
      phone:'',
      status:1,
      user_id:authorization.id

    }
    setSelectedStudentDetail(data)
  }
  const handleShowDetail=async(id:number,token:string)=>{
    await getStudent(id,token)
    setDialogDetailStudent(true)
  }
  const handleEditStudent=(student:Student)=>{
    const data:Student={
      birth_date:student.birth_date,
      first_name:student.first_name,
      enrollment_date:student.enrollment_date,
      id:student.id,
      last_name:student.last_name,
      email:student.email,
      phone:student.phone,
      status:student.status,
      user_id:authorization.id

    }
    setDialogFormStudent(true)
    setSelectedStudentDetail(data)
  }
  return (
    <Container>
      <div className="flex justify-between">
        <Typography variant="h4" gutterBottom>
          Listado de Estudiantes
        </Typography>
        <button
          type="button"
          className="bg-green-500 rounded-lg text-white font-bold px-3 hover:bg-green-600"
          onClick={handleOpenDialog}
        >
          <PersonAddIcon />
        </button>
      </div>
      <TextField
        label="Buscar por nombre o correo"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange}
      />
      <Paper>
        <TableContainer>
          {listStudents.length === 0 ? (
            <CircularProgress
              style={{ margin: "20px auto", display: "block" }}
            />
          ) : (
            <Table>
              <thead className="bg-black ">
                <tr className="text-white">
                  <th className="py-1">Nombre</th>
                  <th className="py-1">Apellido</th>
                  <th className="py-1">Fecha Nacimiento</th>
                  <th className="py-1">Correo</th>
                  <th className="py-1">Telefono</th>
                  <th className="py-1">Fecha Registro</th>
                  <th className="py-1">Estado</th>
                  <th className="py-1"><SettingsIcon/></th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <tr key={student.id} className="even:bg-slate-300 hover:bg-slate-200" >
                      <td className="p-1">{student.first_name}</td>
                      <td className="p-1">{student.last_name}</td>
                      <td className="p-1">{student.birth_date}</td>
                      <td className="p-1">{student.email}</td>
                      <td className="p-1">{student.phone}</td>
                      <td className="p-1 text-center">{formatDate(student.enrollment_date) }</td>
                      <td className="p-1"><p className={`border ${student.status?'border-green-500 text-green-500 bg-green-100':'border-red-500 text-red-500 bg-red-100'} text-center rounded-lg p-1`}>{student.status?'Activo':'Inactivo'}</p></td>
                      <td className="p-1">
                        <div className=" grid grid-cols-3 gap-2">
                          <button  type="button" onClick={()=>handleShowDetail(student.id,authorization.token)} className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-1"><RemoveRedEyeIcon/>  </button>
                          <button  type="button" onClick={()=>handleEditStudent(student)} className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-1"><EditIcon/>  </button>
                          <button type="button" onClick={()=>deleteStudents(student.id,authorization.token)} className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-1" ><DeleteIcon/>  </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} align="center">
                      No se encontraron estudiantes.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredStudents.length} // Número total de elementos filtrados
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default StudentList;
