import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from "docx";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export default function JSONPlaceholder() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from the API
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data); // Set the posts in state
        setLoading(false); // Stop the loading state
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const downloadDocx = () => {
    // Create table rows
    const tableRows = posts.map((post) => {
      return new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(post.id.toString())] }),
          new TableCell({ children: [new Paragraph(post.title)] }),
          new TableCell({ children: [new Paragraph(post.body)] }),
        ],
      });
    });

    // Create a document
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: "Posts", bold: true, size: 28 })],
              heading: "Heading1",
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: "ID", bold: true })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Title", bold: true })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Body", bold: true })],
                    }),
                  ],
                }),
                ...tableRows,
              ],
            }),
          ],
        },
      ],
    });

    // Save the document
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Posts.docx");
    });
  };

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center mb-4">Posts</h1>
      <button className="btn btn-success mb-3" onClick={downloadDocx}>
        Download as Word
      </button>
      <table className="table table-striped table-bordered">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
