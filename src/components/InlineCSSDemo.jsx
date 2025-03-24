import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function InlineCSSDemo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data.todos))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  // const downloadPDF = () => {
  //   const input = document.getElementById("table-container");
  //   html2canvas(input, { scale: 2 }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();
  //     const imgWidth = 190;
  //     const pageHeight = 297;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  //     pdf.save("todosInlineCSS.pdf");
  //   });
  // };

  const downloadPDF = () => {
    const input = document.getElementById('table-container');
    const scale = 2; // Scale for better resolution
  
    html2canvas(input, {
      scale: scale, // Increase scale for higher resolution
      useCORS: true, // Enable cross-origin resource sharing if needed
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190; // Width of the image in the PDF (adjust as needed)
      const pageHeight = 297; // Height of an A4 page in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 0;
  
      // Split the content into multiple pages if it exceeds one page
      if (imgHeight > pageHeight) {
        let remainingHeight = imgHeight;
        while (remainingHeight > 0) {
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, Math.min(remainingHeight, pageHeight));
          remainingHeight -= pageHeight;
          if (remainingHeight > 0) {
            pdf.addPage(); // Add a new page for remaining content
            position = 0;
          }
        }
      } else {
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      }
  
      pdf.save('todosInlineCSS.pdf');
    });
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{ textAlign: "center", color: "#007bff", marginBottom: "20px" }}
      >
        ToDo's(InlineCSSDemo)
      </h1>
      <div id="table-container">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Task</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Completed
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {todo.id}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {todo.todo}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {todo.completed ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={downloadPDF}
        style={{
          display: "block",
          margin: "20px auto 0",
          padding: "10px 20px",
          fontSize: "16px",
          color: "#ffffff",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Download as PDF
      </button>
    </div>
  );
}
