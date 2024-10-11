import React from "react";
import SearchForm from "../../components/SearchForm";
import { useTheme } from "../../ThemeContext";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("searchPage")}
        </h1>
        <button
          onClick={toggleDarkMode}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {t("toggleDarkMode")}
        </button>
      </header>
      <main className="flex justify-center items-center p-4">
        <SearchForm />
      </main>
    </div>
  );
};

export default Home;
