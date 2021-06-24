import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";

function App() {
  const url = "https://api.hatchways.io/assessment/students";
  const [students, setStudents] = useState(null);
  const [nameFilter, setNameFilter] = useState(null);
  const [tagFilter, setTagFilter] = useState("");
  let content = null;

  useEffect(() => {
    axios.get(url).then((response) => {
      setStudents(response.data);
    });
  }, [url]);

  const handleNameSearch = (event) => {
    setNameFilter(event.target.value);
  };

  const handleTagSearch = (event) => {
    setTagFilter(event.target.value);
  }

  if (students) {
    content = (
      <div>
        <input
          type="text"
          id="NameSearchInput"
          placeholder="Search by name"
          className="searchName-container"
          onChange={handleNameSearch}
        ></input>
        <hr className="solid"></hr>
        <input
          type="text"
          id="TagSearchInput"
          placeholder="Search by tag"
          className="searchTag-container"
          onChange={handleTagSearch}
        ></input>
        <hr className="solid"></hr>
        {students.students.map((student) => {
          return (
            <div key={student.id}>
              <Profile student={student} tagFilter={tagFilter} nameFilter={nameFilter}/>
            </div>
          );
        })}
      </div>
    );
  }

  // console.log(students.students[0].id);

  return (
    <div className="App">
      <header className="app-container">{content}</header>
    </div>
  );
}

export default App;
