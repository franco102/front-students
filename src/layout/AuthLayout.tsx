import { Outlet } from 'react-router-dom' 
import Logo from '../components/Logo'
import { Backdrop, CircularProgress } from '@mui/material'
import { useGeneralStore } from '../store/general.store'

export default function AuthLayout() {
  const backdrop=useGeneralStore(state=>state.backdrop)
  return (
    <>
        <div className='bg-orange-400 min-h-screen'>
            <div className='py-10 lg:py-20 mx-auto w-[450px]'>
                <Logo />
                <div className='mt-10'>
                    <Outlet />
                </div>
            </div>
        </div> 

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={backdrop} 
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}
