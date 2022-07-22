import HyperTree from './HyperTree';
import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState(null)
  useEffect(()=> {
    (async () => {
      const dataPath = 'data/mammalia.d3.json'
      const dataResponse = await fetch(dataPath)
      const data = await dataResponse.json()
      setData(data)
    })()
  }, [])

  if (data == null) {
    return <div>loading</div>;
  }
  return (
    <>
      <HyperTree data = {data}/>
    </>
  );
}