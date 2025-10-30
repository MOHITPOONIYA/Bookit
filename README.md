# 🌍 BookIt: Experiences & Slots

A full-stack web application that allows users to browse, search, and book unique travel experiences. Built as part of a full-stack intern assignment, it includes a complete booking flow, slot availability, and user-friendly design.

---

## 🚀 Live Links

- **Frontend (Vercel):** [(https://bookit-h9k6belpl-mohit-pooniyas-projects.vercel.app/](https://bookit-h9k6belpl-mohit-pooniyas-projects.vercel.app/)
- **Backend (Render):** [https://bookit-now.onrender.com/api/](https://bookit-now.onrender.com/api)

---

## ✨ Features

- **🧭 Dynamic Experience Catalog:** Experiences are fetched in real-time from the backend database.  
- **🔍 Instant Search:** Filter experiences by name on the frontend.  
- **🗓️ Slot Availability System:** Displays available dates and time slots with remaining spots.  
- **📱 Responsive Design:** Clean and mobile-friendly UI with TailwindCSS.  
- **🧾 Full Booking Flow:**
  1. Browse and select an experience.
  2. Choose date, time, and quantity.
  3. Enter user details (Name, Email) and accept terms.
  4. Receive a unique booking confirmation ID.
- **🧩 Robust Backend:**
  - RESTful API built with Node.js, Express, and TypeScript.
  - MongoDB database with Mongoose ORM.
  - Atomic database operations to prevent double-booking.

---

## 🛠 Tech Stack

### 🖥️ Frontend
- **Framework:** React (with TypeScript)
- **Bundler:** Vite  
- **Styling:** TailwindCSS  
- **Routing:** React Router DOM  
- **Form Management:** React Hook Form  
- **API Client:** Axios  
- **Hosting:** Vercel  

### ⚙️ Backend
- **Framework:** Node.js with Express  
- **Language:** TypeScript  
- **Database:** MongoDB (Mongoose)  
- **Hosting:** Render  

---

## ⚙️ How to Run Locally

### 🧩 Prerequisites
Make sure you have:
- Node.js (v18 or later)
- A MongoDB Atlas account (for your connection string)

---

### 🗄️ 1. Clone the Repository

```bash
git clone https://github.com/MOHITPOONIYA/Bookit.git
cd Bookit
```

---

### 🔧 2. Run Backend

```bash
# Navigate to backend folder
cd bookit-backend

# Install dependencies
npm install
```

Create a `.env` file inside `bookit-backend/` with the following:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

(Optional) Seed the database with sample data:
```bash
npm run seed
```

Run the backend server:
```bash
npm run dev
```
➡️ Server runs at: **http://localhost:5000**

---

### 💻 3. Run Frontend

Open a new terminal and run:
```bash
# Navigate to frontend folder
cd bookit-frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

➡️ App runs at: **http://localhost:5173**

---

## 📸 Screenshots

*(Optional — Add UI screenshots here later if desired)*

---

## 📦 Folder Structure

```
Bookit/
│
├── bookit-frontend/   # React + Vite frontend
│   ├── src/
│   ├── public/
│   └── ...
│
├── bookit-backend/    # Node.js + Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── ...
│
└── README.md
```

---

## 👨‍💻 Author

**Mohit Pooniya**  
📧 [mohitpooniyadev@gmail.com](mailto:mohitpooniya01@gmail.com)  
🌐 [GitHub: MOHITPOONIYA](https://github.com/MOHITPOONIYA)

---

⭐ *If you like this project, consider giving it a star on GitHub!*
