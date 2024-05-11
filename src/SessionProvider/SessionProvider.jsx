import React, { createContext, useState } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
	const [loginStatus, setLoginStatus] = useState(false);
	const [username, setUsername] = useState("Friends");
	const [userCreate, setUserCreate] = useState(false);
	const [clickedOnMindGames, setClickedOnMindGames] = useState(false);
	
	return (
		<SessionContext.Provider value={{ loginStatus, setLoginStatus, username, setUsername, userCreate, setUserCreate, clickedOnMindGames, setClickedOnMindGames }}>
			{children}
		</SessionContext.Provider>
	);
};
