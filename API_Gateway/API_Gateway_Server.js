const gateway = require('fast-gateway')

const port = 9001;

const server = gateway({
  routes: [
    {
    prefix: '/passenger',
    target: 'http://localhost:8081'
    },
    {
    prefix: '/driver',
    target: 'http://localhost:8082'
    },
    {
    prefix: '/billing',
    target: 'http://localhost:8083'
    },

]
})

server.get('/', (req,res)=>{
    res.send("API Gate way is running")
})

server.start(port).then(server=>{
    console.log(`API Gateway is running at http://localhost:${port}`);
})
    
