import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const Table = ({
  data,
  currentPage,
  idSorting,
  titleSorting,
  setIdSorting,
  setTitleSorting,
}) => {
  const handleIdSort = () => {
    switch (idSorting) {
      case "default":
        setIdSorting("asc");
        setTitleSorting("default");
        break;
      case "asc":
        setIdSorting("desc");
        setTitleSorting("default");

        break;
      case "desc":
        setIdSorting("asc");
        setTitleSorting("default");
        break;
      default:
        break;
    }
  };
  const handleTitleSort = () => {
    switch (titleSorting) {
      case "default":
        setTitleSorting("asc");
        setIdSorting("default");
        break;
      case "asc":
        setTitleSorting("desc");
        setIdSorting("default");
        break;
      case "desc":
        setTitleSorting("asc");
        setIdSorting("default");
        break;
      default:
        break;
    }
  };

  console.log("id sorting: ", idSorting);
  console.log("title sorting: ", titleSorting);
  return (
    <div className="table-container">
      <h1 className="current-page-container">Page: {currentPage}</h1>

      <table className="table">
        <thead>
          <tr>
            <td>albumId</td>
            <td id="id-col" onClick={handleIdSort}>
              {idSorting === "default" ? (
                <>
                  id <FontAwesomeIcon icon={faArrowRight} />
                </>
              ) : idSorting === "asc" ? (
                <>
                  id <FontAwesomeIcon icon={faArrowUp} />
                </>
              ) : (
                <>
                  id <FontAwesomeIcon icon={faArrowDown} />
                </>
              )}
            </td>
            <td id="title-col" onClick={handleTitleSort}>
              {titleSorting === "default" ? (
                <>
                  title <FontAwesomeIcon icon={faArrowRight} />
                </>
              ) : titleSorting === "asc" ? (
                <>
                  title <FontAwesomeIcon icon={faArrowUp} />
                </>
              ) : (
                <>
                  title <FontAwesomeIcon icon={faArrowDown} />
                </>
              )}
            </td>
            <td>url</td>
            <td>thumbnailUrl</td>
          </tr>
        </thead>

        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.albumId}</td>
              <td>{entry.id}</td>
              <td>{entry.title}</td>
              <td>{entry.url}</td>
              <td>
                <img src={entry.thumbnailUrl} alt="" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
