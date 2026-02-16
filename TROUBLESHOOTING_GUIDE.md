# 🛠️ Dashboard Setup Troubleshooting Guide

If you're seeing errors like `S_PSSecurityException` or `ECONNREFUSED`, follow these steps to fix your environment.

## 1. Fix PowerShell Execution Policy Error
**Error:** `File ...\npm.ps1 cannot be loaded because running scripts is disabled on this system.`

**Solution:**
You need to allow script execution in PowerShell.

1.  Open **PowerShell as Administrator** (Search "PowerShell" -> Right click -> Run as Administrator).
2.  Run this command:
    ```powershell
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```
3.  Type `Y` and press Enter to confirm.
4.  Close the Administrator PowerShell window.
5.  Try running `npm run dev` in your project folder again.

---

## 2. Fix MongoDB Connection Error
**Error:** `querySrv ECONNREFUSED _mongodb._tcp.cluster0...`

**Solution:**
Your IP address is blocked by MongoDB Atlas firewall. You must whitelist it.

1.  Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2.  Go to **Network Access** in the left sidebar (under "Security").
3.  Click **"Add IP Address"**.
4.  Click **"Add Current IP Address"**.
5.  (Optional for dev only) You can select "Allow Access from Anywhere" (0.0.0.0/0) if your IP changes frequently.
6.  Click **"Confirm"**.
7.  Wait 1-2 minutes for the changes to deploy.
8.  Try running `npm run seed` again.

### Note on Persistent Connection Failures
If you still get `ECONNREFUSED` or `querySrv` errors after whitelisting `0.0.0.0/0`, your **local network or ISP** is likely blocking the connection (common in corporate/university networks).

**Workaround:** Proceed with **deployment**. Cloud providers (Netlify, Render) do not have these restrictions, so your app will likely work when deployed even if it fails locally.

---

## 3. GitHub & Deployment Checklist

Before pushing to GitHub:

- [ ] **.env files**: Ensure `.env` is NOT committed (it's in `.gitignore` by default).
- [ ] **Database Access**: Ensure your MongoDB Atlas user has read/write permissions.
- [ ] **Network Access**: For production (Netlify/Render), you likely need to allow `0.0.0.0/0` (Access from Anywhere) in MongoDB Atlas Network Access, unless you can get static IPs from your hosting provider.

## Next Steps

Since local connection is blocked, let's deploy:

1.  Create a **New Repository** on GitHub.
2.  Run the following commands in your terminal:
    ```bash
    git remote add origin <your-github-repo-url>
    git branch -M main
    git push -u origin main
    ```
3.  Connect the repo to Netlify (Frontend) and Render/Railway (Backend).
