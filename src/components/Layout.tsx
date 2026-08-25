import { Outlet } from 'react-router-dom'
import {NavBar} from './general/NavBar'

function Layout() {
  const links = [
    {
      to: '/',
      label: 'Inicio'
    },
    {
      to: '/Different',
      label: 'Different'
    }
  ]
  
  return (
    <>
      <NavBar links={links} />
      <Outlet></Outlet>
    </>
  )
}

export default Layout