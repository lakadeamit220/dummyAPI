import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
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
    const tableRows = posts.map((post) => {
      return new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: post.id.toString(),
                style: "TableCellText",
              }),
            ],
            shading: {
              fill: "FFFFFF",
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: post.title,
                style: "TableCellText",
              }),
            ],
            shading: {
              fill: "FFFFFF",
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: post.body,
                style: "TableCellText",
              }),
            ],
            shading: {
              fill: "FFFFFF",
            },
          }),
        ],
      });
    });
  
    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "TitleText",
            name: "Title Text",
            basedOn: "Normal",
            next: "Normal",
            run: {
              size: 48, // Font size in half-points
              bold: true,
              color: "007BFF", // Bootstrap primary color
            },
            paragraph: {
              alignment: "center",
              spacing: { after: 300 },
            },
          },
          {
            id: "TableHeaderText",
            name: "Table Header Text",
            basedOn: "Normal",
            next: "Normal",
            run: {
              bold: true,
              color: "FFFFFF",
              size: 24,
            },
            paragraph: {
              alignment: "center",
            },
          },
          {
            id: "TableCellText",
            name: "Table Cell Text",
            basedOn: "Normal",
            next: "Normal",
            run: {
              size: 24,
            },
            paragraph: {
              spacing: { after: 200 },
            },
          },
        ],
      },
      sections: [
        {
          children: [
            new Paragraph({
              text: "Posts",
              style: "TitleText",
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: "ID",
                          style: "TableHeaderText",
                        }),
                      ],
                      shading: {
                        fill: "343A40", // Bootstrap dark color
                      },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: "Title",
                          style: "TableHeaderText",
                        }),
                      ],
                      shading: {
                        fill: "343A40",
                      },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: "Body",
                          style: "TableHeaderText",
                        }),
                      ],
                      shading: {
                        fill: "343A40",
                      },
                    }),
                  ],
                }),
                ...tableRows,
              ],
              width: {
                size: 100,
                type: "pct", // Table width set to 100% of the page
              },
            }),
          ],
        },
      ],
    });
  
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
