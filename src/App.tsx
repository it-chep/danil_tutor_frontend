import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { GlobalMessage } from './entities/globalMessage';
import { GlobalLoading } from './entities/globalLoading';
import { useAppSelector } from './app/store/store';
import { useEffect, useRef, useState } from 'react';
import { IMy, myService, useMyActions } from './entities/my';
import { AUTH_ROUTE } from './app/router/routes';
import { LoaderSpinner } from './shared/ui/spinner';

function App() {

  const {isLoading: globalIsLoading} = useAppSelector(s => s.globalLoadingReducer)
  const {globalMessage} = useAppSelector(s => s.globalMessageReducer)
  const [isLoading, setIsLoading] = useState<boolean>(process.env.REACT_APP_USE_AUTH !== "false")
  const {setId, setRole, setIsAuth} = useMyActions()
  const {my} = useAppSelector(s => s.myReducer)

  const {pathname} = useLocation()
  const router = useNavigate()

  const isOne = useRef<boolean>(true)
  useEffect(() => {
    if(isOne.current){
      isOne.current = false;
      return
    }
    if(!my.isAuth){
      router(AUTH_ROUTE.path)
    }
  }, [my.isAuth])

  useEffect(() => {
    window.scrollTo({top: 0})
  }, [pathname])

  const auth = async () => {
    try{
      setIsLoading(true)
      const user = await myService.getInfo()
      setId(user.id)
      setRole(user.role)
      setIsAuth(true)
    } 
    catch(e){
      router(AUTH_ROUTE.path) 
      console.log(e)
    }
    finally{
      setTimeout(() => setIsLoading(false))
    }
  }

  useEffect(() => {
    if(process.env.REACT_APP_USE_AUTH === "false"){
      process.env.REACT_APP_ROLE && setRole(process.env.REACT_APP_ROLE as IMy['role'])
      process.env.REACT_APP_ID && setId(+process.env.REACT_APP_ID)
      setIsAuth(true)
    }
    else{
      auth()
    }
  }, [])

  return (
    <div className="App">
      {
        isLoading
          ?
        <section className={"loader_main"}><LoaderSpinner /></section>
          :
        <>
          <Outlet />
          { globalMessage.message && <GlobalMessage /> }
          { globalIsLoading && <GlobalLoading /> }
        </>
      }
    </div>
  );
}

export default App;
