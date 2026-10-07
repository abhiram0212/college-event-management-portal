const eventList = document.getElementById("event-list");
const eventDetail = document.getElementById("event-detail");
const searchInput = document.getElementById("event-search");
const categorySelect = document.getElementById("category-filter");
const eventSelect = document.getElementById("event-select");
const form = document.getElementById("registration-form");
const formMessage = document.getElementById("form-message");

const fallbackEvents = [
  {
    id: 1,
    name: "Hackathon Sprint 2026",
    category: "Technical",
    date: "2026-10-18",
    time: "10:00 AM - 04:00 PM",
    venue: "Innovation Lab",
    description: "A coding challenge focused on problem solving, teamwork, and building innovative solutions for campus and social impact.",
    featured: true,
  },
  {
    id: 2,
    name: "Cultural Night Fiesta",
    category: "Cultural",
    date: "2026-10-22",
    time: "06:30 PM - 09:30 PM",
    venue: "Open Air Theatre",
    description: "A vibrant evening of dance, music, drama, and creative performances celebrating student talent and cultural diversity.",
    featured: true,
  },
  {
    id: 3,
    name: "Inter-Department Sports League",
    category: "Sports",
    date: "2026-10-25",
    time: "04:00 PM - 08:00 PM",
    venue: "Sports Complex",
    description: "A competitive sports event featuring cricket, volleyball, and athletics matches among departmental teams.",
    featured: false,
  },
  {
    id: 4,
    name: "AI & Data Science Workshop",
    category: "Workshops",
    date: "2026-10-28",
    time: "11:00 AM - 01:00 PM",
    venue: "Seminar Hall",
    description: "A practical workshop introducing students to AI concepts, data-driven decision making, and real-world use cases.",
    featured: true,
  },
  {
    id: 5,
    name: "Startup & Career Seminar",
    category: "Seminars",
    date: "2026-10-30",
    time: "01:30 PM - 03:30 PM",
    venue: "Conference Room",
    description: "An interactive seminar on career planning, entrepreneurship, and how students can build future-ready skills.",
    featured: false,
  },
  {
    id: 6,
    name: "Innovation Expo",
    category: "Technical",
    date: "2026-11-02",
    time: "09:30 AM - 02:00 PM",
    venue: "Main Auditorium",
    description: "A showcase of student prototypes, research projects, and creative tech ideas with industry mentorship.",
    featured: true,
  },
];

let allEvents = [];
let selectedEventId = null;

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function populateCategoryFilter(events) {
  const categories = [...new Set(events.map((event) => event.category))];
  categorySelect.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function populateEventDropdown(events) {
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select Event";
  eventSelect.innerHTML = "";
  eventSelect.appendChild(defaultOption);

  events.forEach((event) => {
    const option = document.createElement("option");
    option.value = event.name;
    option.textContent = event.name;
    eventSelect.appendChild(option);
  });
}

function renderEventCards(events) {
  if (!events.length) {
    eventList.innerHTML = '<div class="event-card"><p>No events match your search.</p></div>';
    return;
  }

  eventList.innerHTML = "";

  events.forEach((event) => {
    const card = document.createElement("article");
    card.className = `event-card${selectedEventId === event.id ? " active" : ""}`;
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="event-top">
        <h3>${event.name}</h3>
        <span class="event-category">${event.category}</span>
      </div>
      <div class="event-meta">
        <span>${formatDate(event.date)}</span>
        <span>${event.time}</span>
      </div>
      <p>${event.description}</p>
    `;

    card.addEventListener("click", () => selectEvent(event.id));
    card.addEventListener("keydown", (eventKey) => {
      if (eventKey.key === "Enter" || eventKey.key === " ") {
        eventKey.preventDefault();
        selectEvent(event.id);
      }
    });

    eventList.appendChild(card);
  });
}

function renderEventDetail(event) {
  eventDetail.innerHTML = `
    <div class="detail-tag">${event.category}</div>
    <h3>${event.name}</h3>
    <div class="detail-metadata">
      <span><strong>Date:</strong> ${formatDate(event.date)}</span>
      <span><strong>Time:</strong> ${event.time}</span>
      <span><strong>Venue:</strong> ${event.venue}</span>
      <span><strong>Category:</strong> ${event.category}</span>
    </div>
    <p>${event.description}</p>
    <a href="#register" class="btn btn-primary detail-cta">Register Now</a>
  `;
}

function selectEvent(eventId) {
  const event = allEvents.find((item) => item.id === eventId);
  if (!event) return;

  selectedEventId = eventId;
  renderEventCards(getFilteredEvents());
  renderEventDetail(event);
}

function getFilteredEvents() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const categoryValue = categorySelect.value;

  return allEvents.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm);
    const matchesCategory = categoryValue === "all" || event.category === categoryValue;
    return matchesSearch && matchesCategory;
  });
}

function applyFilters() {
  const filteredEvents = getFilteredEvents();
  renderEventCards(filteredEvents);

  if (!filteredEvents.length) {
    eventDetail.innerHTML = `
      <div class="detail-placeholder">
        <div>
          <h3>No matching event</h3>
          <p>Try another name or category to explore available events.</p>
        </div>
      </div>
    `;
    return;
  }

  const activeEvent = filteredEvents.find((event) => event.id === selectedEventId) || filteredEvents[0];
  selectedEventId = activeEvent.id;
  renderEventCards(filteredEvents);
  renderEventDetail(activeEvent);
}

function handleValidation() {
  const fields = {
    studentName: document.getElementById("student-name"),
    studentEmail: document.getElementById("student-email"),
    studentPhone: document.getElementById("student-phone"),
    eventSelect: document.getElementById("event-select"),
    participationType: document.querySelector('input[name="participationType"]:checked'),
    agree: document.querySelector('input[name="agree"]'),
  };

  const messages = {
    studentName: "Please enter your full name.",
    studentEmail: "Please enter a valid email address.",
    studentPhone: "Please enter a valid 10-digit phone number.",
    eventSelect: "Please choose an event.",
    participationType: "Please select a participation type.",
    agree: "You must confirm participation before submitting.",
  };

  let isValid = true;

  Object.entries(fields).forEach(([key, value]) => {
    const errorElement = document.querySelector(`[data-error-for="${key}"]`);

    if (errorElement) {
      errorElement.textContent = "";
    }

    if (key === "studentName") {
      if (!value.value.trim()) {
        errorElement.textContent = messages[key];
        isValid = false;
      }
    }

    if (key === "studentEmail") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value.value.trim())) {
        errorElement.textContent = messages[key];
        isValid = false;
      }
    }

    if (key === "studentPhone") {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(value.value.trim())) {
        errorElement.textContent = messages[key];
        isValid = false;
      }
    }

    if (key === "eventSelect") {
      if (!value.value) {
        errorElement.textContent = messages[key];
        isValid = false;
      }
    }

    if (key === "participationType") {
      if (!value) {
        const participationError = document.querySelector('[data-error-for="participationType"]');
        participationError.textContent = messages[key];
        isValid = false;
      }
    }

    if (key === "agree") {
      if (!value.checked) {
        const agreeError = document.querySelector('[data-error-for="agree"]');
        agreeError.textContent = messages[key];
        isValid = false;
      }
    }
  });

  return isValid;
}

function setupFormValidation() {
  const resetButton = form.querySelector(".reset-btn");

  resetButton.addEventListener("click", (event) => {
    event.preventDefault();
    form.reset();
    document.querySelectorAll(".error-message").forEach((element) => {
      element.textContent = "";
    });
    formMessage.textContent = "";
    formMessage.className = "form-message";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "";
    formMessage.className = "form-message";

    if (!handleValidation()) {
      formMessage.textContent = "Please correct the highlighted fields and try again.";
      formMessage.classList.add("error");
      return;
    }

    formMessage.textContent = "Registration submitted successfully! We have saved your event request.";
    formMessage.classList.add("success");
    form.reset();
  });
}

async function loadEvents() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error("Unable to load event data");
    }

    const data = await response.json();
    allEvents = Array.isArray(data) ? data : fallbackEvents;
  } catch (error) {
    allEvents = fallbackEvents;
    console.warn("Using fallback event data because the JSON file could not be loaded.", error);
  }

  populateCategoryFilter(allEvents);
  populateEventDropdown(allEvents);
  selectedEventId = allEvents[0]?.id ?? null;
  renderEventCards(allEvents);
  renderEventDetail(allEvents[0]);
}

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
setupFormValidation();
loadEvents();
