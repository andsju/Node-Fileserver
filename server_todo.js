// http file server using core modules in Node.js
import http from 'http';
import fs from 'fs';
import path from 'path';

// set default file
let defaultFile = 'index.html';

// set allowed file extensions
let allowedFileExtensions = ['.html', '.css', '.js', '.jpg', '.jpeg', '.png', '.gif', '.ico'];

// no extension indicates path route
// use a simple route map for friendly urls
let routeMap = [{
        path: 'home',
        route: 'home.html'
    }
]

// set port and host (localhost 127.0.0.1)
let port = 3000;
let host = '127.0.0.1';

// create http server
const server = http.createServer(function (req, res) {

    // get path from http request
    let filePath = req.url === '/' ? defaultFile : req.url;

    // get file extension from path, last occurrence of a dot .
    // https://nodejs.org/api/path.html#path_path_extname_path
    let fileExtension = path.extname(filePath);

    // use route map when no file extension exists
    if (fileExtension.length === 0) {

        // iterate
        routeMap.forEach(map => {
            if (filePath === '/' + map.path) {

                // set route

                // update file extension

            }
        })
    }

    // check if file extension is allowed
    if (!allowedFileExtensions.includes(fileExtension) && fileExtension.length > 0) {
        console.log('Not supported file extension: ', fileExtension);
    }

    // normalize path, fixing '..' '\\' '//' etc
    // https://nodejs.org/api/path.html#path_path_normalize_path
    let f = path.normalize(path.resolve() + '/' + filePath);

    // read file async
    fs.readFile(f, function(err, data) {
        if (err) {
            

            return;
        }

        // no errors
        // decide content type
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
        let headerContentType = 'text/html';
        
        switch (fileExtension) {
            case '.html':
                headerContentType = 'text/html';
                break;
            default:
                headerContentType = 'text/plain';
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', headerContentType);
        res.end(data);
    })
});

// start listen
server.listen(port, host);
console.log(`Server listening port ${port}, host ${host}`);