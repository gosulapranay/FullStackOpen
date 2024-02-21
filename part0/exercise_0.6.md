```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Content-type : application/json  {content: "test", date: "2024-02-21T11:30:01.500Z"}

    browser->>server:  POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    server->>browser: 201 Created

    Note right of browser: The browser executes the event handler that renders the notes


```
