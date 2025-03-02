# Product Magagement frontend

## Install

This is a Vue.js project powered by Vite.  

To set it up, run the following commands from the project root:  

```bash
npm install
```  

Then, start the development server with:  

```bash
npm run dev
```  

By default, the application runs on port `5173`. You can access it at [http://localhost:5173](http://localhost:5173).  

The API endpoints are set to `http://localhost:8000`. If your backend is running on a different port, update the configuration by renaming `.env.example` to `.env` and modifying `VITE_API_BASE_URL` accordingly:  

```bash
VITE_API_BASE_URL=http://localhost:8000
```