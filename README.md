# Electronic Music Blog

This is a web application built using **Next.js** and **React**. It features an interactive music player with a visualizer and a blog section for articles. This README provides a comprehensive guide to setting up, running, and deploying the project locally.

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Libraries Used](#libraries-used)
- [Vercel Deployment](#vercel-deployment)

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

## Libraries Used

The following libraries are used in this project:

### Core Dependencies
- `next` (v15.0.3)
- `react` (v18.2.0)
- `react-dom` (v18.2.0)
- `contentful` (v11.3.1)
- `marked` (v15.0.3)
- `howler` (v2.2.4)
- `react-audio-visualize` (v1.2.0)
- `react-player` (v2.16.0)
- `dompurify` (v3.2.3)
- `he` (v1.2.0)
- `jsdom` (v25.0.1)
- `date-fns` (v4.1.0)
- `nodemailer` (v6.9.16)

### Dev Dependencies
- `typescript` (v5)
- `eslint` (v8)
- `eslint-config-next` (v15.0.3)
- `@types/react` (v18)
- `@types/react-dom` (v18)
- `@types/node` (v20)
- `@types/nodemailer` (v6.4.17)
- `@types/he` (v1.2.3)

---

## Vercel Deployment

The application is deployed to Vercel at the following URL:
[desn3035-assignment3.vercel.app](https://desn3035-assignment3.vercel.app)

### Steps to Deploy to Vercel

1. **Install the Vercel CLI (optional):**
   ```bash
   npm install -g vercel
   ```

2. **Deploy the Project:**
   ```bash
   vercel
   ```

3. Follow the interactive prompts to set up your deployment.

Once deployed, any updates pushed to the main branch will automatically trigger a redeployment on Vercel.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments
Special thanks to the developers and designers who contributed to the tools and libraries used in this project.

