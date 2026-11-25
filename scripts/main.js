// Project data
const projectsData = [
  {
    id: 0,
    title: "Meadow Heath Lane Tx",
    description: "Beautiful residential renovation showcasing modern design and quality craftsmanship. This project features updated flooring, fresh paint, and contemporary finishes throughout the home.",
    images: [
      "assets/recent_projects/meadow_heath_lane/img1.webp",
      "assets/recent_projects/meadow_heath_lane/img2.webp",
      "assets/recent_projects/meadow_heath_lane/img3.webp",
      "assets/recent_projects/meadow_heath_lane/img4.webp",
      "assets/recent_projects/meadow_heath_lane/img5.webp",
      "assets/recent_projects/meadow_heath_lane/img6.webp",
      "assets/recent_projects/meadow_heath_lane/img7.webp",
      "assets/recent_projects/meadow_heath_lane/img8.webp"
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
      "assets/recent_projects/bayonne_in_mansfield_tx/img1.webp",
      "assets/recent_projects/bayonne_in_mansfield_tx/img2.webp",
      "assets/recent_projects/bayonne_in_mansfield_tx/img3.webp",
      "assets/recent_projects/bayonne_in_mansfield_tx/img4.webp",
      "assets/recent_projects/bayonne_in_mansfield_tx/img5.webp",
      "assets/recent_projects/bayonne_in_mansfield_tx/img6.webp",
      "assets/recent_projects/bayonne_in_mansfield_tx/img7.webp",
      "assets/recent_projects/bayonne_in_mansfield_tx/img8.webp"
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
      "assets/recent_projects/hedgerow_tx/img1.webp",
      "assets/recent_projects/hedgerow_tx/img2.webp",
      "assets/recent_projects/hedgerow_tx/img3.webp",
      "assets/recent_projects/hedgerow_tx/img4.webp",
      "assets/recent_projects/hedgerow_tx/img5.webp",
      "assets/recent_projects/hedgerow_tx/img6.webp",
      "assets/recent_projects/hedgerow_tx/img7.webp",
      "assets/recent_projects/hedgerow_tx/img8.webp"
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
      "assets/recent_projects/crossbend_tx/img1.webp",
      "assets/recent_projects/crossbend_tx/img2.webp",
      "assets/recent_projects/crossbend_tx/img3.webp",
      "assets/recent_projects/crossbend_tx/img4.webp",
      "assets/recent_projects/crossbend_tx/img5.webp",
      "assets/recent_projects/crossbend_tx/img6.webp",
      "assets/recent_projects/crossbend_tx/img7.webp",
      "assets/recent_projects/crossbend_tx/img8.webp"
    ],
    details: [
      { label: "Project Type", value: "Residential Renovation" },
      { label: "Location", value: "Crossbend, TX" },
      { label: "Services", value: "Framing, Drywall, Finishes" }
    ]
  }
];

// Modal handling (native <dialog>: Escape, focus trap and ::backdrop come free)
const modal = document.getElementById('projectModal');

let currentProjectIndex = 0;
let currentImageIndex = 0;

function updateModal() {
  const project = projectsData[currentProjectIndex];
  const n = project.images.length;

  document.getElementById('carouselImage').innerHTML =
    `<img src="${project.images[currentImageIndex]}" alt="${project.title}" width="1600" height="1067" />`;

  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDescription').textContent = project.description;
  document.getElementById('modalDetails').innerHTML = project.details.map(detail =>
    `<div class="project-modal__detail-item">
      <strong>${detail.label}</strong>
      <span>${detail.value}</span>
    </div>`
  ).join('');
}

function step(delta) {
  const n = projectsData[currentProjectIndex].images.length;
  currentImageIndex = (currentImageIndex + delta + n) % n;
  updateModal();
}

document.querySelector('.carousel-control--prev').addEventListener('click', () => step(-1));
document.querySelector('.carousel-control--next').addEventListener('click', () => step(1));

document.querySelectorAll('.project').forEach(button => {
  button.addEventListener('click', () => {
    currentProjectIndex = Number(button.dataset.project);
    currentImageIndex = 0;
    updateModal();
    modal.showModal();
  });
});

// Click on the backdrop (the dialog itself, outside the content box) closes it
modal.addEventListener('click', e => e.target === modal && modal.close());

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
toggle.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', nav.classList.toggle('nav--open'));
});
nav.addEventListener('click', e => {
  if (e.target.closest('a')) {
    nav.classList.remove('nav--open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Year footer
document.getElementById('year').textContent = new Date().getFullYear();
