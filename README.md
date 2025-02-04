
# **The Deceivrs - The Game**

Welcome to **The Deceivrs**, an interactive game inspired by the popular TV show **The Traitors**. In this game, players will take on the roles of **Deceivers** and **Loyals**. The goal is to uncover the deceivers or outsmart the loyals, depending on your role.

## **Features**

- **Player Registration**: Players can join the game by entering their name and phone number.
- **Random Role Assignment**: Deceivers and Loyals are randomly selected at the start of the game.
- **Game Start**: The game is activated when at least 5 players have joined.
- **Messaging**: Once the game starts, players receive a text message with their role.
- **Vote System**: Players vote to eliminate suspected deceivers.
- **End Game**: The game ends when all deceivers are voted out, or when the game reaches a unanimous vote to end.

## **How to Play**

1. **Enter Players**: Type in the names and phone numbers of the players.
2. **Start the Game**: Once you have at least 5 players, click on "Start Game" to randomly assign roles.
3. **Receive Messages**: All players will receive a message indicating their role (Deceiver or Loyal).
4. **Vote to Eliminate**: Players will vote on who they suspect is a Deceiver.
5. **Winning Conditions**:
   - **Deceivers win** if any deceivers remain at the end of the game.
   - **Loyals win** if all deceivers are voted out.

## **Installation**

### 1. **Clone the repository**

```bash
git clone https://github.com/your-username/deceivrs-the-game.git
cd deceivrs-the-game
```

### 2. **Install dependencies**

Make sure you have [Node.js](https://nodejs.org/) installed. Then, install the required dependencies by running:

```bash
npm install
```

This will install all the necessary packages such as React, Firebase, Axios, and TailwindCSS.

### 3. **Set up Firebase**

You'll need to create a Firebase project to store game data.

- Go to [Firebase Console](https://console.firebase.google.com/).
- Create a new Firebase project.
- Obtain your Firebase project credentials and add them to your `.env` file.

In your `.env` file, add the following:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 4. **Run the project**

After setting up Firebase credentials and installing dependencies, you can start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to play the game.

## **Backend (Optional)**

This project includes an API endpoint (`/send-message`) that sends messages to players. You’ll need to run a backend server to handle this functionality.

To set up the backend:

1. Clone or create your own backend API to handle SMS sending.
2. Ensure your backend server is running at `http://127.0.0.1:5000`.

## **Technologies Used**

- **React** for building the user interface.
- **Firebase Firestore** for storing and managing game data.
- **Lucide-React** for icons in the UI.
- **Axios** for sending HTTP requests.
- **TailwindCSS** for styling.

## **Contributing**

Feel free to fork the project, submit issues, or create pull requests. Please ensure that your contributions follow the code style and formatting used throughout the project.

## **License**

This project is licensed under the MIT License.
