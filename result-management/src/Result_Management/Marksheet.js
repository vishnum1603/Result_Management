import React, { useState, useEffect } from "react";
import "./Marksheet.css";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const Marksheet = () => {
  const [student, setStudent] = useState({});
  const emailId=localStorage.getItem("email");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getStudent/email/${emailId}`);
        console.log(response.data); // Check the received data in the console
        setStudent((prevStudent) => ({
          ...prevStudent,
          ...response.data
        }));
      } catch (error) {
        console.error(error);
      }
    };
    

    fetchData();
  }, [emailId]);

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Student Details", 10, 10);
    doc.text(`Name: ${student.name}`, 10, 20);
    doc.text(`Roll Number: ${student.rollNo}`, 10, 30);
    doc.text(`Date of Birth: ${student.dob}`, 10, 40);
    doc.text(`Gender: ${student.gender}`, 10, 50);
    doc.text(`Section: ${student.section}`, 10, 60);
    doc.text(`Tamil: ${student.tamil}`, 10, 70);
    doc.text(`English: ${student.english}`, 10, 80);
    doc.text(`Mathematics: ${student.maths}`, 10, 90);
    doc.text(`Science: ${student.science}`, 10, 100);
    doc.text(`Social Science: ${student.social}`, 10, 110);
    doc.text(`Total: ${student.total}`, 10, 120);
    doc.text(`Percentage: ${student.percentage}`, 10, 130);
    doc.save("student-details.pdf");
  };
  return (
    <div className="student-details">
      <Link to="/login">
        <h1>Result Marksheet</h1>
      </Link>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{student.name}</td>
          </tr>
          <tr>
            <td>Roll Number</td>
            <td>{student.rollNo}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{student.dob}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{student.gender}</td>
          </tr>
          <tr>
            <td>Section</td>
            <td>{student.section}</td>
          </tr>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
          <tr>
            <td>Tamil</td>
            <td>{student.tamil}</td>
          </tr>
          <tr>
            <td>English</td>
            <td>{student.english}</td>
          </tr>
          <tr>
            <td>Mathematics</td>
            <td>{student.maths}</td>
          </tr>
          <tr>
            <td>Science</td>
            <td>{student.science}</td>
          </tr>
          <tr>
            <td>Social Science</td>
            <td>{student.social}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{student.total}</td>
          </tr>
          <tr>
            <td>Percentage</td>
            <td>{student.percentage}%</td>
          </tr>
        </tbody>
      </table>
      <button onClick={downloadPdf} className="but6">
        Download PDF
      </button>
    </div>
  );
};

export default Marksheet;

