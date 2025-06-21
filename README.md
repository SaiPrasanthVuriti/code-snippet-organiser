
# 🚀 Code Snippet Organizer

A basic web app to organize, store, and manage your code snippets in one place. Built with **React**, styled for simplicity, and powered by **Firebase** for real-time updates and secure data storage.

🌐 **Live Site:** [https://code-snippet-2f542.web.app](https://code-snippet-2f542.web.app)

---

## 🧩 Features

- 📄 Create and view code snippets
- 🔍 Search snippets in real time
- ❤️ Mark snippets as **Favorite**
- 🗑️ Move snippets to **Trash** (soft delete)
- 🔄 Real-time updates via **Firestore**

---


## 🛠️ Tech Stack

- ⚛️ React (with Hooks & Router)
- 🔥 Firebase (Firestore + Hosting + Auth)
- 💅 CSS (custom + minimal utility styles)
- ☁️ Deployed on Firebase Hosting

---

## 📁 Folder Structure

```
src/
├── components/        # Reusable UI components  
├── pages/             # Page-Home
├── functions/         # reuasable functions 
├── App.js             # App Routing
└── index.js           # Entry point
```

---

## 🧑‍💻 Local Development Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/code-snippet-organizer.git
cd code-snippet-organizer

# 2. Install dependencies
npm install

# 3. Start the local dev server
npm start
```

---

### ✅ Add this to `firebase.json`

```json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

Then deploy:

```bash
npm run build
firebase deploy
```

---

## 🐞 Known Issue

> Visiting routes like `/home` directly or refreshing on `/favorites` may show a 404 error **without Firebase rewrites**. Ensure the `"rewrites"` key is added to `firebase.json`.

---

## 🤝 Contributing

Got suggestions or improvements? Feel free to fork the repo, create a branch, and open a pull request!

```bash
# Fork it
git clone https://github.com/SaiPrasanthVuriti/code-snippet-organiser.git

# Create your branch
git checkout -b feature/my-feature

# Commit and push
git commit -m "Added my awesome feature"
git push origin feature/my-feature
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

For questions, reach out via GitHub or raise an issue.
