import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    flexGrow: 1,
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
  },
});

export function GeneratePDF({ todos }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>ToDo's</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>ID</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Task</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Completed</Text>
            </View>
          </View>
          {/* Table Rows */}
          {todos.map((todo) => (
            <View style={styles.tableRow} key={todo.id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{todo.id}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{todo.todo}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{todo.completed ? 'Yes' : 'No'}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
