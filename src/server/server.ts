import express, { urlencoded } from 'express'
import path from 'path'
import http from 'http'
import { readFile, readFileSync  } from 'fs'
import { writeFile, writeFileSync } from 'fs'
import { appendFileSync } from 'fs'



const port: number = 8080


//const readme = readFileSync('../client/data.json','utf8')
//const typeInput

class App {
    private server: http.Server
    private port: number

    constructor(port: number) {
        this.port = port
        const app = express()

        app.use(express.json())
        app.use(express.urlencoded({extended:true}))
        app.use(express.static(path.join(__dirname, '../client')))
 

        app.post('*', (req, res) => {
            console.log(req.body)
            const writeData = '{"name":"' + req.body.name + '"},'
            appendFileSync(path.join(__dirname, '../client')+ '/data2.json', writeData, 'utf-8' )
            //res.end()
        })
        
        // In the webpack version of the boilerplate, it is not necessary
        // to add static references to the libs in node_modules if
        // you are using module specifiers in your client.ts imports.
        //
        // Visit https://sbcode.net/threejs/module-specifiers/ for info about module specifiers
        //
        // This server.ts is only useful if you are running this on a production server or you
        // want to see how the production version of bundle.js works
        //
        // to use this server.ts
        // # npm run build        (this creates the production version of bundle.js and places it in ./dist/client/)
        // # tsc -p ./src/server  (this compiles ./src/server/server.ts into ./dist/server/server.js)
        // # npm start            (this starts nodejs with express and serves the ./dist/client folder)
        //
        // visit http://127.0.0.1:8080

        this.server = new http.Server(app)
    }

    public Start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}.`)
        })
    }
}

new App(port).Start()
