const API_ENDPOINT = 'https://p0go49fgi5.execute-api.eu-west-3.amazonaws.com/Prod/hello';
//const apiUrl = 'https://p0go49fgi5.execute-api.eu-west-3.amazonaws.com/Prod/hello';

   export const callLambdaFunction = async (arg1, arg2) => {
     try {
       const response = await fetch(API_ENDPOINT, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ arg1, arg2 }),
       });

       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }

       return await response.json();
     } catch (error) {
       console.error('Error calling Lambda function:', error);
       throw error;
     }
   };