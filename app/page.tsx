"use client";

import { useState } from "react";

interface Response {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: Array<number>;
  alphabets: Array<string>;
  highestAlphabet: string;
}

const filters = ["Numbers", "Alphabets", "Highest Alphabet"];

export default function Home() {
  const [data, setData] = useState("");

  const [response, setResponse] = useState<Response | null>(null);
  const fetchData = async () => {
    if (data == "") {
      return;
    }
    const json = JSON.parse(data);
    const res = await fetch("/bfhl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    const jsonResponse = await res.json();
    setResponse(jsonResponse);
  };

  const [filterSelected, setFilterSelected] = useState<Array<string>>([]);

  const handleSelection = (value: string) => {
    if (filterSelected.includes(value)) {
      return;
    } else {
      setFilterSelected([...filterSelected, value]);
    }
  };

  const handleRemove = (value: string) => {
    if (filterSelected.includes(value)) {
      const newArr = filterSelected.filter(
        (e) => e.toLowerCase() !== value.toLowerCase()
      );
      setFilterSelected([...newArr]);
    }
    return;
  };

  return (
    <>
      <div className="w-screen h-screen">
        <div className="w-full flex flex-col gap-4 p-24">
          <div>
            <label htmlFor="data" className="text-sm text-gray-500">
              Data
            </label>
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full h-12 border border-slate-300 bg-gray-50 outline-none p-2"
              id="data"
            />
          </div>
          <div>
            <button
              onClick={() => {
                fetchData();
              }}
              className="w-full h-12 text-white bg-indigo-500 uppercase"
            >
              submit
            </button>
          </div>
          <div>
            {response != null ? (
              <>
                <div className="flex flex-col gap-4">
                  <div>
                    <FilterSelector
                      selected={handleSelection}
                      filter={filterSelected}
                      remove={handleRemove}
                    />
                  </div>

                  <div className="w-full p-4 bg-gray-50 flex flex-col">
                    <div className="text-md font-medium">Response</div>
                    <div>
                      {filterSelected.includes(filters[0]) ? (
                        <>
                          <div className="flex flex-row">
                            Numbers :{" "}
                            <div className="flex flex-row gap-2">
                              {response.numbers.map((e, index) => {
                                return <div key={index}>{e} </div>;
                              })}
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {filterSelected.includes(filters[1]) ? (
                        <>
                          <div className="flex flex-row">
                            Alphabets :{" "}
                            <div className="flex flex-row gap-2">
                              {response.alphabets.map((e, index) => {
                                return <div key={index}>{e} </div>;
                              })}
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {filterSelected.includes(filters[2]) ? (
                        <>
                          <div className="flex flex-row">
                            Highest Alphabet : {response.highestAlphabet}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const FilterSelector = ({
  selected,
  filter,
  remove,
}: {
  selected: (value: string) => void;
  filter: Array<string>;
  remove: (value: string) => void;
}) => {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className="cursor-pointer w-full h-12 bg-gray-50 items-center px-2 border border-slate-300 flex flex-row gap-4">
        {filter.map((e, index) => {
          return (
            <div
              key={index}
              className="text-gray-500 text-sm h-min bg-gray-100 p-2 rounded-sm flex items-center gap-2"
            >
              {e}
              <span
                onClick={() => {
                  remove(e);
                }}
                className="scale-50"
              >
                {close}
              </span>
            </div>
          );
        })}
        <div className="flex-1"></div>
        <span
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          {dropDown}
        </span>
      </div>
      {clicked ? (
        <>
          <div className="w-full bg-gray-50">
            {filters.map((e, index) => {
              return (
                <div
                  onClick={() => {
                    selected(e);
                  }}
                  className="w-full h-12 flex items-center px-2 cursor-pointer"
                  key={index}
                >
                  {e}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const close = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
  >
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
  </svg>
);

const dropDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
  >
    <path d="M480-360 280-560h400L480-360Z" />
  </svg>
);
