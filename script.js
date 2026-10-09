
const $ = id => document.getElementById(id);

const advice = [
  {
    cat: "École",
    title: "📚 Mieux organiser ses devoirs",
    text: "Note tes devoirs dans une liste. Choisis une petite tâche pour commencer, puis fais une pause si nécessaire."
  },
  {
    cat: "École",
    title: "✏️ Préparer son sac",
    text: "Regarde ton emploi du temps, prépare tes affaires et coche chaque élément au fur et à mesure."
  },
  {
    cat: "École",
    title: "🌷 Quand on manque de motivation",
    text: "Commence par cinq minutes. Tu peux aussi demander de l'aide si une consigne n'est pas claire."
  },
  {
    cat: "Relations",
    title: "💌 Une amitié qui fait du bien",
    text: "Une bonne amitié laisse de la place aux deux personnes. Tu peux exprimer tes envies et tes limites avec respect."
  },
  {
    cat: "Relations",
    title: "🫧 Oser dire non",
    text: "Tu peux dire simplement : « Je ne préfère pas » ou « Je ne suis pas à l'aise avec ça ». Tu n'as pas à tout accepter."
  },
  {
    cat: "Relations",
    title: "🎀 Après un désaccord",
    text: "Attends d'être plus calme, explique ce que tu as ressenti et écoute aussi l'autre personne."
  },
  {
    cat: "Bien-être",
    title: "☁️ Une pause douceur",
    text: "Installe-toi confortablement, relâche tes épaules et prends quelques instants loin des écrans."
  },
  {
    cat: "Bien-être",
    title: "💗 Être plus gentille avec soi",
    text: "Essaie de te parler comme tu parlerais à une amie. Tu as le droit d'apprendre et de faire des erreurs."
  },
  {
    cat: "Bien-être",
    title: "🌸 Quand tout semble trop",
    text: "Choisis une seule petite chose à faire maintenant. Si tu te sens dépassée, parle à une personne de confiance."
  },
  {
    cat: "Quotidien",
    title: "🎀 Ranger sa chambre",
    text: "Choisis un seul endroit : ton bureau, un tiroir ou ton sac. Dix minutes peuvent suffire pour démarrer."
  },
  {
    cat: "Quotidien",
    title: "🧸 Une soirée cocooning",
    text: "Choisis une activité qui te plaît : musique, lecture, dessin ou film, puis prépare un endroit confortable."
  },
  {
    cat: "Quotidien",
    title: "🌷 Trouver une idée de sortie",
    text: "Pense à une activité que tu aimes, vérifie ton budget et organise-la avec une personne de confiance."
  }
];

let wardrobe = [];
let currentFilter = "Tous";
let tips = [
  "Tu as le droit d'avancer à ton rythme. ♡",
  "Les petits progrès comptent aussi. 🌷",
  "Tu n'as pas besoin d'être parfaite pour être formidable. 🎀",
  "Tes idées méritent de la place. ✨",
  "Une pause peut aussi être productive. ☁️"
];

function startSite() {
  document.body.classList.add("quiz-open");
  $("quiz").classList.add("hidden");
  $("loading").classList.remove("hidden");

  const name = $("prenom").value.trim() || "toi";
  localStorage.setItem("ccName", name);
  localStorage.setItem("ccTheme", $("ambiance").value);
  localStorage.setItem("ccInterest", $("interet").value);
  localStorage.setItem("ccMood", $("humeur").value);

  setTimeout(() => {
    $("loading").classList.add("hidden");
    $("site").classList.remove("hidden");
    document.body.classList.remove("quiz-open");

    $("welcome").textContent = `Coucou ${name} ! 🩷`;
    $("profileName").textContent = `Ton petit espace à toi, ${name} 🎀`;
    changeTheme($("ambiance").value);
    seasonalDecor();
    renderAdvice();
    showPage("home");
  }, 1400);
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("hidden", page.id !== id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function changeTheme(theme) {
  document.body.classList.remove(
    "theme-pink", "theme-blue", "theme-lilac",
    "theme-night", "theme-mint"
  );
  document.body.classList.add("theme-" + theme);
  $("themeChoice").value = theme;
  localStorage.setItem("ccTheme", theme);
}

function renderAdvice() {
  const list = $("adviceList");
  list.innerHTML = "";

  advice
    .filter(item => currentFilter === "Tous" || item.cat === currentFilter)
    .forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "advice-card";

      const title = document.createElement("h3");
      title.textContent = item.title;

      const category = document.createElement("p");
      category.className = "small";
      category.textContent = item.cat;

      const button = document.createElement("button");
      button.textContent = "Lire le conseil ♡";

      const detail = document.createElement("div");
      detail.className = "advice-detail hidden";
      detail.textContent = item.text;

      button.onclick = () => {
        detail.classList.toggle("hidden");
        button.textContent = detail.classList.contains("hidden")
          ? "Lire le conseil ♡"
          : "Refermer ♡";
      };

      card.append(title, category, button, detail);
      list.appendChild(card);
    });
}

function filterAdvice(category) {
  currentFilter = category;
  renderAdvice();
}

function newTip() {
  const next = tips[Math.floor(Math.random() * tips.length)];
  $("dailyTip").textContent = next;
}

function addClothing() {
  const name = $("itemName").value.trim();
  const type = $("itemType").value;
  const color = $("itemColor").value.trim();
  const file = $("itemPhoto").files[0];

  if (!name) {
    alert("Donne un petit nom à ton vêtement ! 🎀");
    return;
  }

  const saveItem = photo => {
    wardrobe.push({ name, type, color, photo });
    renderWardrobe();
    $("itemName").value = "";
    $("itemColor").value = "";
    $("itemPhoto").value = "";
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = () => saveItem(reader.result);
    reader.readAsDataURL(file);
  } else {
    saveItem("");
  }
}

function renderWardrobe() {
  const list = $("wardrobeList");
  list.innerHTML = "";

  wardrobe.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "advice-card";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const info = document.createElement("p");
    info.textContent = `${item.type} · ${item.color || "Couleur non précisée"}`;

    card.append(title, info);

    if (item.photo) {
      const img = document.createElement("img");
      img.src = item.photo;
      img.alt = item.name;
      img.className = "clothing-photo";
      card.appendChild(img);
    }

    const remove = document.createElement("button");
    remove.textContent = "Retirer 🗑️";
    remove.onclick = () => {
      wardrobe.splice(index, 1);
      renderWardrobe();
    };

    card.appendChild(remove);
    list.appendChild(card);
  });
}

function makeOutfit() {
  const result = $("outfitResult");
  if (!wardrobe.length) {
    result.textContent = "Ajoute quelques vêtements dans ta garde-robe pour recevoir des idées. 👚";
    return;
  }

  const style = $("styleChoice").value;
  const occasion = $("occasion").value;
  const preferred = {
    "Coquette 🎀": ["Robe", "Haut", "Bas", "Accessoire"],
    "Confort ☁️": ["Haut", "Bas", "Veste", "Chaussures"],
    "Casual 🌷": ["Haut", "Bas", "Chaussures"],
    "Élégant ✨": ["Robe", "Haut", "Bas", "Chaussures", "Accessoire"],
    "Sportif 🩵": ["Haut", "Bas", "Chaussures", "Veste"]
  }[style] || [];

  const chosen = [];
  preferred.forEach(type => {
    const item = wardrobe.find(v => v.type === type && !chosen.includes(v));
    if (item) chosen.push(item);
  });

  if (!chosen.length) chosen.push(wardrobe[0]);

  result.innerHTML = "";
  const heading = document.createElement("h3");
  heading.textContent = `✨ Idée ${style.toLowerCase()}`;
  const sub = document.createElement("p");
  sub.textContent = `Pour : ${occasion}`;
  const list = document.createElement("ul");

  chosen.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name}${item.color ? " — " + item.color : ""}`;
    list.appendChild(li);
  });

  result.append(heading, sub, list);

  const note = document.createElement("p");
  note.textContent = "Change les pièces selon la météo, ton confort et tes envies. 🩷";
  result.appendChild(note);
}

function showEmotion() {
  const messages = {
    "Je suis heureuse 🌸": "Savoure ce moment et, si tu en as envie, partage ta joie avec quelqu'un. 💗",
    "Je suis stressée ☁️": "Essaie de ralentir un instant et de choisir une petite prochaine étape. 🫧",
    "Je suis triste 🩵": "Tu n'as pas besoin de cacher ce que tu ressens. Parler à une personne de confiance peut aider. 💌",
    "Je suis en colère 🌧️": "Prends un peu de distance si tu peux, puis cherche les mots pour expliquer ce qui t'a contrariée. 🌷",
    "Je ne sais pas trop 🫧": "C'est normal de ne pas toujours savoir nommer ses émotions. Prends ton temps. ♡"
  };

  $("emotionResult").textContent = messages[$("emotionChoice").value];
}

function seasonalDecor() {
  const month = new Date().getMonth();
  let decor = "☁️ 🎀 ✨ 🌷";
  let message = "Une petite bulle de douceur pour toi. ♡";

  if (month === 9) {
    decor = "🎃 🕸️ 🦇 🌙";
    message = "Ambiance automnale et mystérieuse ! 🎃";
  } else if (month === 11 || (month === 0 && new Date().getDate() <= 6)) {
    decor = "🎄 ❄️ 🎁 ⭐";
    message = "Une petite magie d'hiver. ❄️";
  } else if (month === 1 && new Date().getDate() <= 14) {
    decor = "💗 💌 🎀 ✨";
    message = "Une pluie de douceur et d'amitié. 💌";
  } else if (month >= 2 && month <= 4) {
    decor = "🌷 🦋 🌸 ☁️";
    message = "Les petites fleurs arrivent ! 🌷";
  } else if (month >= 5 && month <= 7) {
    decor = "☀️ 🌼 🍓 🫧";
    message = "Une ambiance ensoleillée ! ☀️";
  }

  $("seasonDecor").textContent = decor;
  $("seasonMessage").textContent = message;
}

function resetSite() {
  $("site").classList.add("hidden");
  $("quiz").classList.remove("hidden");
  document.body.classList.add("quiz-open");
  window.scrollTo(0, 0);
}

window.addEventListener("load", () => {
  document.body.classList.add("quiz-open");
  seasonalDecor();
});
