import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [fruits, setFruits] = useState([]);

  useEffect( () => {
    const componentDidMount = async () => {
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

    componentDidMount();
  }, []);

  const handlePostClick = () => {
    fetch('/.netlify/functions/fruits', {
      method: 'POST',
      body: JSON.stringify({id: 4, name: 'grape', healthy: true})
    })
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
                fruits.map( (fruit, idx) =>
                  <tr key={idx}>
                    <td>{fruit?.id}</td>
                    <td>{fruit?.name}</td>
                    <td style={{color: 'green'}}>{fruit?.healthy ? '✔' : '❌'}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      }

      <div>
        <button type='button' onClick={handlePostClick}>
          POST
        </button>
      </div>
      
    </>
  )
}

export default App
