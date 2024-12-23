import * as v from "valibot";

export type  ResponseInterface={
    sql_err:number;
    sql_msn: string;
    data: any;
}

export type OptionsSelect ={
    label:string;
    value:number;
}

export const authorizationSchema=v.object({
    token:v.string(),
    name:v.string(),
    email:v.string(),
    id:v.number(),
    message:v.string()
}) 

export type Authorization=v.InferOutput<typeof  authorizationSchema> 
export const StudentSchema=v.object({
    id:v.number(),
    first_name:v.string(),
    last_name:v.string(),
    email:v.string(),
    phone:v.string(),
    birth_date:v.string(),
    enrollment_date:v.string(),
    user_id:v.number(),
    status:v.number(),
}) 
export type Student=v.InferOutput<typeof  StudentSchema>
export const StudentListSchema = v.array(StudentSchema)
export type StudentList =  v.InferOutput<typeof StudentListSchema>

export type StudentForm=Pick<Student,'birth_date'|'email'|'first_name'|'id'|'phone'|'status'|'last_name'|'user_id'>

export type UserLoginForm={ 
    email: string
    password: string 
}
 