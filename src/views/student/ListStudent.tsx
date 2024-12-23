import { ModalDetailStudent } from "../../components/students/ModalDetailStudent"
import { ModalFormStudents } from "../../components/students/ModalFormStudents"
import StudentList from "../../components/students/TableStudents" 

const ListStudent = () => {
  return (
    <div>
      <StudentList/>
      <ModalFormStudents/>
      <ModalDetailStudent/>
    </div>
  )
}

export default ListStudent
