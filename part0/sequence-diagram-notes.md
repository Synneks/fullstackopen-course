sequenceDiagram
actor User
User->>Browser: User writes a note in the input field and clicks Submit
Browser-->>Server: Submit event triggered and a HTTP POST request to the server address newnote
Server->>Browser: server responds with HTTP status code 302
Note over Browser: reloads the Notes page
Browser-->>Server: server asks the browser to do a new HTTP GET request to the address defined in the header's Location - the address notes
Server->>Browser: fetches the style sheet (main.css), the JavaScript code (main.js), and the raw data of the notes (data.json)
Browser->>User: display all the notes including the new one
