# AnimeVault
# 🎌 AnimeVault API & Discord Bot

**AnimeVault** is a RESTful API built with **Node.js + Express**, integrated with a **Discord Bot** that lets users explore, search, and get anime recommendations in real time.  
It uses data from the **Jikan API (MyAnimeList)** and web scraping utilities for richer, more detailed results.

---

##  Overview

This project was developed as a learning experience to explore how **modern APIs** and **Discord bot integrations** work together.  
With AnimeVault, you can:

-  Search for anime by name (`!anime "name"`)
-  Get filtered recommendations by genre, minimum episodes, or rating (`!recommend genre:romance min_episodes:12 min_score:9`)
-  Interact directly through Discord commands
-  Retrieve detailed information: title, synopsis, episodes, rating, images, and links

---

##  Project Structure

<pre>
src/
├── server.js                         **Express server entry**
├── controllers/
│   ├── randomController.js           **Random anime endpoint**
│   ├── recommendController.js        **Main logic for recommendations**
│   └── searchController.js           **Anime search**
├── routes/
│   ├── index.js                      **Route entry point**
│   ├── random.js                     **/api/random**
│   ├── recommend.js                  **/api/recommend**
│   └── search.js                     **/api/search**
├── utils/
    └── scraper.js                    **Custom scraping helpers**

</pre>

---

## ⚙️ Technologies

- **Node.js**
- **Express**
- **Axios**
- **Discord.js**
- **Dotenv**
- **Jikan API (MyAnimeList)**
- **Cheerio** *(for scraping)*

---

##  Getting Started

### 1️ Clone the repository

**git clone https://github.com/LUFFE154/animevault.git**
cd animevault/

### 2️⃣ Install dependencies
**npm install**

### 3️⃣ Start the server
**node src/server.js**
**Server will run at:**
**👉 http://localhost:3000/api**


## 🧩 API Routes
| Route                      | Method | Description                         |
| -------------------------- | ------ | ----------------------------------- |
| `/api/recommend`           | GET    | Returns a list of recommended anime |
| `/api/search?query={name}` | GET    | Search for an anime by name         |
| `/api/random`              | GET    | Returns a random anime              |
| `/api/scrap/{anime_name}`  | GET    | Returns requested anime             |

## 🤖 Discord Bot Commands:
| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `!anime "name"` | Search and display full anime details       |
| `!recommend`    | Get recommendations (with optional filters) |
| `!help`         | Display available bot commands              |
Example: !recommend genre:romance min_score:8 min_episodes:12

## ⚡ Advanced Features (Work in Progress)

🔸 Request caching to prevent rate limits

🔸 Search history and user context

🔸 Favorites system and profiles

🔸 Deployment on Vercel/Railway

🔸 Interactive API docs (Swagger)




