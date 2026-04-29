import React, { useState } from 'react';
import './App.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-subtitle">
        ACADEMIC TERMINAL V2
      </div>
      <h1 className="header-title">
        STUDENT <span className="highlight">SCOREBOARD</span>
      </h1>
    </header>
  );
};

const AddStudentForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || score === '') return;
    onAdd(name, parseInt(score, 10));
    setName('');
    setScore('');
  };

  return (
    <div className="panel form-panel">
      <div className="panel-header">
        <div className="panel-title">
          <span className="dot cyan-dot"></span> REGISTER STUDENT
        </div>
        <div className="panel-subtitle">NEW ENTRY</div>
      </div>
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Score (0-100)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          min="0"
          max="100"
          required
        />
        <button type="submit" className="add-btn">+ ADD</button>
      </form>
    </div>
  );
};

const StudentRow = ({ student, onUpdate }) => {
  const [editScore, setEditScore] = useState(student.score);
  const isPass = student.score >= 40;

  const handleUpdate = () => {
    onUpdate(student.id, parseInt(editScore, 10));
  };

  return (
    <div className={`table-row ${isPass ? 'row-pass' : 'row-fail'}`}>
      <div className="col name-col">{student.name}</div>
      <div className="col score-col">{student.score}</div>
      <div className="col status-col">
        <div className={`status-badge ${isPass ? 'badge-pass' : 'badge-fail'}`}>
          <span className="status-dot"></span> {isPass ? 'PASS' : 'FAIL'}
        </div>
      </div>
      <div className="col update-col">
        <input
          type="number"
          className="update-input"
          value={editScore}
          onChange={(e) => setEditScore(e.target.value)}
          min="0"
          max="100"
        />
        <button className="save-btn" onClick={handleUpdate}>SAVE</button>
      </div>
    </div>
  );
};

const StudentTable = ({ students, onUpdate }) => {
  return (
    <div className="panel table-panel">
      <div className="panel-header">
        <div className="panel-title">STUDENT RECORDS</div>
        <div className="panel-subtitle highlight-text">{students.length} entries</div>
      </div>
      <div className="table-container">
        <div className="table-header">
          <div className="col name-col">NAME</div>
          <div className="col score-col">SCORE</div>
          <div className="col status-col">STATUS</div>
          <div className="col update-col">UPDATE</div>
        </div>
        <div className="table-body">
          {students.map((student) => (
            <StudentRow key={student.id} student={student} onUpdate={onUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Aman', score: 78 },
    { id: 2, name: 'Riya', score: 45 },
    { id: 3, name: 'Karan', score: 90 },
    { id: 4, name: 'Neha', score: 32 },
    { id: 5, name: '55', score: 54 },
  ]);

  const handleAddStudent = (name, score) => {
    const newStudent = {
      id: Date.now(),
      name,
      score,
    };
    setStudents([...students, newStudent]);
  };

  const handleUpdateScore = (id, newScore) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, score: newScore } : student
      )
    );
  };

  const totalStudents = students.length;
  const passedStudents = students.filter((s) => s.score >= 40).length;
  const avgScore = totalStudents
    ? Math.round(students.reduce((acc, curr) => acc + curr.score, 0) / totalStudents)
    : 0;

  return (
    <div className="app-wrapper">
      <div className="container">
        <Header />
        
        <AddStudentForm onAdd={handleAddStudent} />

        <div className="stats-grid">
          <div className="panel stat-card">
            <div className="stat-label">TOTAL</div>
            <div className="stat-value">{totalStudents}</div>
          </div>
          <div className="panel stat-card">
            <div className="stat-label">PASSED</div>
            <div className="stat-value">{passedStudents}</div>
          </div>
          <div className="panel stat-card">
            <div className="stat-label">AVG SCORE</div>
            <div className="stat-value">{avgScore}</div>
          </div>
        </div>

        <StudentTable students={students} onUpdate={handleUpdateScore} />

        <footer className="footer">
          ACADEMIC
        </footer>
      </div>
    </div>
  );
}

export default App;
