import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Layout from './components/Layout'
import ForgotPassword from './pages/ForgotPassword';



function App() {
  return(
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/updates" element={<Updates />} /> */}
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App;