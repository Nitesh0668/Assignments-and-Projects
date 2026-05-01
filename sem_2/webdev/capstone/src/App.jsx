import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProteinExplorer from './pages/ProteinExplorer';
import PatientRecords from './pages/PatientRecords';

const NavLink = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
        ? 'nav-link-active shadow-sm'
        : 'text-gray-500 hover:bg-[#ede9e0] hover:text-[#0f1b35]'
        }`}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{icon}</span>
      {label}
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div className="flex h-screen" style={{ backgroundColor: '#f5f3ee' }}>

        <aside
          className="w-64 flex-shrink-0 flex flex-col border-r"
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#e2ddd3',
          }}
        >
          <div className="px-6 py-7 border-b" style={{ borderColor: '#e2ddd3' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
                <img src="/health_fold_logo.png" alt="Health Fold Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-serif-display text-lg leading-tight" style={{ color: '#0f1b35' }}>
                  Health Fold
                </p>
                <p className="text-[10px] font-medium" style={{ color: '#9ca3af' }}>
                  AI Diagnostic and protein research Platform
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest px-4 mb-3" style={{ color: '#9ca3af' }}>
              Navigation
            </p>
            <NavLink to="/" icon="monitoring" label="Dashboard" />
            <NavLink to="/explorer" icon="biotech" label="Protein Explorer" />
            <NavLink to="/patients" icon="assignment" label="Patient Records" />
          </nav>

          <div className="px-4 pb-6">
            <div
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl border"
              style={{ borderColor: '#e2ddd3', backgroundColor: '#f5f3ee' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: '#f5c518', color: '#0f1b35' }}
              >
                DR
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate" style={{ color: '#1a1a2e' }}>Dr. Doc</p>
                <p className="text-xs truncate" style={{ color: '#9ca3af' }}>Researcher</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/explorer" element={<ProteinExplorer />} />
            <Route path="/patients" element={<PatientRecords />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
