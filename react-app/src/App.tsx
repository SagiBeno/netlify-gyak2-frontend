import { useEffect, useState } from 'react';
import './App.css';

interface Fruit {
  id?: number,
  name: string,
  healthy?: boolean
}

function App() {
  const [fruits, setFruits]: [Fruit[], Function] = useState([]);
  const [fruitsName, setFruitsName]: [string, Function] = useState('');
  const [healthy, setHealthy]: [string, Function] = useState('yes');

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
    const healthyBoolean: boolean = healthy === 'yes' ? true : false;

    fetch('/.netlify/functions/fruits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fruitsName,
        healthy: healthyBoolean
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
                fruits.map((fruit) =>
                  <tr key={fruit.id}>
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
        <div>
          <label htmlFor="fruitName">Fruit name: </label>
          <input type="text" name='fruitName' id='fruitName' value={fruitsName} onChange={(e) => setFruitsName(e.target.value)} placeholder='Fruit name....' />
        </div>
        
        <div style={{margin: '10px 0px'}}>
          <label htmlFor="healthy">Healthy: </label>
          <select name="healthy" id="healthy" value={healthy} onChange={(e) => setHealthy(e.target.value)}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
       
        {
          fruitsName.length === 0 
            ?
              <button type='button' onClick={handlePostClick} disabled style={{cursor: 'not-allowed'}}>
                POST /.netlify/functions/fruits
              </button>
            :
              <button type='button' onClick={handlePostClick}>
                POST /.netlify/functions/fruits
              </button>
        }
        
      </div>

    </>
  )
}

export default App
