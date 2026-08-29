import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PropertyDetailsPage from './pages/PropertyDetailsPage'
import SearchResultsPage from './pages/SearchResultsPage'
import CheckoutPage from './pages/CheckoutPage'
import ReviewPage from './pages/ReviewPage'
import ConfirmationPage from './pages/ConfirmationPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stays" element={<SearchResultsPage />} />
      <Route path="/stays/:id" element={<PropertyDetailsPage />} />
      <Route path="/stays/:id/checkout" element={<CheckoutPage />} />
      <Route path="/stays/:id/review" element={<ReviewPage />} />
      <Route path="/stays/:id/confirmation" element={<ConfirmationPage />} />
    </Routes>
  )
}

export default App