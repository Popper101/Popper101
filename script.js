// Create an array of events first
let events = [];

// Function to add an event
function addEvent(name, date, description, ongoing) {
  const newEvent = {
    name: name,
    date: date,
    description: description,
    ongoing: ongoing
  };
  events.push(newEvent);
}


// Render filtered events
function renderEventList(filteredEvents) {
    const eventList = document.querySelector("#event-list");
    eventList.innerHTML = ""; // Clear previous content

    if (filteredEvents.length === 0) {
        eventList.innerHTML = "<p>No events found.</p>";
        return;
    }

    for (const event of filteredEvents) {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card"); // Add a class for styling

        eventCard.innerHTML = `
        <h3>${event.name}</h3>
        <p>Date: ${event.date}</p>
        <p>Description: ${event.description}</p>
        `;

        eventCard.addEventListener("click", () => {
        // Handle event card click to show details (optional)
        });

        eventList.appendChild(eventCard);
    }
}
function searchEvents() {
    const searchTerm = document.querySelector("#search").value.toLowerCase();
    const filteredEvents = events.filter(event => {
        return (
        event.name.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.date.includes(searchTerm)
        );
    });
    renderEventList(filteredEvents);
}

// Filter events
function filterEvents() {
    const ongoingFilter = document.querySelector("#filter-ongoing").checked;
    const upcomingFilter = document.querySelector("#filter-upcoming").checked;

    let filteredEvents = events; // Start with all events

    if (ongoingFilter) {
        filteredEvents = filteredEvents.filter(event => isEventOngoing(event));
    }

    if (upcomingFilter) {
        filteredEvents = filteredEvents.filter(event => !isEventOngoing(event));
    }

    renderEventList(filteredEvents);
}

// Helper function to determine if an event is ongoing or not
function isEventOngoing(event) {
    const currentDate = new Date();
    const eventDate = new Date(event.date);

    // Check if the event's date is in the past or today
    return eventDate <= currentDate;
}

// Create an onclick listener for the save event button
document.querySelector("#save-event").onclick = () => {
    var name = document.querySelector("#event-name").value;
    var date = document.querySelector("#event-date").value;
    var description = document.querySelector("#event-description").value;
    var ongoing = true; // Change this to read from html element
    addEvent(name, date, description, ongoing);
};

// Create an onclick listener for the search event button
document.querySelector("#search-button").onclick = () => {
    searchEvents();
};

// Handle the filter checkboxes check-changed
// Attach event listeners to the filter checkboxes
document.querySelector("#filter-ongoing").addEventListener("change", (event) => {
    if (event.target.checked) {
        document.querySelector("#filter-upcoming").checked = false; // Uncheck the other checkbox
    }
    filterEvents();
});

document.querySelector("#filter-upcoming").addEventListener("change", (event) => {
    if (event.target.checked) {
        document.querySelector("#filter-ongoing").checked = false; // Uncheck the other checkbox
    }
    filterEvents();
});