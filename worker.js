const HTML = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>L'Oreal Routine Builder</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Georgia', serif; background: #f9f6f1; color: #1a1a1a; min-height: 100vh; display: flex; flex-direction: column; }
    header { background: #000; text-align: center; border-bottom: 3px solid #c4922a; }
    .header-top { padding: 16px 24px 10px; }
    .logo-wordmark { font-size: 2.2rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #fff; }
    .logo-wordmark span { color: #c4922a; }
    .logo-tagline { font-size: 0.75rem; color: #c4922a; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 3px; font-style: italic; }
    .header-banner { background: linear-gradient(135deg, #c4922a 0%, #e8b84b 50%, #c4922a 100%); padding: 10px 24px; display: flex; align-items: center; justify-content: center; gap: 16px; }
    .header-banner h1 { font-size: 0.95rem; font-weight: 600; color: #000; letter-spacing: 0.1em; text-transform: uppercase; }
    .rtl-toggle { background: rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.25); color: #000; padding: 4px 12px; border-radius: 12px; font-size: 0.72rem; cursor: pointer; font-weight: 700; letter-spacing: 0.04em; transition: background 0.2s; }
    .rtl-toggle:hover { background: rgba(0,0,0,0.3); }
    main { flex: 1; max-width: 1100px; width: 100%; margin: 0 auto; padding: 24px 16px; display: flex; flex-direction: column; gap: 20px; }
    .controls { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
    #search { flex: 1; min-width: 220px; border: 1.5px solid #d4c9b8; border-radius: 24px; padding: 10px 18px; font-size: 0.9rem; font-family: 'Georgia', serif; outline: none; background: #fff; transition: border-color 0.2s; }
    #search:focus { border-color: #c4922a; }
    .cat-filters { display: flex; flex-wrap: wrap; gap: 8px; }
    .cat-btn { border: 1.5px solid #c4922a; background: #fff; color: #c4922a; border-radius: 20px; padding: 7px 16px; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; font-family: 'Georgia', serif; }
    .cat-btn.active, .cat-btn:hover { background: #c4922a; color: #fff; }
    .selected-section { background: #fff; border: 1px solid #e0d9ce; border-radius: 12px; padding: 14px 16px; display: none; }
    .selected-section.visible { display: block; }
    .selected-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
    .selected-title { font-size: 0.8rem; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.08em; }
    #clear-btn { background: none; border: 1px solid #e0d9ce; color: #888; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem; cursor: pointer; transition: all 0.2s; }
    #clear-btn:hover { border-color: #c4922a; color: #c4922a; }
    .selected-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .selected-tag { background: #000; color: #fff; border-radius: 16px; padding: 5px 10px 5px 12px; font-size: 0.78rem; display: flex; align-items: center; gap: 6px; }
    .tag-remove { background: #c4922a; border: none; color: #fff; width: 18px; height: 18px; border-radius: 50%; cursor: pointer; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; line-height: 1; flex-shrink: 0; }
    .section-label { font-size: 0.8rem; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.08em; }
    #product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; }
    .product-card { background: #fff; border: 2px solid #e0d9ce; border-radius: 12px; padding: 16px; cursor: pointer; position: relative; overflow: hidden; transition: all 0.2s; user-select: none; }
    .product-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); transform: translateY(-2px); }
    .product-card.selected { border-color: #c4922a; background: #fffbf5; }
    .card-emoji { font-size: 2rem; margin-bottom: 8px; }
    .card-name { font-size: 0.82rem; font-weight: 600; color: #1a1a1a; line-height: 1.3; margin-bottom: 8px; }
    .card-badge { display: inline-block; font-size: 0.68rem; padding: 2px 8px; border-radius: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
    .badge-skincare { background: #fce4ec; color: #c2185b; }
    .badge-haircare { background: #ede7f6; color: #7b1fa2; }
    .badge-makeup { background: #fbe9e7; color: #bf360c; }
    .badge-men { background: #e3f2fd; color: #1565c0; }
    .card-check { position: absolute; top: 8px; right: 8px; width: 22px; height: 22px; background: #c4922a; color: #fff; border-radius: 50%; display: none; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: bold; }
    .product-card.selected .card-check { display: flex; }
    .desc-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.88); color: #fff; padding: 14px; opacity: 0; transition: opacity 0.2s; display: flex; align-items: center; font-size: 0.78rem; line-height: 1.5; border-radius: 10px; }
    .product-card:hover .desc-overlay { opacity: 1; }
    .no-results { grid-column: 1/-1; text-align: center; color: #888; font-style: italic; padding: 40px 0; }
    #generate-btn { background: linear-gradient(135deg, #c4922a, #e8b84b); color: #000; border: none; border-radius: 28px; padding: 14px 36px; font-size: 1rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; align-self: center; transition: opacity 0.2s, transform 0.1s; }
    #generate-btn:hover { opacity: 0.9; transform: translateY(-2px); }
    #generate-btn:active { transform: translateY(0); }
    #generate-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
    .chat-section { background: #fff; border: 1px solid #e0d9ce; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
    .chat-header { background: linear-gradient(135deg, #c4922a, #e8b84b); padding: 12px 16px; font-size: 0.9rem; font-weight: 700; color: #000; letter-spacing: 0.06em; text-transform: uppercase; }
    #chat-window { min-height: 200px; max-height: 420px; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 14px; }
    .chat-placeholder { text-align: center; color: #b0a898; font-style: italic; font-size: 0.9rem; margin: auto; line-height: 1.6; }
    .message-group { display: flex; flex-direction: column; gap: 4px; }
    .msg-label { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
    .msg-label.user { color: #888; text-align: right; }
    .msg-label.bot { color: #c4922a; }
    .bubble { padding: 10px 14px; border-radius: 16px; font-size: 0.88rem; line-height: 1.6; max-width: 85%; word-wrap: break-word; }
    .bubble.user { background: #000; color: #fff; align-self: flex-end; margin-left: auto; border-bottom-right-radius: 4px; }
    .bubble.bot { background: #fdf8f1; border: 1px solid #e8d8b8; align-self: flex-start; border-bottom-left-radius: 4px; }
    .typing-indicator { display: flex; align-items: center; gap: 5px; padding: 10px 14px; background: #fdf8f1; border: 1px solid #e8d8b8; border-radius: 16px; border-bottom-left-radius: 4px; width: fit-content; }
    .typing-indicator span { width: 7px; height: 7px; background: #c4922a; border-radius: 50%; animation: bounce 1.2s infinite; }
    .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-5px); } }
    .chat-input-row { display: flex; gap: 10px; padding: 12px 16px; border-top: 1px solid #e0d9ce; background: #faf8f5; }
    #chat-input { flex: 1; border: 1.5px solid #d4c9b8; border-radius: 20px; padding: 9px 16px; font-size: 0.88rem; font-family: 'Georgia', serif; outline: none; background: #fff; transition: border-color 0.2s; }
    #chat-input:focus { border-color: #c4922a; }
    #chat-send { background: linear-gradient(135deg, #c4922a, #e8b84b); color: #000; border: none; border-radius: 20px; padding: 9px 20px; font-size: 0.82rem; font-weight: 700; text-transform: uppercase; cursor: pointer; letter-spacing: 0.05em; transition: opacity 0.2s; }
    #chat-send:hover { opacity: 0.9; }
    #chat-send:disabled { opacity: 0.4; cursor: not-allowed; }
    footer { background: #000; color: #888; text-align: center; padding: 18px 24px; font-size: 0.75rem; border-top: 2px solid #c4922a; letter-spacing: 0.05em; }
    footer a { color: #c4922a; text-decoration: none; }
    footer a:hover { text-decoration: underline; }
    .footer-links { margin-top: 6px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    [dir="rtl"] .bubble.user { margin-left: 0; margin-right: auto; border-bottom-right-radius: 16px; border-bottom-left-radius: 4px; }
    [dir="rtl"] .bubble.bot { border-bottom-left-radius: 16px; border-bottom-right-radius: 4px; }
    [dir="rtl"] .msg-label.user { text-align: left; }
    [dir="rtl"] .card-check { right: auto; left: 8px; }
    [dir="rtl"] .selected-header { flex-direction: row-reverse; }
    #chat-window::-webkit-scrollbar { width: 4px; }
    #chat-window::-webkit-scrollbar-track { background: #f0ece6; }
    #chat-window::-webkit-scrollbar-thumb { background: #c4922a; border-radius: 4px; }
    @media (max-width: 600px) { #product-grid { grid-template-columns: repeat(2, 1fr); } .logo-wordmark { font-size: 1.6rem; } }
  </style>
</head>
<body>

<header>
  <div class="header-top">
    <div class="logo-wordmark">L'<span>O</span>REAL <span>PARIS</span></div>
    <div class="logo-tagline">Because You're Worth It</div>
  </div>
  <div class="header-banner">
    <h1>Routine Builder</h1>
    <button class="rtl-toggle" id="rtl-toggle" onclick="toggleRTL()">RTL &#1593;&#1585;&#1576;&#1610;</button>
  </div>
</header>

<main>
  <div class="controls">
    <input type="text" id="search" placeholder="Search products by name or keyword..." oninput="filterProducts()" />
    <div class="cat-filters">
      <button class="cat-btn active" onclick="setCategory(this,'all')">All</button>
      <button class="cat-btn" onclick="setCategory(this,'skincare')">Skincare</button>
      <button class="cat-btn" onclick="setCategory(this,'haircare')">Haircare</button>
      <button class="cat-btn" onclick="setCategory(this,'makeup')">Makeup</button>
      <button class="cat-btn" onclick="setCategory(this,'men')">Men Expert</button>
    </div>
  </div>

  <div class="selected-section" id="selected-section">
    <div class="selected-header">
      <span class="selected-title">Selected Products (<span id="sel-count">0</span>)</span>
      <button id="clear-btn" onclick="clearAll()">Clear All</button>
    </div>
    <div class="selected-tags" id="selected-tags"></div>
  </div>

  <div class="section-label">Products</div>
  <div id="product-grid"></div>

  <button id="generate-btn" onclick="generateRoutine()">&#10024; Generate My Routine</button>

  <div class="chat-section">
    <div class="chat-header">About Your Routine</div>
    <div id="chat-window">
      <div class="chat-placeholder">Select products above and click "Generate My Routine" to get your personalized L'Oreal routine!</div>
    </div>
    <div class="chat-input-row">
      <input type="text" id="chat-input" placeholder="Ask a follow-up question about your routine..." />
      <button id="chat-send" onclick="sendFollowUp()">Send</button>
    </div>
  </div>
</main>

<footer>
  <div>&copy; 2026 L'Oreal Paris. All Rights Reserved.</div>
  <div class="footer-links">
    <a href="#">Privacy Policy</a>
    <a href="#">Terms of Use</a>
    <a href="#">Contact Us</a>
  </div>
</footer>

<script>
  var WORKER_URL = 'https://loreal-routine-builder.vxk5602.workers.dev';
  var currentCategory = 'all';
  var selectedIds = [];
  var conversationHistory = [];
  var isLoading = false;
  var isRTL = false;

  var PRODUCTS = [
    { id: 1, name: "Revitalift 1.5% Pure Hyaluronic Acid Serum", category: "skincare", emoji: "💧", description: "A lightweight serum with 1.5% pure hyaluronic acid that deeply hydrates and visibly plumps skin, reducing the appearance of wrinkles." },
    { id: 2, name: "Age Perfect Rosy Tone Face Moisturizer", category: "skincare", emoji: "🌸", description: "Formulated with Imperial Peony Extract to restore rosy tone and luminosity to mature skin while providing deep hydration." },
    { id: 3, name: "Pure Clay Purify & Mattify Face Mask", category: "skincare", emoji: "🌿", description: "A purifying clay mask with eucalyptus that deeply cleanses pores and controls excess oil for a refreshed, matte finish." },
    { id: 4, name: "Revitalift Triple Power Moisturizer", category: "skincare", emoji: "🔬", description: "Powered by Pro-Xylane, Hyaluronic Acid, and Vitamin C to visibly reduce wrinkles and firm skin in just 4 weeks." },
    { id: 5, name: "Bright Reveal 12% Niacinamide Dark Spot Serum", category: "skincare", emoji: "☀️", description: "A daily brightening serum with 12% Niacinamide and glycolic acid that visibly reduces dark spots and evens skin tone." },
    { id: 6, name: "Collagen Moisture Filler Day Cream", category: "skincare", emoji: "✨", description: "A daily moisturizer with micro-collagen that continuously fills in fine lines and wrinkles for smooth, cushioned skin." },
    { id: 7, name: "Elvive Total Repair 5 Shampoo", category: "haircare", emoji: "💪", description: "Repairs 5 signs of damaged hair: breakage, dryness, roughness, dullness, and split ends with Protein and Ceramide." },
    { id: 8, name: "EverPure Sulfate-Free Bond Repair Shampoo", category: "haircare", emoji: "🎨", description: "A sulfate-free shampoo that strengthens and repairs color-treated hair bonds without stripping color vibrancy." },
    { id: 9, name: "Elvive Dream Lengths Restoring Mask", category: "haircare", emoji: "🌟", description: "An intensely nourishing hair mask with Castor Oil and Biotin that restores length and strength to long, damaged hair." },
    { id: 10, name: "Extraordinary Oil Hair Serum", category: "haircare", emoji: "🫧", description: "A lightweight, fast-absorbing hair oil blend that transforms dull, dry hair into silky, luminous locks instantly." },
    { id: 11, name: "Elvive Hyaluron Plump Hydrating Shampoo", category: "haircare", emoji: "💦", description: "Infused with Hyaluronic Acid to attract and retain moisture, leaving dehydrated hair plump, bouncy, and hydrated." },
    { id: 12, name: "Infallible 24H Fresh Wear Foundation", category: "makeup", emoji: "💄", description: "A longwear, full-coverage foundation that is transfer-proof, sweat-proof, and waterproof for up to 24 hours of wear." },
    { id: 13, name: "True Match Super-Blendable Foundation", category: "makeup", emoji: "🎭", description: "Precisely matches skin's tone and texture with a natural finish. Available in 45 shades for every skin tone." },
    { id: 14, name: "Voluminous Original Mascara", category: "makeup", emoji: "👁️", description: "The classic L'Oreal mascara that builds lashes up to 5x their natural thickness for a bold, dramatic look." },
    { id: 15, name: "Infallible Pro-Matte Lip Color", category: "makeup", emoji: "👄", description: "An ultra-matte, long-lasting lip color that stays put for up to 16 hours with intense, saturated pigment." },
    { id: 16, name: "Lash Paradise Washable Mascara", category: "makeup", emoji: "✨", description: "A voluptuous, full-lash look with a wavy brush and soft-waxy formula for feathery, full lashes with zero clumps." },
    { id: 17, name: "Men Expert Hydra Energetic Moisturizer", category: "men", emoji: "⚡", description: "A powerful daily moisturizer with Vitamin C and Guarana that fights the 5 signs of tired-looking skin for men." },
    { id: 18, name: "Men Expert Barber Club Beard Oil", category: "men", emoji: "🧔", description: "A nourishing beard oil with cedar wood essential oil and argan oil that softens, conditions, and styles facial hair." }
  ];

  function loadSelected() {
    try {
      var saved = localStorage.getItem('loreal_routine_selected');
      if (saved) selectedIds = JSON.parse(saved);
    } catch(e) { selectedIds = []; }
  }

  function saveSelected() {
    try { localStorage.setItem('loreal_routine_selected', JSON.stringify(selectedIds)); } catch(e) {}
  }

  function toggleSelect(id) {
    var idx = selectedIds.indexOf(id);
    if (idx === -1) { selectedIds.push(id); } else { selectedIds.splice(idx, 1); }
    saveSelected();
    renderGrid();
    renderSelectedTags();
  }

  function clearAll() {
    selectedIds = [];
    saveSelected();
    renderGrid();
    renderSelectedTags();
  }

  function removeProduct(id) {
    var idx = selectedIds.indexOf(id);
    if (idx !== -1) selectedIds.splice(idx, 1);
    saveSelected();
    renderGrid();
    renderSelectedTags();
  }

  function setCategory(btn, cat) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    renderGrid();
  }

  function filterProducts() { renderGrid(); }

  function getFiltered() {
    var q = document.getElementById('search').value.toLowerCase().trim();
    return PRODUCTS.filter(function(p) {
      var matchCat = currentCategory === 'all' || p.category === currentCategory;
      var matchQ = !q || p.name.toLowerCase().indexOf(q) !== -1 || p.description.toLowerCase().indexOf(q) !== -1;
      return matchCat && matchQ;
    });
  }

  function badgeClass(cat) {
    var m = { skincare: 'badge-skincare', haircare: 'badge-haircare', makeup: 'badge-makeup', men: 'badge-men' };
    return m[cat] || '';
  }

  function catLabel(cat) {
    return cat === 'men' ? 'Men Expert' : cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  function renderGrid() {
    var grid = document.getElementById('product-grid');
    var filtered = getFiltered();
    if (filtered.length === 0) {
      grid.innerHTML = '<div class="no-results">No products found. Try a different search or category.</div>';
      return;
    }
    var html = '';
    filtered.forEach(function(p) {
      var sel = selectedIds.indexOf(p.id) !== -1;
      html += '<div class="product-card' + (sel ? ' selected' : '') + '" onclick="toggleSelect(' + p.id + ')">';
      html += '<div class="card-check">&#10003;</div>';
      html += '<div class="card-emoji">' + p.emoji + '</div>';
      html += '<div class="card-name">' + p.name + '</div>';
      html += '<span class="card-badge ' + badgeClass(p.category) + '">' + catLabel(p.category) + '</span>';
      html += '<div class="desc-overlay">' + p.description + '</div>';
      html += '</div>';
    });
    grid.innerHTML = html;
  }

  function renderSelectedTags() {
    var section = document.getElementById('selected-section');
    var tagsEl = document.getElementById('selected-tags');
    var countEl = document.getElementById('sel-count');
    if (selectedIds.length === 0) { section.classList.remove('visible'); return; }
    section.classList.add('visible');
    countEl.textContent = selectedIds.length;
    var html = '';
    selectedIds.forEach(function(id) {
      var p = PRODUCTS.find(function(x) { return x.id === id; });
      if (!p) return;
      html += '<div class="selected-tag">' + p.emoji + ' ' + p.name;
      html += '<button class="tag-remove" onclick="event.stopPropagation();removeProduct(' + id + ')">&#10005;</button></div>';
    });
    tagsEl.innerHTML = html;
  }

  function scrollChat() { var cw = document.getElementById('chat-window'); cw.scrollTop = cw.scrollHeight; }

  function clearPlaceholder() { var el = document.querySelector('.chat-placeholder'); if (el) el.remove(); }

  function appendMsg(role, text) {
    clearPlaceholder();
    var cw = document.getElementById('chat-window');
    var group = document.createElement('div');
    group.className = 'message-group';
    var label = document.createElement('div');
    label.className = 'msg-label ' + role;
    label.textContent = role === 'user' ? 'You' : "L'Oreal Advisor";
    var bubble = document.createElement('div');
    bubble.className = 'bubble ' + role;
    bubble.textContent = text;
    group.appendChild(label);
    group.appendChild(bubble);
    cw.appendChild(group);
    scrollChat();
  }

  function showTyping() {
    clearPlaceholder();
    var cw = document.getElementById('chat-window');
    var group = document.createElement('div');
    group.className = 'message-group';
    group.id = 'typing-group';
    var label = document.createElement('div');
    label.className = 'msg-label bot';
    label.textContent = "L'Oreal Advisor";
    var ind = document.createElement('div');
    ind.className = 'typing-indicator';
    ind.innerHTML = '<span></span><span></span><span></span>';
    group.appendChild(label);
    group.appendChild(ind);
    cw.appendChild(group);
    scrollChat();
  }

  function removeTyping() { var el = document.getElementById('typing-group'); if (el) el.remove(); }

  async function generateRoutine() {
    if (selectedIds.length === 0) { alert("Please select at least one product first!"); return; }
    if (isLoading) return;
    isLoading = true;
    document.getElementById('generate-btn').disabled = true;
    document.getElementById('chat-send').disabled = true;

    var selected = selectedIds.map(function(id) { return PRODUCTS.find(function(p) { return p.id === id; }); }).filter(Boolean);
    var productList = selected.map(function(p) { return '- ' + p.name + ': ' + p.description; }).join('\\n');
    var userMsg = "Generate a personalized beauty routine using these L'Oreal products:\\n" + productList;

    conversationHistory = [{ role: 'user', content: userMsg }];
    appendMsg('user', 'Generate my routine with ' + selected.length + ' selected product' + (selected.length > 1 ? 's' : '') + ': ' + selected.map(function(p){ return p.name; }).join(', '));
    showTyping();

    try {
      var res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory, mode: 'routine' })
      });
      var data = await res.json();
      removeTyping();
      if (data.choices && data.choices[0]) {
        var reply = data.choices[0].message.content;
        conversationHistory.push({ role: 'assistant', content: reply });
        appendMsg('bot', reply);
      } else {
        appendMsg('bot', "Sorry, I had trouble generating your routine. Please try again!");
      }
    } catch(err) {
      removeTyping();
      appendMsg('bot', "Connection issue — please try again!");
    }

    isLoading = false;
    document.getElementById('generate-btn').disabled = false;
    document.getElementById('chat-send').disabled = false;
  }

  async function sendFollowUp() {
    var input = document.getElementById('chat-input');
    var text = input.value.trim();
    if (!text || isLoading) return;
    isLoading = true;
    input.value = '';
    document.getElementById('chat-send').disabled = true;

    conversationHistory.push({ role: 'user', content: text });
    appendMsg('user', text);
    showTyping();

    try {
      var res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory, mode: 'followup' })
      });
      var data = await res.json();
      removeTyping();
      if (data.choices && data.choices[0]) {
        var reply = data.choices[0].message.content;
        conversationHistory.push({ role: 'assistant', content: reply });
        appendMsg('bot', reply);
      } else {
        appendMsg('bot', "I'm having trouble right now. Please try again!");
      }
    } catch(err) {
      removeTyping();
      appendMsg('bot', "Connection issue — please try again!");
    }

    isLoading = false;
    document.getElementById('chat-send').disabled = false;
    input.focus();
  }

  document.getElementById('chat-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendFollowUp();
  });

  function toggleRTL() {
    isRTL = !isRTL;
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.getElementById('rtl-toggle').textContent = isRTL ? 'LTR English' : 'RTL \u0639\u0631\u0628\u064a';
  }

  loadSelected();
  renderGrid();
  renderSelectedTags();
<\/script>
</body>
</html>`

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }

  if (request.method === 'GET') {
    return new Response(HTML, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    })
  }

  if (request.method === 'POST') {
    try {
      const { messages, mode } = await request.json()

      let systemPrompt
      if (mode === 'routine') {
        systemPrompt = `You are a professional L'Oreal beauty expert and routine specialist. The user has selected specific L'Oreal products and wants a personalized routine. Generate a clear, step-by-step daily beauty routine using ONLY the products they selected. For each product, explain: (1) when to use it (morning/night/weekly), (2) how to apply it correctly, and (3) why it benefits their skin or hair. Where relevant, explain how to layer products in the right order. Be warm, empowering, and specific. Use emojis to make it engaging. End by encouraging them to ask follow-up questions.`
      } else {
        systemPrompt = `You are a knowledgeable L'Oreal beauty advisor. Answer follow-up questions about the beauty routine, L'Oreal products, skincare, haircare, and makeup tips. Only answer questions related to beauty, L'Oreal products, or the routine. If asked unrelated questions, politely redirect to beauty topics. Be warm and helpful. Use emojis occasionally.`
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          max_tokens: 800,
          temperature: 0.7
        })
      })

      const data = await response.json()
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }
  }

  return new Response('Not found', { status: 404 })
}
