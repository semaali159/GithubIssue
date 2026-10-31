import { Link, Route, Routes } from 'react-router-dom'
import IssueDetailsPage from '../features/issues/pages/IssueDetailsPage'
import IssuesPage from '../features/issues/pages/IssuesPage'

const AppRoutes = () => {
  return (
       <Routes>
        <Route path="/" element={<IssuesPage />} />
        <Route path="/issues/:number" element={<IssueDetailsPage />} />
        <Route
          path="*"
          element={
            <main className="mx-auto max-w-4xl px-4 py-20 text-center">
              <h1 className="text-2xl font-bold">Page not found</h1>
              <Link to="/" className="mt-4 inline-block font-medium text-blue-700 underline">
                Back to issues
              </Link>
            </main>
          }
        />
      </Routes>
  )
}

export default AppRoutes