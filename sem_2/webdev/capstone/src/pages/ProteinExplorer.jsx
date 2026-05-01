import { useState, useEffect } from 'react';
import axios from 'axios';

const DataField = ({ label, value }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#9ca3af' }}>
      {label}
    </p>
    <div
      className="px-4 py-3 rounded-xl border text-sm font-medium"
      style={{ borderColor: '#e2ddd3', backgroundColor: '#f5f3ee', color: '#1a1a2e' }}
    >
      {value || '—'}
    </div>
  </div>
);

const ProteinExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [proteinData, setProteinData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchTerm.trim().length !== 4) {
      setProteinData(null);
      setError(
        searchTerm.length > 0 && searchTerm.length < 4
          ? 'PDB IDs are exactly 4 characters — keep typing.'
          : ''
      );
      return;
    }

    const timer = setTimeout(() => {
      fetchProteinData(searchTerm);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchProteinData = async (id) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(
        `https://data.rcsb.org/rest/v1/core/entry/${id.toUpperCase()}`
      );
      setProteinData(res.data);
    } catch {
      setError('No structure found. Try IDs like 4HHB, 1A2C, or 1CRN.');
      setProteinData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">

      <div className="mb-8">
        <h1 className="font-serif-display text-3xl mb-1" style={{ color: '#0f1b35' }}>
          Protein Explorer
        </h1>
        <p className="text-sm" style={{ color: '#9ca3af' }}>
          Query live data from the RCSB Protein Data Bank by entering a 4-letter PDB ID.
        </p>
      </div>

      <div
        className="bg-white rounded-2xl p-6 border mb-8"
        style={{ borderColor: '#e2ddd3' }}
      >
        <label
          className="block text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: '#9ca3af' }}
        >
          PDB Structure ID
        </label>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              id="pdb-search-input"
              type="text"
              placeholder="eg. 4HHB"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxLength={4}
              className="w-full px-4 py-3.5 text-xl uppercase font-mono border rounded-xl transition-all focus-yellow"
              style={{
                borderColor: '#e2ddd3',
                backgroundColor: '#f5f3ee',
                color: '#0f1b35',
                letterSpacing: '0.15em',
              }}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium"
              style={{ color: '#c4bbae' }}
            >
              {searchTerm.length}/4
            </span>
          </div>

          {loading && (
            <div className="spinner flex-shrink-0" />
          )}
        </div>

        {error && (
          <p className="mt-3 text-xs font-medium flex items-center gap-1.5" style={{ color: '#b91c1c' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>warning</span>
            {error}
          </p>
        )}
        {!error && !loading && !proteinData && searchTerm.length === 0 && (
          <p className="mt-3 text-xs" style={{ color: '#c4bbae' }}>
            Try{' '}
            <button
              className="font-semibold transition-colors"
              style={{ color: '#92400e' }}
              onClick={() => setSearchTerm('4HHB')}
            >
              4HHB
            </button>{' '}
            (Hemoglobin) or{' '}
            <button
              className="font-semibold transition-colors"
              style={{ color: '#92400e' }}
              onClick={() => setSearchTerm('1CRN')}
            >
              1CRN
            </button>{' '}
            (Crambin)
          </p>
        )}
      </div>

      {proteinData && !loading && (
        <div
          className="bg-white rounded-2xl border overflow-hidden"
          style={{ borderColor: '#e2ddd3' }}
        >
          <div
            className="px-7 py-6 border-b"
            style={{ backgroundColor: '#0f1b35', borderColor: '#1e3a5f' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2
                    className="font-serif-display text-4xl"
                    style={{ color: '#f5c518' }}
                  >
                    {proteinData.rcsb_id}
                  </h2>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(245,197,24,0.15)', color: '#f5c518' }}
                  >
                    Verified
                  </span>
                </div>
                <p className="text-sm font-light italic leading-relaxed" style={{ color: '#94a3b8', maxWidth: '480px' }}>
                  "{proteinData.struct.title}"
                </p>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <p className="text-xs font-medium uppercase mb-1" style={{ color: '#64748b' }}>Resolution</p>
                <p className="text-3xl font-light" style={{ color: '#ffffff' }}>
                  {proteinData.rcsb_entry_info.resolution_combined?.[0] || '—'}
                  <span className="text-base ml-1" style={{ color: '#64748b' }}>Å</span>
                </p>
              </div>
            </div>
          </div>

          <div className="px-7 py-6 grid grid-cols-2 gap-5">
            <DataField
              label="Scientific Organism"
              value={
                proteinData.rcsb_entity_source_organism?.[0]?.ncbi_scientific_name?.[0] ||
                'Synthetic / Unknown'
              }
            />
            <DataField
              label="Molecular Weight"
              value={
                proteinData.rcsb_entry_info.molecular_weight
                  ? `${proteinData.rcsb_entry_info.molecular_weight.toFixed(2)} kDa`
                  : undefined
              }
            />
            <DataField
              label="Deposited"
              value={new Date(proteinData.rcsb_accession_info.deposit_date).toLocaleDateString(
                undefined,
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            />
            <div className="flex flex-col justify-end">
              <a
                href={`https://www.rcsb.org/structure/${proteinData.rcsb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-yellow flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
                style={{ textDecoration: 'none' }}
              >
                Open on RCSB.org
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProteinExplorer;
