import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const StatCard = ({ icon, label, value, badge, badgeColor }) => (
  <div
    className="bg-white rounded-2xl p-6 border card-hover stat-card-yellow"
    style={{ borderColor: '#e2ddd3' }}
  >
    <div className="flex items-start justify-between mb-4">
      <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>{icon}</span>
      {badge && (
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
          style={badgeColor}
        >
          {badge}
        </span>
      )}
    </div>
    <p className="text-sm font-medium mb-1" style={{ color: '#9ca3af' }}>{label}</p>
    <p className="text-4xl font-bold tracking-tight" style={{ color: '#0f1b35' }}>{value}</p>
  </div>
);

const ActivityItem = ({ icon, title, desc, time }) => (
  <div className="flex items-start gap-4 py-4 border-b last:border-0" style={{ borderColor: '#f0ece4' }}>
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
      style={{ backgroundColor: '#fef9e7' }}
    >
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold" style={{ color: '#1a1a2e' }}>{title}</p>
      <p className="text-xs mt-0.5 truncate" style={{ color: '#9ca3af' }}>{desc}</p>
    </div>
    <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: '#c4bbae' }}>{time}</span>
  </div>
);

const Dashboard = () => {
  const patients = useSelector((state) => state.diagnostics.patients);

  const totalPatients = patients.length;
  const criticalPatients = patients.filter(p => p.status === 'Critical').length;
  const highAnomaly = patients.filter(p => p.proteinAnomaly === 'High').length;

  const statusData = [
    { name: 'Critical', value: criticalPatients, color: '#f87171' },
    { name: 'Monitoring', value: patients.filter(p => p.status === 'Monitoring').length, color: '#facc15' },
    { name: 'Stable', value: patients.filter(p => p.status === 'Stable').length, color: '#4ade80' },
  ].filter(item => item.value > 0);

  const anomalyData = [
    { name: 'Low', count: patients.filter(p => p.proteinAnomaly === 'Low').length },
    { name: 'Medium', count: patients.filter(p => p.proteinAnomaly === 'Medium').length },
    { name: 'High', count: highAnomaly },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">

      <div className="mb-10">
        <h1 className="font-serif-display text-3xl mb-1" style={{ color: '#0f1b35' }}>
          Good morning, Dr. Doc
        </h1>
        <p className="text-sm" style={{ color: '#9ca3af' }}>
          Here's what's happening with your patients today.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <StatCard
          icon="group"
          label="Total Monitored"
          value={totalPatients}
          badge={<><span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_upward</span> 12%</>}
          badgeColor={{ backgroundColor: '#fef9e7', color: '#92400e' }}
        />
        <StatCard
          icon="warning"
          label="Critical Status"
          value={criticalPatients}
          badge="Stable"
          badgeColor={{ backgroundColor: '#f0fdf4', color: '#15803d' }}
        />
        <StatCard
          icon="biotech"
          label="High AI Anomaly"
          value={highAnomaly}
          badge={<><span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_upward</span> 2 new</>}
          badgeColor={{ backgroundColor: '#fef2f2', color: '#b91c1c' }}
        />
      </div>

      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#e2ddd3' }}>
          <h2 className="font-semibold text-base mb-4" style={{ color: '#1a1a2e' }}>Patient Status Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#e2ddd3' }}>
          <h2 className="font-semibold text-base mb-4" style={{ color: '#1a1a2e' }}>Anomaly Severity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={anomalyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ece4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip cursor={{ fill: '#fef9e7' }} />
                <Bar dataKey="count" fill="#f5c518" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">

        <div
          className="col-span-1 rounded-2xl p-6 border"
          style={{ backgroundColor: '#04070bff', borderColor: '#0f1b35' }}
        >
          <h2 className="font-semibold text-base mb-5" style={{ color: '#f5c518' }}>
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/explorer"
              className="flex items-center justify-between p-4 rounded-xl group transition-all"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(245,197,24,0.12)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'}
            >
              <div>
                <p className="text-sm font-semibold text-white">Protein Explorer</p>
                <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>Search PDB structures</p>
              </div>
              <span className="material-symbols-outlined text-white/40 group-hover:translate-x-1 transition-transform" style={{ fontSize: '18px' }}>arrow_forward</span>
            </Link>
            <Link
              to="/patients"
              className="flex items-center justify-between p-4 rounded-xl group transition-all"
              style={{ backgroundColor: '#f5c518' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e0b015'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f5c518'}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: '#0f1b35' }}>Patient Records</p>
                <p className="text-xs mt-0.5" style={{ color: '#5a4200' }}>View diagnostic data</p>
              </div>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ color: '#0f1b35', fontSize: '18px' }}>arrow_forward</span>
            </Link>
          </div>
        </div>

        <div
          className="col-span-2 bg-white rounded-2xl p-6 border flex flex-col"
          style={{ borderColor: '#e2ddd3' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-base" style={{ color: '#1a1a2e' }}>System Notifications</h2>
            <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '20px' }}>notifications</span>
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ borderColor: '#f0ece4', backgroundColor: '#faf9f6' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>update</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Platform Update Scheduled</h3>
                <p className="text-xs text-gray-500">System maintenance is scheduled for tomorrow at 2:00 AM EST. Expected downtime is 15 minutes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ borderColor: '#f0ece4', backgroundColor: '#faf9f6' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-50 text-green-600 flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>verified_user</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Security Audit Passed</h3>
                <p className="text-xs text-gray-500">The monthly HIPAA compliance and data security audit was completed successfully with no issues found.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
