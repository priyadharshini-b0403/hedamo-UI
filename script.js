  const products = [
    {
      name: "Organic Cotton Shirt",
      category: "Textiles",
      producer: "GreenWear Ltd",
      status: "Published",
      updated: "2025-01-05",
      declaredBy: "GreenWear Ltd",
      evidence: 2,
      versions: ["Draft – 2024-12-01", "Published – 2025-01-05"]
    },
    {
      name: "Recycled Paper Notebook",
      category: "Stationery",
      producer: "EcoPaper Co",
      status: "Submitted",
      updated: "2025-01-02",
      declaredBy: "EcoPaper Co",
      evidence: 1,
      versions: ["Draft – 2024-12-10", "Submitted – 2025-01-02"]
    }
  ];

  const grid = document.getElementById("productGrid");
  const detail = document.getElementById("detailView");

  function render(list) {
    grid.innerHTML = "";
    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${p.name}</h3>
        <div class="meta">${p.category} • ${p.producer}</div>
        <span class="status ${p.status}">${p.status}</span>
        <div class="meta">Last updated: ${p.updated}</div>
      `;
      card.onclick = () => showDetail(p);
      grid.appendChild(card);
    });
  }

  function showDetail(p) {
    detail.style.display = "block";
    detail.innerHTML = `
      <h2>${p.name}</h2>
      <div class="meta">Declared by ${p.declaredBy} on ${p.updated}</div>

      <div class="section">
        <strong>Disclosure Summary</strong>
        <p>Evidence attached: ${p.evidence}</p>
      </div>

      <div class="section">
        <strong>Version History</strong>
        <ul>${p.versions.map(v => `<li>${v}</li>`).join("")}</ul>
      </div>

      <div class="disclaimer">
        This page presents producer-declared information; it is not certification or verification.
      </div>

      <button onclick="this.parentElement.style.display='none'">Back to list</button>
    `;
    window.scrollTo({ top: detail.offsetTop, behavior: 'smooth' });
  }

  document.getElementById("search").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    render(products.filter(p => p.name.toLowerCase().includes(q)));
  });

  document.getElementById("statusFilter").addEventListener("change", e => {
    const v = e.target.value;
    render(v ? products.filter(p => p.status === v) : products);
  });

  render(products);
