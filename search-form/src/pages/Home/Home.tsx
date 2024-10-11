import React from "react";
import SearchForm from "../../components/SearchForm";
import { useTheme } from "../../ThemeContext";

const Home: React.FC = () => {
  const { toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Search Page
        </h1>
        <button
          onClick={toggleDarkMode}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Toggle Dark Mode
        </button>
      </header>
      <main className="flex justify-center items-center p-4">
        <SearchForm />
      </main>
    </div>
  );
};

export default Home;
