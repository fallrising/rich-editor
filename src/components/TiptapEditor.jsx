import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';

const apiUrl = process.env.REACT_APP_API_URL;

const TiptapEditor = ({ user }) => {
  const [saveStatus, setSaveStatus] = useState('');
  const [articleId, setArticleId] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start typing here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
  });

  useEffect(() => {
    const loadOrCreateArticle = async () => {
      try {
        const response = await fetch(`${apiUrl}/articles?userId=${user.id}`);
        if (response.ok) {
          const articles = await response.json();
          if (articles.length > 0) {
            const article = articles[0];
            setArticleId(article.id);
            setCreatedAt(article.createdAt);
            setUpdatedAt(article.updatedAt);
            editor.commands.setContent(article.content);
          } else {
            const newArticle = await createNewArticle();
            setArticleId(newArticle.id);
            setCreatedAt(newArticle.createdAt);
            setUpdatedAt(newArticle.updatedAt);
          }
        }
      } catch (error) {
        console.error('Error loading article:', error);
      }
    };

    if (user && editor) {
      loadOrCreateArticle();
    }
  }, [user, editor]);

  const createNewArticle = async () => {
    const response = await fetch(`${apiUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        content: editor.getHTML(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }),
    });
    return await response.json();
  };

  const handleSave = async () => {
    if (editor) {
      const content = editor.getHTML();
      try {
        const method = articleId ? 'PUT' : 'POST';
        const url = articleId ? `${apiUrl}/articles/${articleId}` : `${apiUrl}/articles`;
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            content,
            updatedAt: new Date().toISOString(),
            ...(method === 'POST' && { createdAt: new Date().toISOString() })
          }),
        });

        if (response.ok) {
          const updatedArticle = await response.json();
          setArticleId(updatedArticle.id);
          setUpdatedAt(updatedArticle.updatedAt);
          setSaveStatus('Content saved successfully!');
        } else {
          setSaveStatus('Failed to save content.');
        }
      } catch (error) {
        console.error('Error saving content:', error);
        setSaveStatus('Error saving content. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Article Editor</h2>
      {createdAt && <p className="text-sm text-gray-600">Created: {new Date(createdAt).toLocaleString()}</p>}
      {updatedAt && <p className="text-sm text-gray-600 mb-4">Last updated: {new Date(updatedAt).toLocaleString()}</p>}
      <Toolbar editor={editor} />
      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <EditorContent editor={editor} />
      </div>
      <button 
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Save Content
      </button>
      {saveStatus && <p className="mt-2 text-sm text-gray-600">{saveStatus}</p>}
    </div>
  );
};

export default TiptapEditor;
