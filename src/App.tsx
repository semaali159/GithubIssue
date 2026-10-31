import Header from "./components/layout/Header";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <AppRoutes/>
    </div>

  )
}

export default App
