import React, { useState } from "react";
import { Table } from "./Table";
import { Pagination } from "./Pagination";
import { NoData } from "./NoData";

export const Page = ({ data, currentPage, setCurrentPage }) => {
  const [searchEntry, setSearchEntry] = useState("");
  let [selectedPaginatorPage, setSelectedPaginatorPage] = useState(0);
  const [idSorting, setIdSorting] = useState("default"); // asc, desc, default
  const [titleSorting, setTitleSorting] = useState("default"); // asc, desc, default

  // sorting by column clicked
  let sortedData = [...data];
  if (idSorting !== "default") {
    switch (idSorting) {
      case "asc":
        sortedData = data.sort((a, b) => {
          return a.id - b.id;
        });
        break;
      case "desc":
        sortedData = data.sort((a, b) => {
          return b.id - a.id;
        });
        break;

      default:
        break;
    }
  }

  if (titleSorting !== "default") {
    switch (titleSorting) {
      case "asc":
        sortedData = data.sort((a, b) => {
          let titleA = a.title.toLowerCase();
          let titleB = b.title.toLowerCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });
        break;
      case "desc":
        sortedData = data.sort((a, b) => {
          let titleA = a.title.toLowerCase();
          let titleB = b.title.toLowerCase();
          if (titleA > titleB) {
            return -1;
          }
          if (titleA < titleB) {
            return 1;
          }
          return 0;
        });
        break;

      default:
        break;
    }
  }

  // filtering by search entry
  let filteredData = sortedData.filter((entry) =>
    entry.title.includes(searchEntry)
  );

  let currentPageData = [];
  let entriesPerPage = 50;
  for (
    let i = currentPage * entriesPerPage - entriesPerPage;
    i < currentPage * entriesPerPage;
    i++
  ) {
    if (filteredData[i] !== undefined) {
      currentPageData.push(filteredData[i]);
    }
  }

  // handling search bar change
  const handleChange = (e) => {
    setSearchEntry(e.target.value);
    setCurrentPage(1);
    setSelectedPaginatorPage(0);
  };

  return (
    <div className="app-container">
      <div className="search-panel">
        <input
          type="text"
          placeholder="search by title..."
          value={searchEntry}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {filteredData.length === 0 ? (
        <NoData />
      ) : (
        <Table
          data={currentPageData}
          currentPage={currentPage}
          idSorting={idSorting}
          setIdSorting={setIdSorting}
          titleSorting={titleSorting}
          setTitleSorting={setTitleSorting}
        />
      )}
      {filteredData.length === 0 ? (
        <></>
      ) : (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          data={filteredData}
          entriesPerPage={entriesPerPage}
          selectedPaginatorPage={selectedPaginatorPage}
          setSelectedPaginatorPage={setSelectedPaginatorPage}
        />
      )}
    </div>
  );
};
