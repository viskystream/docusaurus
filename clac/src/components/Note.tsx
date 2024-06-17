// src/components/Note.js
import React from 'react';

const Note = ({ children }) => {
    return (
        <div style={{ border: '2px solid orange', padding: '1rem', backgroundColor: '#f9f9f9', boxShadow: '1px 1px 5px 1px gray' }}>
            <strong className='text-blue-800'>NOTE:</strong> {children}
        </div >
    );
};

export default Note;
