import { Link, Navigate, Outlet } from 'react-router-dom' 
import Logo from '../components/Logo'
import { useUserStore } from '../store/user.store'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Backdrop, CircularProgress } from '@mui/material';
import { useGeneralStore } from '../store/general.store';
import { useEffect } from 'react';

export default function AppLayout() { 
    const isAuthenticated=useUserStore(state=>state.isAuthenticated)
    const logout=useUserStore(state=>state.logout)
    const authorization=useUserStore(state=>state.authorization)
    const validateToken=useUserStore(state=>state.validateToken)
    const backdrop=useGeneralStore(state=>state.backdrop) 

    useEffect(()=>{
        validateToken()
    },[])
     if (!isAuthenticated) { 
        return <Navigate to="/auth/login" replace />;
    }
    return (
        <>
            <header className='bg-orange-400 py-5'>
                <div className=' max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='w-64'>
                        <Link to={'/'}>
                            <Logo/>
                        </Link>
                    </div> 
                    <div className=' w-64 flex justify-end me-3 items-center ' style={{}}>
                        <p className='text-white font-bold me-2'><AccountCircleIcon/>{authorization.name}</p>
                        <button 
                        onClick={()=>logout()}
                        className='bg-orange-600 hover:bg-orange-700 text-white font-bold p-2 rounded-lg '>Logout</button>
                    </div>
                </div>
            </header>

            <section className='max-w-screen-2xl mx-auto mt-10 p-5'>
                <Outlet />
            </section>

            <footer className='py-5'>
                <p className='text-center  font-bold'>
                    Todos los derechos reservados {new Date().getFullYear()}
                </p>
            </footer>

            <Backdrop
                sx={() => ({ color: '#fff', zIndex: 999999999,})} 
                open={backdrop} 
            >
                <CircularProgress color="inherit" />
            </Backdrop>
 
        </>
    )
}
