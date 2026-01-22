/** endpoint: /.netlify/functions/fruits */

export const handler = async () => {

    console.log('endpoint /fruits')

    return {
        statusCode: 200,
        body: JSON.stringify([
            {id: 1, name: 'orange', healthy: true},
            {id: 2, name: 'banana', healthy: true},
            {id: 2, name: 'dates', healthy: false},
        ])
    }
}