const fs = require('fs');
const path = require('path');

const initialData = {
  users: [
    {
      id: "1",
      username: "testuser1",
      password: "password123" // In a real app, never store passwords in plain text
    },
    {
      id: "2",
      username: "testuser2",
      password: "password456"
    }
  ],
  articles: [
    {
      id: "1",
      userId: "1",
      content: "<p>This is a sample article.</p>",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      userId: "2",
      content: "<p>Another sample article.</p>",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  toolbarButtons: [
    // Text style
    {
      id: "1",
      name: "bold",
      label: "Bold",
      command: "toggleBold",
      icon: "format_bold"
    },
    {
      id: "2",
      name: "italic",
      label: "Italic",
      command: "toggleItalic",
      icon: "format_italic"
    },
    {
      id: "3",
      name: "underline",
      label: "Underline",
      command: "toggleUnderline",
      icon: "format_underlined"
    },
    {
      id: "4",
      name: "strike",
      label: "Strikethrough",
      command: "toggleStrike",
      icon: "strikethrough_s"
    },
    // Paragraph style
    {
      id: "5",
      name: "paragraph",
      label: "Paragraph",
      command: "setParagraph",
      icon: "format_paragraph"
    },
    {
      id: "6",
      name: "heading1",
      label: "Heading 1",
      command: "toggleHeading",
      args: { level: 1 },
      icon: "looks_one"
    },
    {
      id: "7",
      name: "heading2",
      label: "Heading 2",
      command: "toggleHeading",
      args: { level: 2 },
      icon: "looks_two"
    },
    {
      id: "8",
      name: "heading3",
      label: "Heading 3",
      command: "toggleHeading",
      args: { level: 3 },
      icon: "looks_3"
    },
    // Lists
    {
      id: "9",
      name: "bulletList",
      label: "Bullet List",
      command: "toggleBulletList",
      icon: "format_list_bulleted"
    },
    {
      id: "10",
      name: "orderedList",
      label: "Ordered List",
      command: "toggleOrderedList",
      icon: "format_list_numbered"
    },
    // Indentation
    {
      id: "11",
      name: "indent",
      label: "Indent",
      command: "indent",
      icon: "format_indent_increase"
    },
    {
      id: "12",
      name: "outdent",
      label: "Outdent",
      command: "outdent",
      icon: "format_indent_decrease"
    },
    // Alignment
    {
      id: "13",
      name: "alignLeft",
      label: "Align Left",
      command: "setTextAlign",
      args: "left",
      icon: "format_align_left"
    },
    {
      id: "14",
      name: "alignCenter",
      label: "Align Center",
      command: "setTextAlign",
      args: "center",
      icon: "format_align_center"
    },
    {
      id: "15",
      name: "alignRight",
      label: "Align Right",
      command: "setTextAlign",
      args: "right",
      icon: "format_align_right"
    },
    {
      id: "16",
      name: "alignJustify",
      label: "Align Justify",
      command: "setTextAlign",
      args: "justify",
      icon: "format_align_justify"
    },
    // Special formats
    {
      id: "17",
      name: "blockquote",
      label: "Blockquote",
      command: "toggleBlockquote",
      icon: "format_quote"
    },
    {
      id: "18",
      name: "codeBlock",
      label: "Code Block",
      command: "toggleCodeBlock",
      icon: "code"
    },
    {
      id: "19",
      name: "horizontalRule",
      label: "Horizontal Rule",
      command: "setHorizontalRule",
      icon: "horizontal_rule"
    },
    // Links
    {
      id: "20",
      name: "link",
      label: "Insert Link",
      command: "setLink",
      icon: "link"
    },
    // Tables
    {
      id: "21",
      name: "insertTable",
      label: "Insert Table",
      command: "insertTable",
      icon: "table_chart"
    },
    {
      id: "22",
      name: "addColumnBefore",
      label: "Add Column Before",
      command: "addColumnBefore",
      icon: "table_insert_column_left"
    },
    {
      id: "23",
      name: "addColumnAfter",
      label: "Add Column After",
      command: "addColumnAfter",
      icon: "table_insert_column_right"
    },
    {
      id: "24",
      name: "addRowBefore",
      label: "Add Row Before",
      command: "addRowBefore",
      icon: "table_insert_row_top"
    },
    {
      id: "25",
      name: "addRowAfter",
      label: "Add Row After",
      command: "addRowAfter",
      icon: "table_insert_row_bottom"
    },
    {
      id: "26",
      name: "deleteColumn",
      label: "Delete Column",
      command: "deleteColumn",
      icon: "table_delete_column"
    },
    {
      id: "27",
      name: "deleteRow",
      label: "Delete Row",
      command: "deleteRow",
      icon: "table_delete_row"
    },
    {
      id: "28",
      name: "deleteTable",
      label: "Delete Table",
      command: "deleteTable",
      icon: "table_delete"
    },
    // Custom components
    {
      id: "29",
      name: "codeSnippet",
      label: "Code Snippet",
      command: "insertCodeSnippet",
      icon: "code"
    },
    // Undo/Redo
    {
      id: "30",
      name: "undo",
      label: "Undo",
      command: "undo",
      icon: "undo"
    },
    {
      id: "31",
      name: "redo",
      label: "Redo",
      command: "redo",
      icon: "redo"
    }
  ]
};

const dbPath = path.join(__dirname, 'db.json');

fs.writeFile(dbPath, JSON.stringify(initialData, null, 2), (err) => {
  if (err) {
    console.error('Error writing db.json:', err);
  } else {
    console.log('db.json has been initialized with test data.');
  }
});
