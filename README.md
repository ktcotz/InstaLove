# 📸 InstaLove – Full-Featured Social Network App

<p align="center">
  <img src="./public/images/design.png" alt="InstaLove preview" />
</p>

<h3 align="center">A modern, full-stack social media platform inspired by TikTok & Instagram, built for performance and scalability.</h3>

---

## 🌐 Overview

**InstaLove** is a fully responsive, feature-rich social media application that emulates core features of platforms like Instagram and TikTok, designed **100% ad-free and open to all users**.

Built with a modern web stack (React + Vite + Supabase), the platform offers seamless UX, real-time features, and a scalable architecture ready for production.

Users can:

- Browse and interact with posts & reels
- Follow and message other users in real-time
- Create, customize, and manage content
- Switch between languages (i18n) and themes
- Enjoy full mobile-first design & experience

The app is actively maintained and evolving. New ideas and contributions are always welcome!

---

## ⚙️ Tech Stack

| Category        | Tools / Frameworks |
|----------------|--------------------|
| **Frontend**   | React, TypeScript, Vite |
| **Styling**    | Tailwind CSS, Custom CSS |
| **Forms**      | React Hook Form, Zod |
| **Routing**    | React Router |
| **State**      | Context API |
| **Data Fetching** | React Query, Axios |
| **Backend-as-a-Service** | Supabase (Auth, DB, Storage, Realtime) |
| **Testing**    | Vitest, MSW |
| **Internationalization** | i18n |
| **Media**      | React Player, React Dropzone |
| **UI Enhancements** | ReactHotToast, ReactTooltip, DateFns |

---

## 🧪 Testing & Code Quality

- **Unit & Integration Testing**: [Vitest](https://vitest.dev/)
- Modular, typed codebase with scalable folder structure
- Type-safe form validation with Zod

---

## 🚀 Key Features

- 🔐 **Modern Auth System** (Sign Up, Login, Reset Password, Forgot Password)
- 🔍 **User Search** with advanced filtering
- 🎞️ **Reels (TikTok-style)** vertical swipe UX, custom player
- 🖼️ **Stories System** (Instagram-style) with CRON-based expiration (Right now it's disabled for testing to HR)
- 💬 **Real-time Chat** (DMs, groups, roles)
- 📸 **Create & Manage Posts** (upload images, tag users, add audio)
- 👍 **Engagement** (likes, comments, nested replies, mentions)
- 🛎️ **Notification System** (categorized)
- 🔖 **Bookmarking**
- 🌐 **i18n** (EN/PL), 💡 **Dark/Light Theme Toggle**
- 🗄️ **Supabase Storage** (avatars, media, reel uploads) with some image manipulation to save some space.
- 👤 **Customizable User Profiles** (username, bio, etc.)

---

## 📦 Setup & Installation

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
# See .env.example for required variables (Supabase keys, etc.)

# 3. (Optional) Run tests
npm run test

# 4. Start the dev server
npm run dev

# 5. Open provided localhost URL
```

---

## 🔗 Live Demo

🌍 [InstaLove (Live App)](https://insta-love-fpfr4ietv-ktcotzs-projects.vercel.app/)

---

## 📣 Why This Project?

Developed with the goal of showcasing **full-stack skills**, **UI/UX design**, **real-time features**, and **production-ready architecture**. I'm actively looking for my first professional opportunity as a developer, and this project demonstrates my ability to deliver complex, maintainable applications from start to finish.

---

## 💡 Contributions / Feedback

Have ideas for features or improvements? Feel free to open an issue or send a message. I’m always open to feedback and collaboration!
