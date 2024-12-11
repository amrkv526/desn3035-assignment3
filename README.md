# Featured Songs & Articles Blog

This is a web application built using **Next.js** and **React**. It features an interactive music player with a visualizer and a blog section for articles. This README provides a comprehensive guide to setting up, running, and deploying the project locally.

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- A text editor or IDE (e.g., VSCode)

---

## Getting Started

### Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies:**
   Run the following command to install the required packages:
   ```bash
   npm install
   ```

3. **Set up the Environment:**
   Create a `.env.local` file in the root directory with any required environment variables (e.g., Contentful API keys).

---

### Running the Project

#### Development Mode
Run the development server:
```bash
npm run dev
```
Open your browser and navigate to: `http://localhost:3000`

#### Build and Production
1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

---

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables (if applicable):

```env
CONTENTFUL_SPACE_ID=<your-contentful-space-id>
CONTENTFUL_ACCESS_TOKEN=<your-contentful-access-token>
```

### Contentful Setup
To fetch articles from Contentful, ensure you have a Contentful space with a `blogPosts` content type.

---

## Deployment

The application can be deployed to platforms like **Vercel** or **Netlify**.

### Deploying to Vercel

1. Install the Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

3. Follow the interactive prompts to set up your deployment.

### Deploying to GitHub Pages

1. Add a GitHub Actions workflow for deployment.
2. Ensure the `GITHUB_TOKEN` has the `id-token: write` permission.

---

## Dependencies

### Core Dependencies
- `next` (v15.0.3)
- `react` (v18.2.0)
- `react-dom` (v18.2.0)
- `contentful` (v11.3.1)
- `marked` (v15.0.3)

### Dev Dependencies
- `typescript` (v5)
- `eslint` (v8)
- `@types/react` (v18)

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments
Special thanks to the developers and designers who contributed to the tools and libraries used in this project.

