import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import CreateProject from './pages/CreateProject';
import MyProjects from './pages/MyProjects';
import RequireAuth from './components/general/RequireAuth';



function App() {
  return(
    <Routes>
      <Route element={<Layout/>}>
        {/* Home.tsx es una página de pruebas: se queda en el repo, pero ya no se muestra */}
        <Route path="/" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/acerca-de" element={<About />} />
        {/* <Route path="/updates" element={<Updates />} /> */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/proyectos"
          element={<RequireAuth><MyProjects /></RequireAuth>}
        />
        {/* HU-01 Crear proyecto */}
        <Route
          path="/proyectos/nuevo"
          element={<RequireAuth><CreateProject /></RequireAuth>}
        />
      </Route>
    </Routes>
  )
}

export default App;
