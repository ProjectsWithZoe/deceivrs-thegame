const sendMessage = async (players) => {
    if (!players || players.length === 0) {
        console.error("No players to send message to");
        return;
    }

    const url = "https://graph.facebook.com/v21.0/592123890649380/messages";
    const accessToken = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN;

    const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    };

    try{
        await Promise.all(players.map(async (player) => {
            const data = {
                "messaging_product": "whatsapp",
                "name": player.name,
                "to": player.phone,
                "type": "template",
                "template": {
                    "name": "hello_world",
                    "language": { "code": "en_US" }
                }
            };

            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log("Response:", result);
        }));
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

export default sendMessage;
