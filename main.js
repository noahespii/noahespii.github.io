const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelector(".nav-links")

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    navLinks.classList.toggle("active")
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : ""
  })
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navLinks.classList.remove("active")
    document.body.style.overflow = ""
  })
})

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

const testimonialDots = document.querySelectorAll(".testimonial-dots button")
const testimonials = [
  {
    text: '"Absolutely phenomenal work! My car looks brand new again. The attention to detail is incredible and Corey really takes pride in his work. Highly recommend!"',
    author: "Marcus Thompson",
    role: "BMW M3 Owner",
  },
  {
    text: '"Best detailing service I\'ve ever used. The clay treatment made such a huge difference!"',
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

setInterval(() => {
  if (document.querySelector(".testimonials")) {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length
    updateTestimonial()
  }
}, 8000)

const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    alert("Thank you for your message! We'll get back to you soon.")
    contactForm.reset()
  })
}

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

const galleryItems = document.querySelectorAll(".gallery-item")

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img")
    if (img) {
      item.classList.toggle("zoomed")
    }
  })
})

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

  const lightbox = document.getElementById("lightbox")
  const lightboxImg = lightbox.querySelector("img")
  const lightboxClose = lightbox.querySelector(".lightbox-close")
  const lightboxPrev = lightbox.querySelector(".lightbox-prev")
  const lightboxNext = lightbox.querySelector(".lightbox-next")

  const allGalleryImages = Array.from(document.querySelectorAll(".gallery-item img"))
  let currentImageIndex = 0

  function openLightbox(index) {
    currentImageIndex = index
    lightboxImg.src = allGalleryImages[currentImageIndex].src
    lightboxImg.alt = allGalleryImages[currentImageIndex].alt
    lightbox.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  function closeLightbox() {
    lightbox.classList.remove("active")
    document.body.style.overflow = ""
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % allGalleryImages.length
    lightboxImg.src = allGalleryImages[currentImageIndex].src
    lightboxImg.alt = allGalleryImages[currentImageIndex].alt
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length
    lightboxImg.src = allGalleryImages[currentImageIndex].src
    lightboxImg.alt = allGalleryImages[currentImageIndex].alt
  }

  document.querySelectorAll(".gallery-item").forEach((item, index) => {
    item.addEventListener("click", () => {
      openLightbox(index)
    })
  })

  lightboxClose.addEventListener("click", closeLightbox)
  lightboxNext.addEventListener("click", showNextImage)
  lightboxPrev.addEventListener("click", showPrevImage)

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return

    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowRight") showNextImage()
    if (e.key === "ArrowLeft") showPrevImage()
  })
})
