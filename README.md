# StoryWeaver OPDS Frontend

Welcome to the StoryWeaver OPDS Frontend project! This is a React-based web application designed to present a visually appealing, user-friendly catalog of children’s storybooks by parsing and displaying data from the OPDS (Open Publication Distribution System) catalog published by StoryWeaver.

---

## Project Overview

StoryWeaver is an open-source platform offering multilingual children’s storybooks. This project focuses on creating the front-end user interface that allows users to browse, filter, select, and bulk download storybooks from the OPDS catalog XML feeds provided by the backend.

---

## Current Features

- Project initialized with React, React Router, and Axios for API communication.
- Basic routing setup for future scalability.
- Placeholder components setup (e.g., `BookCard`) to display storybook metadata such as title and thumbnail.
- Service layer for API calls to backend endpoints (currently serving hardcoded demo data).
- Basic project structure for components, pages, services, and context for state management.
- Environment-configured for deployment-ready builds.

---

## Tech Stack

- React.js for building interactive UI.
- React Router for client-side routing.
- Axios for handling HTTP requests to the backend API.
- CSS Modules / Styled components for component-level styling (to be implemented).

---

## Setup Instructions

**1. Clone the repository:**

```bash
git clone <repo_url>
cd opds-frontend
```

**2. Install dependencies:**

```bash
npm install
```

**3. Run locally:**

```bash
npm start
```

The app will be available at `http://localhost:3000`.

---

## Folder Structure

```
src/
├── components/       # Reusable UI components such as BookCard
├── pages/            # Page components for routing (e.g., Home, Catalog)
├── services/         # API call functions
├── context/          # React context for global state e.g. cart and filters management
├── App.js            # Main component with routing setup
├── index.js          # Entry point for React rendering
```

---

## Next Steps / To-Do

- Integrate backend API to fetch real OPDS catalog data.
- Implement OPDS XML parsing on backend and expose clean JSON endpoints.
- Develop filtering UI (by language, category, author, reading level, etc.).
- Add cart functionality for bulk story selection and downloading.
- Implement pagination or infinite scrolling for large catalogs.
- Design and apply responsive, accessible styling for better UX.
- Write unit tests and integration tests for UI components.
- Establish CI/CD pipeline for automated testing and deployment.

---

## How to Contribute

- Fork the repo and create feature branches for your tasks.
- Follow coding standards and write clear commit messages.
- Push frequent commits and open pull requests for review.
- Participate in weekly sprint review and planning meetings.

---

## Contacts and Support

For any questions or help, please reach out to:

- Scrum Master: [Abhijith, babhijith58@gmail.com]
- Frontend Lead: [SDK, duwaragesh01@gmail.com]
- Backend Lead: [Nishhith, nnishchit48@gmail.com]
-

Happy coding! Let’s build an amazing OUPOSES catalog UI together!
