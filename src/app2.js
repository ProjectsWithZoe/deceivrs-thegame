function sendMessage(){ 
    const url = "https://graph.facebook.com/v21.0/592123890649380/messages";
    const accessToken = "EAATNZAuyMaGoBOy22v7km5y4VfeZCK6PxFl8UcpqkY154hj547qOrpZB7pZAY7Art7YZA2gnnDceuzEyC9zpCpYj7lz8nBjjJKMjfjITiMIpgk76M3ecsncLPa71wpuTOszfT4K3nSxhPMfR0ZCWY0ivdjM9MeVRUcC1V8gOtrCaraq3eCXSZA3bA2tOAnsJgTZBuNSYihmSOMssfJe39YcjppdEUK4GxN9eOlcZD";

    const headers = {
    "Authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json"
};

    const data = {
    "messaging_product": "whatsapp",
    "to": "447724208797",
    "type": "template",
    "template": {
        "name": "hello_world",
        "language": {
            "code": "en_US"
        }
    }
};

    fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
}).then(response => response.json()).then(data => console.log("Response:", data)).catch(error => console.error("Error:", error));
}
