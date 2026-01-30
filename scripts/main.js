// Project data
const projectsData = [
  {
    id: 0,
    title: "Meadow Heath Lane Tx",
    description: "Beautiful residential renovation showcasing modern design and quality craftsmanship. This project features updated flooring, fresh paint, and contemporary finishes throughout the home.",
    images: [
      "assets/recent_projects/meadow_heath_lane/img1.jpg",
      "assets/recent_projects/meadow_heath_lane/img2.jpg",
      "assets/recent_projects/meadow_heath_lane/img3.jpg",
      "assets/recent_projects/meadow_heath_lane/img4.jpg",
      "assets/recent_projects/meadow_heath_lane/img5.jpg",
      "assets/recent_projects/meadow_heath_lane/img6.jpg",
      "assets/recent_projects/meadow_heath_lane/img7.jpg",
      "assets/recent_projects/meadow_heath_lane/img8.jpg"
    ],
    details: [
      { label: "Project Type", value: "Residential Renovation" },
      { label: "Location", value: "Meadow Heath Lane, TX" },
      { label: "Services", value: "Flooring, Paint, Finishes" }
    ]
  },
  {
    id: 1,
    title: "Bayonne In Mansfield Tx",
    description: "Charming Country Modern Home with Resort-Style Pool in Mansfield, TX. Welcome to Bayonne—a stunning country modern home located in the heart of Mansfield, Texas. This beautifully updated property combines rustic charm with contemporary upgrades, creating an ideal space for both relaxing and entertaining. Enjoy your own private oasis with an incredible backyard featuring a sparkling pool complete with a built-in slide—perfect for summer fun.",
    images: [
      "assets/recent_projects/bayonne_in_mansfield_tx/img1.jpg",
      "assets/recent_projects/bayonne_in_mansfield_tx/img2.jpg",
      "assets/recent_projects/bayonne_in_mansfield_tx/img3.jpg",
      "assets/recent_projects/bayonne_in_mansfield_tx/img4.jpg",
      "assets/recent_projects/bayonne_in_mansfield_tx/img5.jpg",
      "assets/recent_projects/bayonne_in_mansfield_tx/img6.jpg",
      "assets/recent_projects/bayonne_in_mansfield_tx/img7.jpg",
      "assets/recent_projects/bayonne_in_mansfield_tx/img8.jpg"
    ],
    details: [
      { label: "Project Type", value: "Residential Renovation" },
      { label: "Location", value: "Bayonne, Mansfield TX" },
      { label: "Services", value: "Kitchen, Pool Area, Interior Finishes" }
    ]
  },
  {
    id: 2,
    title: "Hedgerow Tx",
    description: "Modern farmhouse renovation featuring high-end finishes and contemporary design. This project demonstrates our expertise in creating sophisticated living spaces with timeless appeal and practical functionality.",
    images: [
      "assets/recent_projects/hedgerow_tx/img1.jpg",
      "assets/recent_projects/hedgerow_tx/img2.jpg",
      "assets/recent_projects/hedgerow_tx/img3.jpg",
      "assets/recent_projects/hedgerow_tx/img4.jpg",
      "assets/recent_projects/hedgerow_tx/img5.jpg",
      "assets/recent_projects/hedgerow_tx/img6.jpg",
      "assets/recent_projects/hedgerow_tx/img7.jpg",
      "assets/recent_projects/hedgerow_tx/img8.jpg"
    ],
    details: [
      { label: "Project Type", value: "Residential Renovation" },
      { label: "Location", value: "Hedgerow, TX" },
      { label: "Services", value: "Drywall, Finishes, Exterior" }
    ]
  },
  {
    id: 3,
    title: "Crossbend Tx",
    description: "Contemporary home renovation featuring sustainable design elements and modern architectural details. This project showcases our commitment to quality construction and innovative design solutions.",
    images: [
      "assets/recent_projects/crossbend_tx/img1.jpg",
      "assets/recent_projects/crossbend_tx/img2.jpg",
      "assets/recent_projects/crossbend_tx/img3.jpg",
      "assets/recent_projects/crossbend_tx/img4.jpg",
      "assets/recent_projects/crossbend_tx/img5.jpg",
      "assets/recent_projects/crossbend_tx/img6.jpg",
      "assets/recent_projects/crossbend_tx/img7.jpg",
      "assets/recent_projects/crossbend_tx/img8.jpg"
    ],
    details: [
      { label: "Project Type", value: "Residential Renovation" },
      { label: "Location", value: "Crossbend, TX" },
      { label: "Services", value: "Framing, Drywall, Finishes" }
    ]
  }
];

// Modal handling
const modal = document.getElementById('projectModal');
const modalOverlay = document.querySelector('.project-modal__overlay');
const closeBtn = document.querySelector('.project-modal__close');
const projectButtons = document.querySelectorAll('.project');

let currentProjectIndex = 0;
let currentImageIndex = 0;

// Open modal
function openModal(projectId) {
  currentProjectIndex = projectId;
  currentImageIndex = 0;
  updateModal();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Update modal content
function updateModal() {
  const project = projectsData[currentProjectIndex];
  
  // Update carousel
  const carouselImage = document.getElementById('carouselImage');
  carouselImage.innerHTML = `<img src="${project.images[currentImageIndex]}" alt="${project.title}" loading="lazy" />`;
  
  // Update info
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDescription').textContent = project.description;
  
  // Update details
  const detailsContainer = document.getElementById('modalDetails');
  detailsContainer.innerHTML = project.details.map(detail => 
    `<div class="project-modal__detail-item">
      <strong>${detail.label}</strong>
      <span>${detail.value}</span>
    </div>`
  ).join('');
}

// Carousel controls
document.querySelector('.carousel-control--prev').addEventListener('click', () => {
  const project = projectsData[currentProjectIndex];
  currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
  updateModal();
});

document.querySelector('.carousel-control--next').addEventListener('click', () => {
  const project = projectsData[currentProjectIndex];
  currentImageIndex = (currentImageIndex + 1) % project.images.length;
  updateModal();
});

// Modal events
projectButtons.forEach(button => {
  button.addEventListener('click', () => {
    const projectId = parseInt(button.getAttribute('data-project'));
    openModal(projectId);
  });
});

closeBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Year footer
document.getElementById('year').textContent = new Date().getFullYear();
