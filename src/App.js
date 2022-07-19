// import logo from './logo.svg';
// import './App.css';
import HyperTree from './HyperTree';

const data = './hypertree/public/data/mammalia.d3.json'
function App() {
  return (
    <>
      <head>
        <title>Hyperbolic tree</title>
        {/* <meta charset="UTF-8" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="dcterms.rightsHolder" content="Copyright © 2018 Glatzhofer Michael" /> */}    

      </head>
      <body>
        <HyperTree data={data}/>
      </body>
    </>
  );
}

export default App;
