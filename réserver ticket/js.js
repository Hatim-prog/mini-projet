// changement de thème
document.getElementById("themeSwitcher").addEventListener("change", function() {
    document.body.className = this.value;
});

let clients = [];
let reservations = [];

// Ajouter un client
function addClient() {
    let name = document.getElementById("clientName").value;
    let cin = document.getElementById("clientCIN").value;
    let isStudent = document.getElementById("clientStudent").checked;

    if (name && cin) {
        let client = { name, cin, isStudent };
        clients.push(client);
        updateClientList();
    }
    else {
        alert("Remplissez les deux champ");
    }
}

// Mettre à jour la liste des clients
function updateClientList() {
    let clientSelect = document.getElementById("clientSelect");
    let clientList = document.getElementById("clientList");
    clientSelect.innerHTML = "";
    clientList.innerHTML = "";

    clients.forEach((client, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = client.name;
        clientSelect.appendChild(option);

        let li = document.createElement("li");
        li.textContent = `${client.name} (${client.cin}) ${client.isStudent ? "- Étudiant" : ""}`;
        clientList.appendChild(li);
    });
}

// Calcule prix 
function calculatePrice() {
    let clientIndex = document.getElementById("clientSelect").value;
    let destinationPrice = parseFloat(document.getElementById("destination").value);
    let classMultiplier = parseFloat(document.getElementById("classSelect").value);
    
    if (clientIndex !== "" && !isNaN(destinationPrice) && !isNaN(classMultiplier)) {
        let client = clients[clientIndex];
        let price = destinationPrice * classMultiplier;
        
        if (client.isStudent) {
            price *= 0.9; 
        }

        document.getElementById("totalPrice").textContent = `Prix total: ${price.toFixed(2)} DH`;
    }
    else {
        alert("Remplissez les champs ci-dessus")
    }
}

// Ajouter une réservation
function addReservation() {
    let clientIndex = document.getElementById("clientSelect").value;
    let destination = document.getElementById("destination").selectedOptions[0].text;
    let classType = document.getElementById("classSelect").selectedOptions[0].text;
    let totalPrice = document.getElementById("totalPrice").textContent.split(": ")[1];

    if (clientIndex !== "" && totalPrice) {
        let reservation = {
            client: clients[clientIndex].name,
            destination,
            classType,
            price: totalPrice
        };
        reservations.push(reservation);
        updateTicketList();
    }
    else{
        alert("Clicker en premier sur Calculer Prix")
    }
}


// Mettre à jour la liste des tickets
function updateTicketList() {
    let ticketList = document.getElementById("ticketList");
    ticketList.innerHTML = "";

    reservations.forEach(reservation => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${reservation.client}</td>
            <td>${reservation.destination}</td>
            <td>${reservation.classType}</td>
            <td>${reservation.price}</td>
        `;
        ticketList.appendChild(row);
    });
}
