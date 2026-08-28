import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PropertyDetailsPage from './pages/PropertyDetailsPage'
import SearchResultsPage from './pages/SearchResultsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stays" element={<SearchResultsPage />} />
      <Route path="/stays/:id" element={<PropertyDetailsPage />} />
    </Routes>
  )
}

export default App