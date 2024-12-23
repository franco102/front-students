 
import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router-dom' 
import { UserLoginForm } from '../../types'
import ErrorMessage from '../../components/ErrorMessage'
import { useUserStore } from '../../store/user.store'

export const Login = () => {
    const initialValues: UserLoginForm = {
        email: '',
        password: '',
      }
      const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
      const navigate = useNavigate()
      const login=useUserStore(state=>state.login)
      const handleLogin = async (formData: UserLoginForm) => {
        await login(formData.email, formData.password,navigate) 
      }
  return (
    <>
        <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
        <p className="text-2xl font-light text-white mt-5">
            Comienza a gestionar a tus Estudiantes {''}
            <span className=" text-orange-800 font-bold"> iniciando sesión en este formulario</span>
        </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-orange-600 hover:bg-orange-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
 
    </>
  )
}
