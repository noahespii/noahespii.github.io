// ===== COREY DETAILS - MAIN JAVASCRIPT =====

// Mobile Navigation Toggle
const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelector(".nav-links")

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    navLinks.classList.toggle("active")
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : ""
  })
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navLinks.classList.remove("active")
    document.body.style.overflow = ""
  })
})

// Navbar scroll effect
const navbar = document.querySelector(".navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll(".fade-in")

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

fadeElements.forEach((el) => observer.observe(el))

// Testimonials slider (simple implementation)
const testimonialDots = document.querySelectorAll(".testimonial-dots button")
const testimonials = [
  {
    text: '"Absolutely phenomenal work! My car looks brand new again. The attention to detail is incredible and Corey really takes pride in his work. Highly recommend!"',
    author: "Marcus Thompson",
    role: "BMW M3 Owner",
  },
  {
    text: '"Best detailing service I\'ve ever used. My truck was covered in desert dust and dirt, and Corey got it looking immaculate. The clay bar treatment made such a huge difference!"',
    author: "Jessica Rivera",
    role: "Ford F-150 Owner",
  },
  {
    text: '"I\'ve taken my Mustang to several detailers over the years, but none compare to Corey Details. The wax finish is unbelievable and the interior looks factory fresh. Worth every penny!"',
    author: "David Chen",
    role: "Mustang GT Owner",
  },
]

let currentTestimonial = 0

testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTestimonial = index
    updateTestimonial()
  })
})

function updateTestimonial() {
  const testimonialEl = document.querySelector(".testimonial")
  if (!testimonialEl) return

  const t = testimonials[currentTestimonial]

  testimonialEl.style.opacity = "0"
  testimonialEl.style.transform = "translateY(20px)"

  setTimeout(() => {
    testimonialEl.querySelector(".testimonial-text").textContent = t.text
    testimonialEl.querySelector(".testimonial-author-info h4").textContent = t.author
    testimonialEl.querySelector(".testimonial-author-info p").textContent = t.role

    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentTestimonial)
    })

    testimonialEl.style.opacity = "1"
    testimonialEl.style.transform = "translateY(0)"
  }, 300)
}

// Auto-rotate testimonials
setInterval(() => {
  if (document.querySelector(".testimonials")) {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length
    updateTestimonial()
  }
}, 5000)

// Contact form handling
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    // Here you would typically send this data to a server
    console.log("Form submitted:", data)

    // Show success message (simple alert for demo)
    alert("Thank you for your message! We'll get back to you soon.")
    contactForm.reset()
  })
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Gallery lightbox effect (simple implementation)
const galleryItems = document.querySelectorAll(".gallery-item")

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img")
    if (img) {
      // Simple zoom effect - could be expanded to full lightbox
      item.classList.toggle("zoomed")
    }
  })
})

// Add hover parallax effect to hero image
const heroBg = document.querySelector(".hero-bg img")

if (heroBg) {
  document.querySelector(".hero").addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window

    const xPercent = (clientX / innerWidth - 0.5) * 20
    const yPercent = (clientY / innerHeight - 0.5) * 20

    heroBg.style.transform = `scale(1.1) translate(${xPercent}px, ${yPercent}px)`
  })
}

// Animate stats counter
const stats = document.querySelectorAll(".stat h4")

const animateCounter = (el) => {
  const target = el.textContent
  const isPercentage = target.includes("%")
  const hasPlus = target.includes("+")
  const numericValue = Number.parseInt(target.replace(/[^0-9]/g, ""))

  let current = 0
  const increment = numericValue / 50
  const timer = setInterval(() => {
    current += increment
    if (current >= numericValue) {
      current = numericValue
      clearInterval(timer)
    }
    el.textContent = Math.floor(current) + (hasPlus ? "+" : "") + (isPercentage ? "%" : "")
  }, 30)
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

stats.forEach((stat) => statsObserver.observe(stat))

function toggleDetails(button) {
  const detailsDiv = button.nextElementSibling
  detailsDiv.classList.toggle("active")

  if (detailsDiv.classList.contains("active")) {
    button.textContent = "Hide Details"
  } else {
    button.textContent = "View Full Details"
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".hero-bg video")
  if (video) {
    video.addEventListener("error", () => {
      video.style.display = "none"
      const img = video.nextElementSibling
      if (img) {
        img.style.display = "block"
      }
    })
  }
})
