import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function DummyJSON() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data.todos))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const downloadPDF = () => {
    const input = document.getElementById('table-container');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      pdf.save('todos.pdf');
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ color: '#007bff' }}>ToDo's</h1>
      <div id="table-container">
        <table className="table table-bordered table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col" style={{ backgroundColor: '#343a40', color: '#ffffff' }}>ID</th>
              <th scope="col" style={{ backgroundColor: '#343a40', color: '#ffffff' }}>Task</th>
              <th scope="col" style={{ backgroundColor: '#343a40', color: '#ffffff' }}>Completed</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.todo}</td>
                <td>{todo.completed ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-3" onClick={downloadPDF}>
        Download as PDF
      </button>
    </div>
  );
}
