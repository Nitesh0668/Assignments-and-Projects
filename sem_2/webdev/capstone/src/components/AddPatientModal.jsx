import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPatient } from '../store/diagnosticSlice';

const FormField = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: '#9ca3af' }}>
      {label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  backgroundColor: '#f5f3ee',
  border: '1px solid #e2ddd3',
  color: '#1a1a2e',
  borderRadius: '10px',
  width: '100%',
  padding: '10px 14px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const AddPatientModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    proteinAnomaly: 'Low',
    status: 'Stable',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPatient({
      ...formData,
      id: Date.now().toString(),
      lastScan: new Date().toISOString().split('T')[0],
    }));
    setFormData({ name: '', age: '', proteinAnomaly: 'Low', status: 'Stable' });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#f5c518';
    e.target.style.boxShadow = '0 0 0 3px rgba(245, 197, 24, 0.25)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#e2ddd3';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ backgroundColor: 'rgba(15, 27, 53, 0.5)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: '#e2ddd3' }}
        >
          <div>
            <h2 className="font-serif-display text-xl" style={{ color: '#0f1b35' }}>
              New Patient Record
            </h2>
            <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>
              Fill in the diagnostic details below
            </p>
          </div>
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <FormField label="Patient Name">
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="e.g. Tushar"
              style={inputStyle}
            />
          </FormField>

          <FormField label="Age">
            <input
              required
              type="number"
              name="age"
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="e.g. 45"
              style={inputStyle}
            />
          </FormField>

          <FormField label="AI Protein Anomaly">
            <select
              name="proteinAnomaly"
              value={formData.proteinAnomaly}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
            >
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
          </FormField>

          <FormField label="Current Status">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
            >
              <option value="Stable">Stable</option>
              <option value="Monitoring">Monitoring</option>
              <option value="Critical">Critical</option>
            </select>
          </FormField>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{ backgroundColor: '#f5f3ee', color: '#6b7280' }}
            >
              Cancel
            </button>
            <button
              id="save-patient-btn"
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold btn-yellow"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
