const http = require('http');

let clubData = {
    "clubName": "COMP",
    "clubLocation": 407,
    "clubMembers": ["윤재선", "한윤호"]
};

http.createServer(async (req, res) => {
    try {
        if (req.method === 'POST') {
            let body = '';
            
            req.on('data', (data) => {
                body += data;
            });
            
            req.on('end', () => {
                try {
                    const { name } = JSON.parse(body);
                    clubData.clubMembers.push(name); // Add the provided name to the club members list
                    res.statusCode = 200;
                    res.end('ok');
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    res.statusCode = 400; // Bad request
                    res.end('Bad Request');
                }
            });
        } else if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(clubData));
        }
    } catch (error) {
        console.error('Server error:', error);
        res.statusCode = 500; // Internal server error
        res.end('Internal Server Error');
    }
}).listen(8080, () => {
    console.log('Server is listening on port 8080');
});