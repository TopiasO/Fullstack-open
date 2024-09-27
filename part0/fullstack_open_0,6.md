sequenceDiagram

participant browser
participant server

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
activate server

Note right of browser: The POST query includes the new note in JSON format

server->>browser: The status code 201 created
deactivate server