// Data Storage
let events = [
  {
    id: 1,
    name: "Tech Summit 2025",
    date: "2025-11-15",
    description: "Annual technology conference featuring industry leaders",
    status: "Upcoming"
  },
  {
    id: 2,
    name: "Hackathon Winter",
    date: "2025-12-01",
    description: "24-hour coding competition for developers",
    status: "Upcoming"
  },
  {
    id: 3,
    name: "AI Workshop Series",
    date: "2025-10-30",
    description: "Hands-on workshops on artificial intelligence and machine learning",
    status: "Ongoing"
  }
];

let members = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Event Coordinator",
    event: "Tech Summit 2025",
    email: "rahul.sharma@hypervision.com"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Technical Lead",
    event: "Hackathon Winter",
    email: "priya.patel@hypervision.com"
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Marketing Manager",
    event: "Tech Summit 2025",
    email: "amit.kumar@hypervision.com"
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "Logistics Manager",
    event: "AI Workshop Series",
    email: "sneha.gupta@hypervision.com"
  }
];

let sponsorships = [
  {
    id: 1,
    sponsor: "TechCorp India",
    event: "Tech Summit 2025",
    tier: "Gold",
    amount: "₹5,00,000",
    contact: "partnerships@techcorp.in"
  },
  {
    id: 2,
    sponsor: "Digital Solutions Ltd",
    event: "Hackathon Winter",
    tier: "Silver",
    amount: "₹2,50,000",
    contact: "sponsor@digitalsolutions.com"
  },
  {
    id: 3,
    sponsor: "AI Innovations",
    event: "AI Workshop Series",
    tier: "Bronze",
    amount: "₹1,00,000",
    contact: "events@aiinnovations.in"
  },
  {
    id: 4,
    sponsor: "Cloud Systems",
    event: "Tech Summit 2025",
    tier: "Silver",
    amount: "₹3,00,000",
    contact: "marketing@cloudsystems.com"
  }
];

// Current edit IDs
let currentEditEventId = null;
let currentEditMemberId = null;
let currentEditSponsorshipId = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeModals();
  initializeEventHandlers();
  renderEvents();
  renderMembers();
  renderSponsorships();
  updateEventDropdowns();
  initializeSearch();
});

// Navigation
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const targetPage = this.getAttribute('data-page');
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      // Update active page
      pages.forEach(p => p.classList.remove('active'));
      document.getElementById(`${targetPage}-page`).classList.add('active');
    });
  });
}

// Modal Management
function initializeModals() {
  // Close modal buttons
  const closeButtons = document.querySelectorAll('.modal-close, [data-modal]');
  closeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (e.target.tagName === 'BUTTON') {
        const modalId = this.getAttribute('data-modal');
        if (modalId) {
          closeModal(modalId);
        }
      }
    });
  });

  // Close modal on backdrop click
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this.id);
      }
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    // Reset forms
    const form = modal.querySelector('form');
    if (form) {
      form.reset();
    }
    // Reset edit IDs
    if (modalId === 'event-modal') currentEditEventId = null;
    if (modalId === 'member-modal') currentEditMemberId = null;
    if (modalId === 'sponsorship-modal') currentEditSponsorshipId = null;
  }
}

// Event Handlers
function initializeEventHandlers() {
  // Add Event Button
  document.getElementById('add-event-btn').addEventListener('click', function() {
    currentEditEventId = null;
    document.getElementById('event-modal-title').textContent = 'Add New Event';
    document.getElementById('event-form').reset();
    openModal('event-modal');
  });

  // Add Member Button
  document.getElementById('add-member-btn').addEventListener('click', function() {
    currentEditMemberId = null;
    document.getElementById('member-modal-title').textContent = 'Add New Member';
    document.getElementById('member-form').reset();
    openModal('member-modal');
  });

  // Add Sponsorship Button
  document.getElementById('add-sponsorship-btn').addEventListener('click', function() {
    currentEditSponsorshipId = null;
    document.getElementById('sponsorship-modal-title').textContent = 'Add New Sponsorship';
    document.getElementById('sponsorship-form').reset();
    openModal('sponsorship-modal');
  });

  // Event Form Submit
  document.getElementById('event-form').addEventListener('submit', function(e) {
    e.preventDefault();
    handleEventSubmit();
  });

  // Member Form Submit
  document.getElementById('member-form').addEventListener('submit', function(e) {
    e.preventDefault();
    handleMemberSubmit();
  });

  // Sponsorship Form Submit
  document.getElementById('sponsorship-form').addEventListener('submit', function(e) {
    e.preventDefault();
    handleSponsorshipSubmit();
  });
}

// Search and Filter Initialization
function initializeSearch() {
  // Event search
  document.getElementById('event-search').addEventListener('input', function(e) {
    renderEvents(e.target.value);
  });

  // Member search
  document.getElementById('member-search').addEventListener('input', function() {
    renderMembers();
  });

  // Member event filter
  document.getElementById('member-event-filter').addEventListener('change', function() {
    renderMembers();
  });

  // Sponsorship search
  document.getElementById('sponsorship-search').addEventListener('input', function() {
    renderSponsorships();
  });

  // Sponsorship event filter
  document.getElementById('sponsorship-event-filter').addEventListener('change', function() {
    renderSponsorships();
  });
}

// Event Functions
function handleEventSubmit() {
  const name = document.getElementById('event-name').value;
  const date = document.getElementById('event-date').value;
  const description = document.getElementById('event-description').value;
  const status = document.getElementById('event-status').value;

  if (currentEditEventId) {
    // Update existing event
    const event = events.find(e => e.id === currentEditEventId);
    const oldName = event.name;
    event.name = name;
    event.date = date;
    event.description = description;
    event.status = status;

    // Update related members and sponsorships
    members.forEach(m => {
      if (m.event === oldName) m.event = name;
    });
    sponsorships.forEach(s => {
      if (s.event === oldName) s.event = name;
    });

    showToast('Event updated successfully!', 'success');
  } else {
    // Create new event
    const newEvent = {
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
      name,
      date,
      description,
      status
    };
    events.push(newEvent);
    showToast('Event created successfully!', 'success');
  }

  closeModal('event-modal');
  renderEvents();
  renderMembers();
  renderSponsorships();
  updateEventDropdowns();
}

function editEvent(id) {
  const event = events.find(e => e.id === id);
  if (!event) return;

  currentEditEventId = id;
  document.getElementById('event-modal-title').textContent = 'Edit Event';
  document.getElementById('event-name').value = event.name;
  document.getElementById('event-date').value = event.date;
  document.getElementById('event-description').value = event.description;
  document.getElementById('event-status').value = event.status;
  openModal('event-modal');
}

function deleteEvent(id) {
  if (!confirm('Are you sure you want to delete this event? This will also remove associated members and sponsorships.')) {
    return;
  }

  const event = events.find(e => e.id === id);
  const eventName = event.name;

  // Remove event
  events = events.filter(e => e.id !== id);

  // Remove associated members and sponsorships
  members = members.filter(m => m.event !== eventName);
  sponsorships = sponsorships.filter(s => s.event !== eventName);

  showToast('Event deleted successfully!', 'success');
  renderEvents();
  renderMembers();
  renderSponsorships();
  updateEventDropdowns();
}

function renderEvents(searchQuery = '') {
  const eventsGrid = document.getElementById('events-grid');
  const query = searchQuery.toLowerCase();
  
  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(query) ||
    event.description.toLowerCase().includes(query)
  );

  if (filteredEvents.length === 0) {
    eventsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon">📅</div>
        <div class="empty-state-text">No events found</div>
        <div class="empty-state-subtext">Start by creating your first event</div>
      </div>
    `;
    return;
  }

  eventsGrid.innerHTML = filteredEvents.map(event => `
    <div class="event-card">
      <div class="event-card-header">
        <h4 class="event-card-title">${event.name}</h4>
        <div class="event-date">📅 ${formatDate(event.date)}</div>
      </div>
      <p class="event-description">${event.description}</p>
      <span class="event-status ${event.status.toLowerCase()}">${event.status}</span>
      <div class="event-actions">
        <button class="btn btn--secondary btn--sm" onclick="editEvent(${event.id})">✏️ Edit</button>
        <button class="btn btn--danger btn--sm" onclick="deleteEvent(${event.id})">🗑️ Delete</button>
      </div>
    </div>
  `).join('');
}

// Member Functions
function handleMemberSubmit() {
  const name = document.getElementById('member-name').value;
  const role = document.getElementById('member-role').value;
  const event = document.getElementById('member-event').value;
  const email = document.getElementById('member-email').value;

  if (currentEditMemberId) {
    // Update existing member
    const member = members.find(m => m.id === currentEditMemberId);
    member.name = name;
    member.role = role;
    member.event = event;
    member.email = email;
    showToast('Member updated successfully!', 'success');
  } else {
    // Create new member
    const newMember = {
      id: members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1,
      name,
      role,
      event,
      email
    };
    members.push(newMember);
    showToast('Member added successfully!', 'success');
  }

  closeModal('member-modal');
  renderMembers();
}

function editMember(id) {
  const member = members.find(m => m.id === id);
  if (!member) return;

  currentEditMemberId = id;
  document.getElementById('member-modal-title').textContent = 'Edit Member';
  document.getElementById('member-name').value = member.name;
  document.getElementById('member-role').value = member.role;
  document.getElementById('member-event').value = member.event;
  document.getElementById('member-email').value = member.email;
  openModal('member-modal');
}

function deleteMember(id) {
  if (!confirm('Are you sure you want to delete this member?')) {
    return;
  }

  members = members.filter(m => m.id !== id);
  showToast('Member deleted successfully!', 'success');
  renderMembers();
}

function renderMembers() {
  const membersList = document.getElementById('members-list');
  const searchQuery = document.getElementById('member-search').value.toLowerCase();
  const eventFilter = document.getElementById('member-event-filter').value;

  let filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery)
  );

  if (eventFilter !== 'all') {
    filteredMembers = filteredMembers.filter(m => m.event === eventFilter);
  }

  if (filteredMembers.length === 0) {
    membersList.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon">👥</div>
        <div class="empty-state-text">No team members found</div>
        <div class="empty-state-subtext">Add team members to get started</div>
      </div>
    `;
    return;
  }

  membersList.innerHTML = filteredMembers.map(member => `
    <div class="member-card">
      <div class="member-header">
        <div class="member-info">
          <h4>${member.name}</h4>
          <div class="member-role">${member.role}</div>
        </div>
      </div>
      <div class="member-details">
        <div class="member-detail-item">
          <span class="member-detail-label">Event:</span>
          <span class="member-detail-value">${member.event}</span>
        </div>
        <div class="member-detail-item">
          <span class="member-detail-label">Email:</span>
          <span class="member-detail-value">${member.email}</span>
        </div>
      </div>
      <div class="member-actions">
        <button class="btn btn--secondary btn--sm" onclick="editMember(${member.id})">✏️ Edit</button>
        <button class="btn btn--danger btn--sm" onclick="deleteMember(${member.id})">🗑️ Delete</button>
      </div>
    </div>
  `).join('');
}

// Sponsorship Functions
function handleSponsorshipSubmit() {
  const sponsor = document.getElementById('sponsor-name').value;
  const event = document.getElementById('sponsor-event').value;
  const tier = document.getElementById('sponsor-tier').value;
  const amount = document.getElementById('sponsor-amount').value;
  const contact = document.getElementById('sponsor-contact').value;

  if (currentEditSponsorshipId) {
    // Update existing sponsorship
    const sponsorship = sponsorships.find(s => s.id === currentEditSponsorshipId);
    sponsorship.sponsor = sponsor;
    sponsorship.event = event;
    sponsorship.tier = tier;
    sponsorship.amount = amount;
    sponsorship.contact = contact;
    showToast('Sponsorship updated successfully!', 'success');
  } else {
    // Create new sponsorship
    const newSponsorship = {
      id: sponsorships.length > 0 ? Math.max(...sponsorships.map(s => s.id)) + 1 : 1,
      sponsor,
      event,
      tier,
      amount,
      contact
    };
    sponsorships.push(newSponsorship);
    showToast('Sponsorship added successfully!', 'success');
  }

  closeModal('sponsorship-modal');
  renderSponsorships();
}

function editSponsorship(id) {
  const sponsorship = sponsorships.find(s => s.id === id);
  if (!sponsorship) return;

  currentEditSponsorshipId = id;
  document.getElementById('sponsorship-modal-title').textContent = 'Edit Sponsorship';
  document.getElementById('sponsor-name').value = sponsorship.sponsor;
  document.getElementById('sponsor-event').value = sponsorship.event;
  document.getElementById('sponsor-tier').value = sponsorship.tier;
  document.getElementById('sponsor-amount').value = sponsorship.amount;
  document.getElementById('sponsor-contact').value = sponsorship.contact;
  openModal('sponsorship-modal');
}

function deleteSponsorship(id) {
  if (!confirm('Are you sure you want to delete this sponsorship?')) {
    return;
  }

  sponsorships = sponsorships.filter(s => s.id !== id);
  showToast('Sponsorship deleted successfully!', 'success');
  renderSponsorships();
}

function renderSponsorships() {
  const sponsorshipsList = document.getElementById('sponsorships-list');
  const searchQuery = document.getElementById('sponsorship-search').value.toLowerCase();
  const eventFilter = document.getElementById('sponsorship-event-filter').value;

  let filteredSponsorships = sponsorships.filter(sponsorship => 
    sponsorship.sponsor.toLowerCase().includes(searchQuery)
  );

  if (eventFilter !== 'all') {
    filteredSponsorships = filteredSponsorships.filter(s => s.event === eventFilter);
  }

  // Render summary
  renderSponsorshipSummary();

  if (filteredSponsorships.length === 0) {
    sponsorshipsList.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon">🤝</div>
        <div class="empty-state-text">No sponsorships found</div>
        <div class="empty-state-subtext">Add sponsorships to your events</div>
      </div>
    `;
    return;
  }

  sponsorshipsList.innerHTML = filteredSponsorships.map(sponsorship => {
    const initial = sponsorship.sponsor.charAt(0).toUpperCase();
    return `
      <div class="sponsorship-card">
        <div class="sponsorship-header">
          <div style="display: flex; align-items: center;">
            <div class="sponsor-badge">${initial}</div>
            <div class="sponsor-info">
              <h4>${sponsorship.sponsor}</h4>
              <span class="tier-badge ${sponsorship.tier.toLowerCase()}">${sponsorship.tier}</span>
            </div>
          </div>
        </div>
        <div class="sponsorship-details">
          <div class="sponsorship-detail-item">
            <span class="detail-label">Event:</span>
            <span class="detail-value">${sponsorship.event}</span>
          </div>
          <div class="sponsorship-detail-item">
            <span class="detail-label">Amount:</span>
            <span class="detail-value">${sponsorship.amount}</span>
          </div>
          <div class="sponsorship-detail-item">
            <span class="detail-label">Contact:</span>
            <span class="detail-value">${sponsorship.contact}</span>
          </div>
        </div>
        <div class="sponsorship-actions">
          <button class="btn btn--secondary btn--sm" onclick="editSponsorship(${sponsorship.id})">✏️ Edit</button>
          <button class="btn btn--danger btn--sm" onclick="deleteSponsorship(${sponsorship.id})">🗑️ Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderSponsorshipSummary() {
  const summary = document.getElementById('sponsorship-summary');
  const totalSponsorships = sponsorships.length;
  const goldCount = sponsorships.filter(s => s.tier === 'Gold').length;
  const silverCount = sponsorships.filter(s => s.tier === 'Silver').length;
  const bronzeCount = sponsorships.filter(s => s.tier === 'Bronze').length;

  summary.innerHTML = `
    <div class="summary-grid">
      <div class="summary-item">
        <div class="summary-value">${totalSponsorships}</div>
        <div class="summary-label">Total Sponsorships</div>
      </div>
      <div class="summary-item">
        <div class="summary-value" style="color: #d4af37;">${goldCount}</div>
        <div class="summary-label">Gold Tier</div>
      </div>
      <div class="summary-item">
        <div class="summary-value" style="color: #c0c0c0;">${silverCount}</div>
        <div class="summary-label">Silver Tier</div>
      </div>
      <div class="summary-item">
        <div class="summary-value" style="color: #cd7f32;">${bronzeCount}</div>
        <div class="summary-label">Bronze Tier</div>
      </div>
    </div>
  `;
}

// Utility Functions
function updateEventDropdowns() {
  const memberEventSelect = document.getElementById('member-event');
  const sponsorEventSelect = document.getElementById('sponsor-event');
  const memberEventFilter = document.getElementById('member-event-filter');
  const sponsorshipEventFilter = document.getElementById('sponsorship-event-filter');

  const eventOptions = events.map(e => `<option value="${e.name}">${e.name}</option>`).join('');
  
  memberEventSelect.innerHTML = '<option value="">Select an event</option>' + eventOptions;
  sponsorEventSelect.innerHTML = '<option value="">Select an event</option>' + eventOptions;
  memberEventFilter.innerHTML = '<option value="all">All Events</option>' + eventOptions;
  sponsorshipEventFilter.innerHTML = '<option value="all">All Events</option>' + eventOptions;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Make functions globally accessible
window.editEvent = editEvent;
window.deleteEvent = deleteEvent;
window.editMember = editMember;
window.deleteMember = deleteMember;
window.editSponsorship = editSponsorship;
window.deleteSponsorship = deleteSponsorship;