import React, { useEffect, useState } from 'react';

function App() {
  const [url, setUrl] = useState('https://ticket.interpark.com/');
  const [diff, setDiff] = useState(0);
  const [time, setTime] = useState(Date.now());
  const [gap, setGap] = useState(100);
  const [frac, setFrac] = useState<1 | 2 | 3>(2);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      url: { value: string };
      gap: { value: number };
    };

    setUrl(new URL(target.url.value).hostname);
    setGap(target.gap.value);

    if (target.gap.value < 10) {
      setFrac(3);
    } else if (target.gap.value < 100) {
      setFrac(2);
    } else if (target.gap.value < 1000) {
      setFrac(1);
    }

    fetch(
      `https://timecker.com/time/api?q=${new URL(target.url.value).hostname}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setDiff(res?.time * 1000 - Date.now());
      });

    return;
  };

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now() + diff), gap);

    return () => clearInterval(interval);
  }, [diff, gap]);

  // const getTime = () => {

  // };

  return (
    <div className="container mx-auto dark:bg-gray-900">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="gap"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              gap
            </label>
            <input
              type="number"
              id="gap"
              defaultValue={100}
              name="gap"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="not"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              nothing
            </label>
            <input
              type="text"
              name="not"
              placeholder="nothing"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="large-input"
            name="url"
            defaultValue="https://ticket.interpark.com/"
            placeholder="https://ticket.interpark.com/"
            className="block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="text-white absolute right-3 bottom-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="text-center p-10">
        <div className="my-2">
          <span className="font-bold text-3xl text-blue-500 font-montserrat">
            <a
              href={`https://timecker.com/time/${url}`}
              target="_blank"
              rel="noreferrer"
            >
              timecker
            </a>
          </span>
        </div>
        <div className="my-2">
          <span className="font-bold text-3xl text-gray-900 dark:text-white font-montserrat">
            {new Intl.DateTimeFormat('ko-KR', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              fractionalSecondDigits: frac,
            }).format(time)}
          </span>
        </div>
        <div className="my-2">
          <span className="font-bold text-3xl text-gray-900 dark:text-white font-montserrat">
            diff: {diff.toFixed(3)}ms
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
