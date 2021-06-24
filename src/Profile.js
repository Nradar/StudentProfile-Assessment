import React, {useState, useEffect} from 'react'
import "./Profile.css";

export default function Profile(props) {

    const [gradeShow, setGrades] = useState(false);
    const [buttonSymbol, setSymbol] = useState("+");
    const [tags, setTags] = useState([]);
    let content = null;
    const{student, nameFilter, tagFilter} = props;

    useEffect(() => {
        if (gradeShow) {
        setSymbol("-");
        } else {
        setSymbol("+");
        }
    }, [gradeShow]);

    function getAvg(gradeList) {
        let count = 0;
        let avg = 0;
        gradeList.forEach((grade) => {
        avg += parseFloat(grade);
        count++;
        });
        return avg / count;
    }

    const handleExpand = (event) => {
        console.log(tagFilter);
        setGrades(!gradeShow);
    };

    const handleTag = (event) => {
        if (event.key === "Enter") {
            console.log("Enter Press");
            // console.log(event.target.value + " " + _id);
            // console.log(student.students.find((student) => student.id == _id));
            if (student["tags"] == null) {
                student.tags = tags;
            }
            let tempTags = [...tags, event.target.value];
            setTags(tempTags);
        }
    };

    if(student){
        if (nameFilter) {
            if (
              !(student.firstName + " " + student.lastName)
                .toLowerCase()
                .includes(nameFilter.toLowerCase())
            ) {
              return null;
            }
        }
        if(tagFilter=="" || (tagFilter!="" && tags.toString().includes(tagFilter))){
            console.log(tags.indexOf(tagFilter))
            content = (
            <div>
            <div className="profile-container">
                <div className="avatar-container">
                  <img src={student.pic} alt="" className="avatar" />
                </div>
                <div className="student-container">
                  <div className="name-container">
                    <h1 className="name">
                      {student.firstName.toUpperCase()}{" "}
                      {student.lastName.toUpperCase()}
                    </h1>
                    <button className="expand-button" onClick={handleExpand}>
                      {buttonSymbol}
                    </button>
                  </div>
                  <div className="info">
                    <div>Email: {student.email}</div>
                    <div>Company: {student.company}</div>
                    <div>Skill: {student.skill}</div>
                    <div>Average: {getAvg(student.grades)} %</div>
                    <div className={gradeShow ? "collapse" : "expandable"}>
                      {student.grades.map((grade, index) => (
                        <div key={index} className="grades">
                          <div>Test {index + 1}:</div>
                          <div className="grade">{grade}%</div>
                        </div>
                      ))}
                    </div>
                    <div className="tag-container">
                      {tags.map((tag, index)=>(
                          <div key={index} className="tag">
                              {tag}
                          </div>
                      ))}
                    </div>
                    <input
                      className="tagInput"
                      placeholder="Add a Tag"
                      onKeyDown={handleTag}
                    ></input>
                  </div>
                </div>
            </div>
            <hr className="solid"></hr>
            </div>
            );
        }
    }
    return (
        <div>
            {content}
        </div>
    )
}
