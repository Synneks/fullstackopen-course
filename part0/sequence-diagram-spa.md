sequenceDiagram
Browser->>Server: Fetches the html, css and javascript files
Server-->>Browser: Sends the requested files to the browser
Note left of Browser: Runs the javacsript file and requests the data.json file with the existing notes
Browser->>Server: Requests the notes
Server-->>Browser: Sends the notes file back
Note left of Browser: Javascript file updates the DOM file with the newly received notes
