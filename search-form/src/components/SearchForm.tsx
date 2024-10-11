import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Results from "./Results";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  fname: yup.string().required(),
  mname: yup.string().optional(),
  lname: yup.string().optional(),
  nat: yup.string().optional(),
  description: yup.string().optional(),
  placeOfBirth: yup.string().optional(),
  score: yup.number().optional().min(0).max(100),
});

const SearchForm: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://develop.thamar.sa/api/v1/integration/focal/screen/individual",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      // setResults(response.data);
      setResults(response.data.screen_result);
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
    console.log(".....................", results);
  };
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const handleReset = () => {
    reset();
    setResults([]);
    setError(null);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow-md max-w-lg w-full md:max-w-2xl mx-auto">
      <div className="flex justify-between space-x-4 mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={() => changeLanguage("en")}
        >
          {t("english")}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={() => changeLanguage("ar")}
        >
          {t("arabic")}
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              {t("firstName")}
            </label>
            <input
              {...register("fname")}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fname.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              {t("middleName")}
            </label>
            <input
              {...register("mname")}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.mname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mname.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              {t("lastName")}
            </label>
            <input
              {...register("lname")}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lname.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              {t("nationality")}
            </label>
            <input
              {...register("nat")}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.nat && (
              <p className="text-red-500 text-sm mt-1">{errors.nat.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            {t("description")}
          </label>
          <input
            {...register("description")}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            {t("placeOfBirth")}
          </label>
          <input
            {...register("placeOfBirth")}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            {t("score")}
          </label>
          <input
            {...register("score")}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            min="0"
            max="100"
            defaultValue={"0"}
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? t("loading...") : t("submit")}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            {t("reset")}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      </form>

      <div className="mt-6">
        {results.length > 0 && (
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">
            {t("results")}
          </h1>
        )}
        {Object.keys(results).length > 0 && <Results results={results} />}
      </div>
    </div>
  );
};
export default SearchForm;
