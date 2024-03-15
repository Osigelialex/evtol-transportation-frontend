import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Sidenav from './Components/Sidenav'
import Register from './Pages/Register'
import Medications from './Pages/Medications'
import EvtolManagement from './Pages/EvtolManagement'
import Delivery from './Pages/Delivery'
import LoadMedications from './Pages/loadMedications'

function App() {
  return (
    <div className='min-h-full font-poppins'>
      <Router>
        <Sidenav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="register" element={<Register />} />
          <Route path="evtol-management" element={<EvtolManagement /> } />
          <Route path="medications" element={<Medications />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="load-medications" element={<LoadMedications /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
