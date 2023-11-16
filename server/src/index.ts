import { initServer } from "./app";

async function init(){
    const app =await initServer(); //creates a app and insid ethe app there is a gql server integrated with express
    app.listen(8000,()=>{
        console.log('8000')
    })
}

init()