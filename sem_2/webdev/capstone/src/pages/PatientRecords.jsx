import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePatient } from '../store/diagnosticSlice';
import AddPatientModal from '../components/AddPatientModal';

const anomalyStyle = {
  High: { backgroundColor: '#fef2f2', color: '#b91c1c' },
  Medium: { backgroundColor: '#fef9e7', color: '#92400e' },
  Low: { backgroundColor: '#f0fdf4', color: '#15803d' },
};

const statusDot = {
  Critical: 'bg-red-400',
  Monitoring: 'bg-yellow-400',
  Stable: 'bg-green-400',
};

const PatientRecords = () => {
  const patients = useSelector((state) => state.diagnostics.patients);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOption, setSortOption] = useState('name-asc');

  const filteredAndSortedPatients = [...patients]
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'All' || p.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
      if (sortOption === 'age-asc') return a.age - b.age;
      if (sortOption === 'age-desc') return b.age - a.age;
      return 0;
    });

  return (
    <div className="p-8 max-w-5xl mx-auto">

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-serif-display text-3xl mb-1" style={{ color: '#0f1b35' }}>
            Patient Records
          </h1>
          <p className="text-sm" style={{ color: '#9ca3af' }}>
            Manage and monitor patient diagnostic data.
          </p>
        </div>
        <button
          id="add-patient-btn"
          onClick={() => setIsModalOpen(true)}
          className="btn-yellow flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          Add Patient
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: '20px' }}>search</span>
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#f5c518] focus:ring-1 focus:ring-[#f5c518] transition-all"
            style={{ borderColor: '#e2ddd3', backgroundColor: '#ffffff' }}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium" style={{ color: '#6b7280' }}>Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#f5c518] transition-all bg-white"
            style={{ borderColor: '#e2ddd3' }}
          >
            <option value="All">All Statuses</option>
            <option value="Stable">Stable</option>
            <option value="Monitoring">Monitoring</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium" style={{ color: '#6b7280' }}>Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#f5c518] transition-all bg-white"
            style={{ borderColor: '#e2ddd3' }}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="age-asc">Age (Lowest)</option>
            <option value="age-desc">Age (Highest)</option>
          </select>
        </div>
      </div>

      <div
        className="bg-white rounded-2xl border overflow-hidden"
        style={{ borderColor: '#e2ddd3' }}
      >
        {filteredAndSortedPatients.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-4xl mb-4" style={{ color: '#c4bbae' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>assignment</span>
            </p>
            <p className="font-medium text-sm" style={{ color: '#9ca3af' }}>
              No records found. Try adjusting your filters or click <strong style={{ color: '#1a1a2e' }}>Add Patient</strong>.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead style={{ backgroundColor: '#f5f3ee', borderBottom: '1px solid #e2ddd3' }}>
                <tr>
                  {['Patient', 'Age', 'AI Anomaly', 'Status', ''].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: '#9ca3af' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedPatients.map((patient, i) => (
                  <tr
                    key={patient.id}
                    className="table-row-hover transition-colors"
                    style={{ borderBottom: i < filteredAndSortedPatients.length - 1 ? '1px solid #f0ece4' : 'none' }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ backgroundColor: '#fef9e7', color: '#92400e' }}
                        >
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: '#1a1a2e' }}>{patient.name}</p>
                          <p className="text-xs" style={{ color: '#c4bbae' }}>#{patient.id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: '#6b7280' }}>
                      {patient.age}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={anomalyStyle[patient.proteinAnomaly] || anomalyStyle.Low}
                      >
                        {patient.proteinAnomaly}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${statusDot[patient.status] || 'bg-gray-400'} ${patient.status === 'Critical' ? 'live-dot' : ''}`}></span>
                        <span className="text-sm" style={{ color: '#6b7280' }}>{patient.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => dispatch(deletePatient(patient.id))}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all hover:bg-red-50 hover:text-red-600"
                        style={{ color: '#c4bbae' }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddPatientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PatientRecords;
