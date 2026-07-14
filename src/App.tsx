import { useAuthStore } from './store/auth.store'
// import { Routes, Route } from 'react-router-dom'
// import Layout from './components/layout'
// import Home from './pages/Home'
// import About from './pages/About'
// import Updates from './pages/Updates'
// import Login from './pages/Login'


function App() {
    // <Routes>
    //   <Route element={<Layout />}>
    //     <Route path="/" element={<Home />} />
    //     {/* <Route path="/about" element={<About />} />
    //     <Route path="/updates" element={<Updates />} />
    //     <Route path="/login" element={<Login />} /> */}
    //   </Route>
    // </Routes>

  const { isAuthenticated, login, logout, user } = useAuthStore()

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center gap-4">
      <h1 className="font-display text-4xl text-ink-text">
        {isAuthenticated ? `Hola, ${user?.mail}` : 'No autenticado'}
      </h1>
      <button
        className="bg-oxblood text-paper px-4 py-2 rounded"
        onClick={() => login('fake-token', { uid: 1, mail: 'prueba@sirec.com', roles: ['author'] })}
      >
        Simular login
      </button>
      <button className="text-ink-text underline" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  )
}

export default App



/*
  const { isAuthenticated, login, logout, user } = useAuthStore()

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center gap-4">
      <h1 className="font-display text-4xl text-ink-text">
        {isAuthenticated ? `Hola, ${user?.mail}` : 'No autenticado'}
      </h1>
      <button
        className="bg-oxblood text-paper px-4 py-2 rounded"
        onClick={() => login('fake-token', { uid: 1, mail: 'prueba@sirec.com', roles: ['author'] })}
      >
        Simular login
      </button>
      <button className="text-ink-text underline" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  )
*/