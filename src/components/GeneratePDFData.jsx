import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { GeneratePDF } from './GeneratePDF';

export default function GeneratePDFData() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data.todos))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ color: '#007bff' }}>ToDo's (React-PDF)</h1>
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
      <div className="text-center mt-4">
        <PDFDownloadLink
          document={<GeneratePDF todos={todos} />}
          fileName="todos.pdf"
          className="btn btn-primary"
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Download as PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
