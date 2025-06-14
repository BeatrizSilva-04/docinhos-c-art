console.log("Galeria script carregado")

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado")

  // Dados dos bolos
  const cakes = [
    {
      id: "1",
      name: "Cupcake de Chocolate",
      description: "Deliciosos cupcakes de chocolate com cobertura de buttercream",
      image: "./images/placeholder.jpg",
      category: "cupcakes",
      categoryName: "Cupcakes",
    },
    {
      id: "2",
      name: "Bolo de Casamento Elegante",
      description: "Bolo de três andares com decoração floral",
      image: "./images/placeholder.jpg",
      category: "destaques",
      categoryName: "Destaques",
    },
    {
      id: "finalista1",
      name: "Bolo Elegante Dourado",
      description:
        "Sofisticado bolo branco com detalhes dourados e decoração delicada, finalista em concurso de cake design",
      image: "./images/finalista1.jpg",
      category: "finalistas",
      categoryName: "Finalistas",
    },
    {
      id: "finalista2",
      name: "Bolo Finalista Especial",
      description: "Criação única e premiada, representando a excelência em cake design artesanal",
      image: "./images/finalista2.jpg",
      category: "finalistas",
      categoryName: "Finalistas",
    },
    {
      id: "batizado1",
      name: "Bolo de Batizado Clássico",
      description: "Elegante bolo branco para celebração de batizado, com decoração delicada e tradicional",
      image: "./images/batizado1.jpg",
      category: "batizados",
      categoryName: "Batizados",
    },
  ]

  const galleryGrid = document.getElementById("gallery-grid")

  console.log("Gallery grid:", galleryGrid)

  // Função para renderizar os bolos
  function renderCakes() {
    console.log("Renderizando todos os bolos")

    if (!galleryGrid) {
      console.error("Gallery grid não encontrado!")
      return
    }

    galleryGrid.innerHTML = ""

    console.log("Total de bolos:", cakes.length)

    cakes.forEach((cake) => {
      const cakeElement = document.createElement("div")
      cakeElement.className = "gallery-item"
      cakeElement.style.cssText = `
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    `

      cakeElement.innerHTML = `
      <div class="gallery-image" style="aspect-ratio: 1; overflow: hidden;">
          <img src="${cake.image}" alt="${cake.name}" 
               style="width: 100%; height: 100%; object-fit: cover;"
               onerror="this.src='./images/placeholder.jpg'">
      </div>
      <div class="gallery-info" style="padding: 1.25rem;">
          <h3 style="color: #e84393; margin-bottom: 0.5rem; font-size: 1.25rem;">${cake.name}</h3>
          <p style="color: #666; font-size: 0.875rem; margin-bottom: 1rem;">${cake.description}</p>
          <div class="gallery-footer" style="display: flex; justify-content: space-between; align-items: center;">
              <span class="gallery-category" style="background: #ffedf5; color: #666; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.75rem;">${cake.categoryName}</span>
              <a href="#" class="gallery-link" style="color: #e84393; font-size: 0.875rem;">Ver detalhes</a>
          </div>
      </div>
    `

      galleryGrid.appendChild(cakeElement)
    })
  }

  // Renderizar todos os bolos
  console.log("Renderizando bolos...")
  renderCakes()
})
