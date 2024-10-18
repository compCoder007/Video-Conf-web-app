const express = require( 'express' );
const app = express();
const fs=require('fs');
const path = require( 'path' );

const options = {
    key:fs.readFileSync(path.join(__dirname,'../../certs/key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'../../certs/cert.pem'))
}

const server = require( 'https' ).createServer(options,app);
const io = require( 'socket.io' )( server );
const stream = require( './ws/stream' );

let favicon = require( 'serve-favicon' );

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );



io.of( '/stream' ).on( 'connection', stream );

server.listen(3000,()=>{
console.log('Secure server is listening on port 3000');
})