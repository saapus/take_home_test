import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();
const ToggleThemeContext = createContext();

export function useTheme() {
	return [
		useContext(ThemeContext),
		useContext(ToggleThemeContext),
	];
}

export function ThemeProvider({ children }) {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const classList = document
			.getElementsByTagName("html")[0]
			.classList;
		if (darkMode || !classList.contains("dark-mode")) {
			classList.add("dark-mode");
		}
		if (!darkMode) {
			classList.remove("dark-mode");	
		}
	}, [darkMode]);

	const toggleTheme = () => setDarkMode(!darkMode);

	return (
    <ThemeContext.Provider value={darkMode}>
			<ToggleThemeContext.Provider value={toggleTheme}>{children}</ToggleThemeContext.Provider>
    </ThemeContext.Provider>
  );
}