import React from "react";
import { useTranslation } from "react-i18next";

interface ResultItem {
  fname: string;
  lname: string;
  mname: string;
  nat: string;
  query_id: string;
  query_status: string;
  query_time: string;
  result_time: string;
  query_type: string;
  screen_result?: any[];
}

interface ResultsProps {
  results: ResultItem[];
}

const renderContent = (value: any) => {
  if (Array.isArray(value)) {
    return (
      <ul className="pl-5">
        {value.map((item, index) => (
          <li key={index}>{renderContent(item)}</li>
        ))}
      </ul>
    );
  } else if (typeof value === "object" && value !== null) {
    return (
      <div>
        {Object.entries(value).map(([nestedKey, nestedValue]) => (
          <div key={nestedKey} className="pl-5">
            <strong>{nestedKey}:</strong> {renderContent(nestedValue)}
          </div>
        ))}
      </div>
    );
  } else {
    return <span>{String(value)}</span>;
  }
};

const Results: React.FC<ResultsProps> = ({ results }) => {
  const { t } = useTranslation();

  const translationKeys: { [key: string]: string } = {
    fname: "firstName",
    lname: "lastName",
    mname: "middleName",
    nat: "nationality",
    query_id: "queryID",
    query_status: "queryStatus",
    query_time: "queryTime",
    result_time: "resultTime",
    query_type: "queryType",
    screen_result: "screenResult",
  };

  return (
    <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded shadow-md sm:p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl md:text-3xl">
        {t("results")}
      </h2>
      <ul className="list-disc pl-5 space-y-4 sm:space-y-6 md:space-y-8">
        {results.map((result, index) => (
          <li
            key={index}
            className="text-gray-700 dark:text-gray-300 break-words overflow-hidden"
          >
            {Object.entries(result).map(([key, value]) => (
              <div key={key} className="mb-2">
                <p className="text-sm sm:text-base md:text-lg">
                  <strong className="font-semibold">
                    {t(translationKeys[key] || key)}:
                  </strong>{" "}
                  {renderContent(value)}
                </p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
