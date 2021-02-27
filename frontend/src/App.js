import React from 'react';
import './App.css';
import Interactive from "react-interactjs";

const draggableOptions = {
     onmove: event => {
        const target = event.target
      // keep the dragged position in the data-x/data-y attributes
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
}

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
