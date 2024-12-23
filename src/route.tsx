import { BrowserRouter, Routes, Route } from 'react-router-dom'  
import { Login } from './views/auth/Login' 
import NotFound from './views/404/NotFound' 
import ListStudent from './views/student/ListStudent' 
import AppLayout from './layout/AppLayout'
import AuthLayout from './layout/AuthLayout'
 
export default function Router (){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <AppLayout/> }>
                    <Route path='/' element={ <ListStudent/> } /> 
                </Route>
                <Route element={ <AuthLayout/> }>
                    <Route path='/auth/login' element={ <Login/> } index />    
                </Route>
                <Route element={ <AuthLayout/> }>
                    <Route path='*' element={ <NotFound/> } />  
                </Route>
            </Routes>
        </BrowserRouter>
    )
}