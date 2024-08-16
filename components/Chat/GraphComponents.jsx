import React from 'react';

function GraphComponents({ messageContent, onClose }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <div className="text-lg font-bold mb-4">Graph Components</div>
      <div className="prose dark">{messageContent}</div>
    </div>
  );
}

export default GraphComponents;
