import { initializeApp, getApps } from "firebase/app"
import { getDatabase } from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyABoB63BUAsyfqCmBpaoqoLl5VSyscNufw",
	authDomain: "project-db-todo-app.firebaseapp.com",
	databaseURL: "https://project-db-todo-app-default-rtdb.firebaseio.com",
	projectId: "project-db-todo-app",
	storageBucket: "project-db-todo-app.appspot.com",
	messagingSenderId: "287187296851",
	appId: "1:287187296851:web:443837ceadbbdf02ebdca6"
};


if (!getApps().length) {
	initializeApp(firebaseConfig)
}

export const db = getDatabase()
