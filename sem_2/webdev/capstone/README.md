# ⚕️ Health Fold (Diagnostic & Protein Research Platform)

Health Fold is a medical dashboard designed for researchers and clinicians. It provides a seamless interface for monitoring patient diagnostic data and exploring complex protein structures using live data from the RCSB Protein Data Bank.

## Advanced Feature Set

This project implements several advanced capabilities to ensure a professional-grade user experience:

*   **Dashboard with Charts**: Interactive data visualization using `recharts` to provide at-a-glance insights into patient status distributions and anomaly severities.
*   **Search + Filter + Sort**: A powerful management interface in the Patient Records section, allowing users to search by ID/Name, filter by health status, and sort by various criteria.
*   **Debounced API Calls**: Optimized search performance in the Protein Explorer; it utilizes custom debouncing logic to query the RCSB PDB API efficiently, reducing unnecessary network requests.
*   **UI/UX**: Built with React and Tailwind CSS, featuring a sophisticated "Health Fold" aesthetic, custom iconography, and a responsive sidebar layout.

## Technical Stack

- **Frontend**: React (Vite)
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Data Visualization**: Recharts
- **Styling**: Tailwind CSS
- **API**: RCSB Protein Data Bank API

## Features

- **Diagnostic Dashboard**: Visual summary of critical patient data and AI-generated notifications.
- **Protein Explorer**: Live lookup of PDB structures with detailed molecular metadata.
- **Patient Management**: Full CRUD capabilities for managing patient records with advanced filtering.
- **Modern Branding**: Custom-designed logo and typography for a professional medical research look.



## Dashboard: 
<img width="1359" height="950" alt="healthfold netlify app_" src="https://github.com/user-attachments/assets/bb2b7914-4e0f-4a72-8fe8-e5eafe3fea01" />

## Api Data fetching page:
<img width="1359" height="950" alt="healthfold netlify app_ (1)" src="https://github.com/user-attachments/assets/b1c9483a-9a15-49b9-aa8c-23363f27945e" />

## Api Data Demo:
<img width="1429" height="6202" alt="www rcsb org_structure_4HHB" src="https://github.com/user-attachments/assets/ce07100c-d884-414f-97e8-0970470e0dfa" />



