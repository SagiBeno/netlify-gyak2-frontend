import { useEffect, useState } from 'react';
import './App.css';

interface Fruit {
  id?: number,
  name: string,
  healthy?: boolean
}

function App() {
  const [fruits, setFruits]: [Fruit[], Function] = useState([]);

  useEffect(() => {
    const componentDidMounth = async () => {
      try {
        const fruitsDataJson = await fetch('/.netlify/functions/fruits');
        console.log('fruitsDataJson', fruitsDataJson);
        const fruitsData = await fruitsDataJson.json();
        console.log('fruitsData', fruitsData);
        if (fruitsData) setFruits(fruitsData);
      } catch (error) {
        console.warn(error);
      }
    }
    componentDidMounth();
  }, []);

  const handlePostClick = () => {
    fetch('/.netlify/functions/fruits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        //id: 4,
        name: 'grape',
        healthy: true
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log('POST result: ', result);
        setFruits([...fruits, result[0]]);
      })
      .catch(console.warn);
  }

  return (
    <>
      {
        fruits.length > 0 &&
        <div className='card'>
          <table
            style={{
              margin: '0 auto',
            }}
            id='fruitTable'
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Healthy?</th>
              </tr>
            </thead>

            <tbody>
              {
                fruits.map((fruit: Fruit, idx) =>
                  <tr key={idx}>
                    <td>{fruit.id}</td>
                    <td>{fruit.name}</td>
                    <td style={{ color: 'green' }}>{fruit.healthy ? '✔' : '❌'}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      }

      <div>
        <button type='button' onClick={handlePostClick}>
          POST /.netlify/functions/fruits
        </button>
      </div>

    </>
  )
}

export default App
