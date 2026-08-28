import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stays" element={<SearchResultsPage />} />
    </Routes>
  )
}

export default App