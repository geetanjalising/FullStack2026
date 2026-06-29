//export const BASE_URL = "https://fullstack2026.onrender.com/api";
//export const BASE_URL = "http://localhost:8007/api";
export const BASE_URL = "http://3.27.170.4:8007/api";
// Now whenever push new code for backened do this 
// Your deployment workflow from now on

// Whenever you change the backend:

// On your local machine
// git add .
// git commit -m "Added new feature"
// git push
// Then SSH into EC2
// ssh -i shopping2026-key.pem ubuntu@3.27.170.4

// Go to your project:
// cd ~/FullStack2026

// Pull the latest code:
// git pull

// Rebuild and restart only the backend:
// docker compose up --build -d backend

// That's it.