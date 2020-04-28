export const helloWorld = (request: any, response: any) => {
  console.log(request);
  response.send("Hello from Firebase!");
};
