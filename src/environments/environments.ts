const isProduction = true;

export const environment = {
  production: isProduction,
  apiUrl: isProduction
    ? 'https://kaylla-study-5c8xx.vercel.app/api'
    : 'http://localhost:3000/api',
}
if (environment.production == true){
    console.log("esta em produção");
}
else{
    console.log("esta em developer");
}
