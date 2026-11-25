# CL-friends-faimly

React frontend for a friends-and-family social interface. Displays friend lists, handles friend requests and pending connections, and includes a product/wishlist section backed by a local JSON server.

## Tech Stack

React · React Router · json-server · Axios · React Toastify · MDB React UI Kit

## Features

- Friend list, friend search, friend requests and pending connections
- Product browsing and wishlist
- Local JSON server as a mock backend (`db.json`)
- Toast notifications for user actions

## Getting Started

### Prerequisites

Node.js 18+

### Setup

```bash
git clone https://github.com/arcadia-man/CL-friends-faimly.git
cd CL-friends-faimly
npm install
```

Run the mock API and the React app in two terminals:

```bash
# Terminal 1 — mock API on port 3001
npx json-server --watch db.json --port 3001

# Terminal 2 — React app on port 3000
npm start
```

## Project Structure

```
CL-friends-faimly/
├── db.json             # Mock data for json-server
├── src/
│   ├── component/      # Friends, FriendRequest, FriendPending, FriendSearch
│   │                   # ProductItem, ProductPage, Wishlist, Login, Navbar
│   ├── context/        # UserContext for auth state
│   └── App.js          # Routes
└── public/
```
