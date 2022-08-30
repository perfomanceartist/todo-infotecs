import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App todos={ [ { name: "Eat", status:"done", id: 1},
          { name:"Sleep", status:"inProcess", id:2},
          { name:"Repeat", status:"waiting", id:3}
        ] } 
    />
  </React.StrictMode>
);


