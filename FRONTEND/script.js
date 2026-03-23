// RESCUE FORM
document.getElementById("rescueForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value
    };

    await fetch("http://localhost:5000/api/rescue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    alert("Rescue request submitted!");
    e.target.reset();
});


// LOAD EVENTS
async function loadEvents() {
    const res = await fetch("http://localhost:5000/api/events");
    const events = await res.json();

    const container = document.getElementById("events");

    container.innerHTML = events.map(e => `
        <div class="card">
            <h3>${e.title}</h3>
            <p>${e.description}</p>
            <small>${new Date(e.date).toLocaleDateString()}</small>
        </div>
    `).join("");
}

loadEvents();


// ADD EVENT
document.getElementById("eventForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        title: document.getElementById("title").value,
        description: document.getElementById("desc").value,
        date: document.getElementById("date").value
    };

    await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    alert("Event added!");
    loadEvents();
    e.target.reset();
});