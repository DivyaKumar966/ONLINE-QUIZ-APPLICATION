# Online Quiz (naan mudhalvan)

This small project contains a frontend (static HTML/JS/CSS) and a Node/Express backend that stores scores in MongoDB.

Quick start (Windows PowerShell)

1. Install dependencies

```powershell
cd 'C:\Users\User\Desktop\naan mudhalvan'
npm install
```

2. Start MongoDB

- If installed as a service: Start-Service -Name MongoDB (or check `Get-Service | Where-Object { $_.Name -like '*Mongo*' }`)
- Or run mongod manually:

```powershell
New-Item -ItemType Directory -Path 'C:\data\db' -Force
& 'C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe' --dbpath 'C:\data\db'
```

3. Start the server

```powershell
# optional: set a different port
$env:PORT=3001; npm start
# or default
npm start
```

4. Serve frontend (optional but recommended)

```powershell
npx http-server -c-1
# open the printed URL in a browser and go to create.html -> login.html -> quiz.html
```

Notes

- The server reads `MONGO_URI` and `PORT` from environment variables if present. You can place them in a `.env` file in the project root (example shown below).

Example `.env` (do NOT commit to source control):

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/quizapp
```
