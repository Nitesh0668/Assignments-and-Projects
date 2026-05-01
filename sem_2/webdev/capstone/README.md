# Health Fold - AI Diagnostic & Protein Research Platform

Health Fold is a medical dashboard designed for researchers and clinicians. It provides a seamless interface for monitoring patient diagnostic data and exploring complex protein structures using live data from the RCSB Protein Data Bank.

## Advanced Feature Set

This project implements several advanced capabilities to ensure a professional-grade user experience:

*   **Dashboard with Charts**: Interactive data visualization using `recharts` to provide at-a-glance insights into patient status distributions and anomaly severities.
*   **Search + Filter + Sort**: A powerful management interface in the Patient Records section, allowing users to search by ID/Name, filter by health status, and sort by various criteria.
*   **Debounced API Calls**: Optimized search performance in the Protein Explorer; it utilizes custom debouncing logic to query the RCSB PDB API efficiently, reducing unnecessary network requests.
*   **Premium UI/UX**: Built with React and Tailwind CSS, featuring a sophisticated "Health Fold" aesthetic, custom iconography, and a responsive sidebar layout.

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
