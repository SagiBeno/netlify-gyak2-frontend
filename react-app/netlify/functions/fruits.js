/** endpoint: /.netlify/functions/fruits */

export const handler = async (event, context) => {

    console.log('endpoint /fruits called');
    console.log('event:', event);
    console.log('context:', context);

    if (event.httpMethod == 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify([
                {id: 1, name: 'orange', healthy: true},
                {id: 2, name: 'banana', healthy: true},
                {id: 3, name: 'dates', healthy: false},
            ])
        }
    }

    if (event.httpMethod == 'POST') {
        console.log('body:', event.body);
        const newFruit = JSON.parse(event.body);
        console.log('newFruit', newFruit);
        return {
            statusCode: 201,
        }
    }

    
}