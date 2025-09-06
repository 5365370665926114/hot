const API_KEY = "a8f21f6c9ea8bc1a946c628cfe6b8764"; // pega no TMDB
const BASE_IMG = "https://image.tmdb.org/t/p/w500";

document.getElementById("btn").addEventListener("click", ()=> {
  const q = document.getElementById("search").value.trim();
  if(!q) return alert("Escreve algo, seu vagabundo.");
  search(q);
});

async function search(query){
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const data = await res.json();
  renderResults(data.results || []);
}

function renderResults(items){
  const main = document.getElementById("results");
  main.innerHTML = "";
  if(items.length===0) { main.innerHTML = "<p>Nada encontrado.</p>"; return; }
  items.forEach(item=>{
    const title = item.title || item.name || "Sem título";
    const img = item.poster_path ? BASE_IMG + item.poster_path : "https://via.placeholder.com/300x450?text=No+Image";
    const card = document.createElement("div"); card.className = "card";
    card.innerHTML = `
      <img src="${img}" alt="${title}">
      <h3>${title}</h3>
      <p>${(item.overview||"").slice(0,120)}...</p>
      <a href="detalhe.html?id=${item.id}&type=${item.media_type||'movie'}">Ver detalhes</a>
    `;
    main.appendChild(card);
  });
}
