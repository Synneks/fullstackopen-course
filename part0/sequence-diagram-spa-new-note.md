sequenceDiagram
actor User
User->>Browser: User writes a note in the input field and clicks Submit
Browser-->>Server: Javascript makes a post to the server with the text
Server->>Browser: server responds with HTTP status code 302
Browser-->>Server: Javascript makes a post to the server with the text
Server->>Browser: Sends the notes file back
Note left of Browser: Javascript file updates the DOM file with the newly received notes
