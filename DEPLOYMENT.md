
# Deployment Guide - Netlify (No Docker)

This guide explains how to deploy the Blackcoffer Dashboard to Netlify.

## Prerequisites

1.  **Netlify Account**: [Sign up here](https://www.netlify.com/).
2.  **MongoDB Atlas Account**: You **MUST** use a cloud database (local MongoDB won't work).
    - Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    - Whitelist IP `0.0.0.0/0` (Network Access) so Netlify can connect.
    - Get your connection URI: `mongodb+srv://<user>:<password>@cluster...`

## Project Adaptation
The project has been adapted for Netlify:
- **Frontend**: Deployed as a standard Next.js site.
- **Backend**: Runs as a **Netlify Function** (`/.netlify/functions/api`).
- **Configuration**: `netlify.toml` handles the redirects from `/api/*` to the function.

## Deployment Steps

### Method 1: Netlify CLI (Recommended for manual deploy)

1.  **Install Netlify CLI**:
    ```bash
    npm install -g netlify-cli
    ```

2.  **Login**:
    ```bash
    netlify login
    ```

3.  **Deploy**:
    Run this from the root directory:
    ```bash
    netlify deploy --prod
    ```
    - **Build settings**: It should auto-detect from `netlify.toml`.
    - **Publish directory**: `.next` (or let it detect).

### Method 2: GitPush (Continuous Deployment)

1.  Push your code to a GitHub repository.
2.  Go to Netlify Dashboard -> "Add new site" -> "Import an existing project".
3.  Select your repository.
4.  **Build Settings** (should auto-fill from `netlify.toml`):
    - **Base directory**: `frontend`
    - **Build command**: `npm run build`
    - **Publish directory**: `.next`
    - **Functions directory**: `backend/src/functions`

## Environment Variables

You **MUST** set these in Netlify (Site Settings -> Environment Variables):

| Key | Value | Description |
| :--- | :--- | :--- |
| `MONGODB_URI` | `mongodb+srv://...` | **REQUIRED**. Cloud MongoDB connection string. |
| `NODE_ENV` | `production` | Optimization mode. |
| `NEXT_PUBLIC_API_URL`| `/api` | **IMPORTANT**. Relative path allows the proxy to work. |

## Troubleshooting

-   **Database Connection Failed**:
    -   Check if your MongoDB Atlas IP whitelist allows usage from anywhere (`0.0.0.0/0`).
    -   Verify credentials in `MONGODB_URI`.
-   **API 404 Errors**:
    -   Ensure `netlify.toml` is in the **ROOT** directory.
    -   Ensure `/api/*` redirects to `/.netlify/functions/api/:splat`.
