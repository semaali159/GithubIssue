# GitHub Issue Browser

A frontend application built with **React, TypeScript, and Vite** for browsing issues and comments from a GitHub repository.

## Features

- Display issues with title, state, author, date, labels, and comment count.
- Filter issues by state: open or closed.
- Search issue titles and descriptions using the GitHub Search API.
- Paginated results.
- Standalone issue detail page, including the description, labels, metadata, and comments.
- Markdown rendering for issue descriptions and comments.
- Loading states, error messages, and empty search results.
- Responsive design.

## Requirements

- A recent version of Node.js that supports the Vite version used in the project.
- npm.

## Running Locally

```bash
npm install
npm run dev
```

Open the development URL shown in the terminal, usually `http://localhost:5173`.

## Project Scripts

```bash
npm run dev      # Start the development server
npm run build    # Type-check with TypeScript and build for production
npm run preview  # Preview the production build locally
npm run lint     # Lint the code with ESLint
```

## GitHub API

The app uses the public GitHub REST API and does not require an API key for public requests, within the allowed rate limits.

The file responsible for requests and data transformations:

```text
src/features/issues/api/issuesApi.ts
```

The repository is set in the `REPO` constant inside this file. To target the official React repository, it should be:

```ts
const REPO = "facebook/react";
```

API endpoints used:

- Search issues: `/search/issues`
- Issue details: `/repos/{owner}/{repo}/issues/{issue_number}`
- Issue comments: `/repos/{owner}/{repo}/issues/{issue_number}/comments`

Currently, the app fetches the first 30 comments for each issue. If there are more comments, a link to view them on GitHub is shown.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- GitHub REST API
- React Markdown and Remark GFM
- Lucide React for icons

## Notes

- This project uses React with Vite, not Next.js.
- The public GitHub API enforces limits on the number of requests and results, so a rate-limit message may appear when making many requests.
- If you deploy the app to static hosting, make sure to configure route redirects to `index.html` so that issue detail links work when opened directly.