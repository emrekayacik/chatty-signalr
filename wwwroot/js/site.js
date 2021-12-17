// connection
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();



// send message
document.getElementById("sendMessage").addEventListener("click", event =>
{
    const user = document.getElementById("userName").value;
    const message = document.getElementById("userMessage").value;

    connection.invoke("SendMessage", user, message).catch(err => console.error(err.toStrinbg()));
    event.preventDefault();
})

// receive message
connection.on("ReceiveMessage", (user, message) =>
{
    const msg = "<b style='color:red'>"+user+"</b>" + ": " + message;
    const li = document.createElement("li");
    li.style.listStyleType = "none";
    li.innerHTML = msg;
    document.getElementById("messageList").appendChild(li);
})
 
connection.start().catch(err => console.error(err.toString()));
