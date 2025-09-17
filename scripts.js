
// Basic interactivity: theme toggle, lightbox, year
(function(){
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const langBtn = document.getElementById('langToggle');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  // restore theme from localStorage
  const saved = localStorage.getItem('pd-theme');
  if(saved === 'dark') document.documentElement.classList.add('dark');
  themeBtn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  themeBtn.addEventListener('click', ()=>{
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('pd-theme', isDark? 'dark' : 'light');
    themeBtn.textContent = isDark? '☀️' : '🌙';
  });

  // i18n
  const dict = {
    zh: {
      'nav.about':'关于','nav.resume':'简历','nav.photo':'摄影','nav.quotes':'格言','nav.favorites':'喜欢',
      'hero.title':'你好，我是 <span class="accent">pinkdylan</span>',
      'hero.lead':'爱拍照的学生 / 开发者 / 喜欢干净简洁的界面设计。',
      'hero.ctaResume':'查看简历','hero.ctaPhotos':'摄影集',
      'about.title':'关于我',
      'about.body':'我叫 Dylan（网名 pinkdylan），目前学习计算机相关课程，兴趣包括摄影、产品设计与前端开发。喜欢简单、明快、有层次的界面风格，偏好苹果风格的留白与模糊卡片。',
      'resume.title':'简历','resume.intro':'在这里放置你的简历简介，以及下载链接。','resume.edu':'教育：××大学 · 专业','resume.skills':'技能：HTML / CSS / JavaScript / Python / 计算机基础','resume.projects':'项目：宠相随、五子棋网页、图像增强脚本等','resume.download':'下载完整简历 (resume.pdf)','resume.contact':'联系方式','resume.email':'邮箱：','resume.github':'GitHub：',
      'photo.title':'摄影记录','photo.hint':'点击任意照片查看大图','photo.cap1':'晨光 · 城市','photo.cap2':'海边','photo.cap3':'旧巷','photo.cap4':'夜景',
      'quotes.title':'人生格言',
      'favorites.title':'喜欢的电影与文学','favorites.movies':'电影','favorites.m1':'《海上钢琴师》','favorites.m2':'《千与千寻》','favorites.m3':'《肖申克的救赎》','favorites.books':'文学','favorites.b1':'村上春树 — 《挪威的森林》','favorites.b2':'东野圭吾 — 《解忧杂货店》','favorites.b3':'川端康成 — 《雪国》'
    },
    en: {
      'nav.about':'About','nav.resume':'Resume','nav.photo':'Photos','nav.quotes':'Quotes','nav.favorites':'Favorites',
      'hero.title':'Hi, I am <span class="accent">pinkdylan</span>',
      'hero.lead':'A student photographer / developer who loves clean UI.',
      'hero.ctaResume':'View Resume','hero.ctaPhotos':'Gallery',
      'about.title':'About Me',
      'about.body':'I am Dylan (aka pinkdylan), studying computer science. I enjoy photography, product thinking, and front-end development. I prefer Apple-style design: simplicity, clarity, and tasteful blur.',
      'resume.title':'Resume','resume.intro':'Place a short resume summary here with the download link.','resume.edu':'Education: University · Major','resume.skills':'Skills: HTML / CSS / JavaScript / Python / CS fundamentals','resume.projects':'Projects: Pet Companion, Gomoku site, Image enhancement scripts','resume.download':'Download full resume (resume.pdf)','resume.contact':'Contact','resume.email':'Email:','resume.github':'GitHub:',
      'photo.title':'Photography','photo.hint':'Click any photo to view large','photo.cap1':'Morning light · City','photo.cap2':'Seaside','photo.cap3':'Old alley','photo.cap4':'Nightscape',
      'quotes.title':'Life Quotes',
      'favorites.title':'Favorite Films & Books','favorites.movies':'Films','favorites.m1':'The Legend of 1900','favorites.m2':'Spirited Away','favorites.m3':'The Shawshank Redemption','favorites.books':'Books','favorites.b1':'Haruki Murakami — Norwegian Wood','favorites.b2':'Keigo Higashino — Miracles of the Namiya General Store','favorites.b3':'Yasunari Kawabata — Snow Country'
    }
  };

  const quoteSets = {
    zh: [
      '“一路向前，带着好奇心与温柔。”',
      '“保持专注，简洁是终极的复杂。”',
      '“用心感受光影，也热爱代码。”'
    ],
    en: [
      '“Keep moving with curiosity and kindness.”',
      '“Focus matters. Simplicity is the ultimate sophistication.”',
      '“Feel the light, and love the code.”'
    ]
  };

  function applyI18n(lang){
    const table = dict[lang] || dict.zh;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = table[key];
      if(typeof val === 'string'){
        // innerHTML because some strings include span markup
        el.innerHTML = val;
      }
    });
    // update quotes set
    activeQuotes = quoteSets[lang] || quoteSets.zh;
    qi = 0;
    if(quoteEl) quoteEl.textContent = activeQuotes[qi];
    // update html lang attr
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
    // update button label
    if(langBtn) langBtn.textContent = lang === 'en' ? '中' : 'EN';
    localStorage.setItem('pd-lang', lang);
  }

  const savedLang = localStorage.getItem('pd-lang') || 'zh';
  if(langBtn){
    langBtn.addEventListener('click', ()=>{
      const next = (localStorage.getItem('pd-lang') || 'zh') === 'zh' ? 'en' : 'zh';
      applyI18n(next);
    });
  }

  // lightbox
  const photoGrid = document.getElementById('photoGrid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImage');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');
  const pageInfo = document.getElementById('pageInfo');
  const filterBar = document.querySelector('.filters');

  photoGrid.addEventListener('click', (e)=>{
    const fig = e.target.closest('figure');
    if(!fig) return;
    const img = fig.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    const cap = fig.querySelector('figcaption');
    lbCaption.textContent = cap? cap.textContent : '';
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
  });

  lbClose.addEventListener('click', ()=>{
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden','true');
  });
  lightbox.addEventListener('click', (e)=>{
    if(e.target === lightbox) { lightbox.classList.remove('show'); lightbox.setAttribute('aria-hidden','true'); }
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // active nav by section in view
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav a'));
  const linkMap = new Map(navLinks.map(l => [l.getAttribute('href'), l]));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = '#' + entry.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href')===id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });
  sections.forEach(s => obs.observe(s));

  // quotes rotation (multilingual)
  let activeQuotes = quoteSets[savedLang] || quoteSets.zh;
  const quoteEl = document.querySelector('.quote');
  let qi = 0;
  if(quoteEl){
    setInterval(()=>{
      qi = (qi + 1) % activeQuotes.length;
      quoteEl.textContent = activeQuotes[qi];
    }, 6000);
  }

  // initial language apply
  applyI18n(savedLang);

  // Photo data (demo). Replace src with your images.
  const photos = [
    {src:'https://via.placeholder.com/1200x800?text=City+1',cap:{zh:'晨光 · 城市',en:'Morning · City'},cat:'city'},
    {src:'https://via.placeholder.com/1200x800?text=Sea+1',cap:{zh:'海边',en:'Seaside'},cat:'sea'},
    {src:'https://via.placeholder.com/1200x800?text=Street+1',cap:{zh:'旧巷',en:'Old Alley'},cat:'street'},
    {src:'https://via.placeholder.com/1200x800?text=Night+1',cap:{zh:'夜景',en:'Nightscape'},cat:'night'},
    {src:'https://via.placeholder.com/1200x800?text=City+2',cap:{zh:'桥影',en:'Bridge Shadows'},cat:'city'},
    {src:'https://via.placeholder.com/1200x800?text=Sea+2',cap:{zh:'浪',en:'Waves'},cat:'sea'},
    {src:'https://via.placeholder.com/1200x800?text=Street+2',cap:{zh:'行人',en:'Pedestrian'},cat:'street'},
    {src:'https://via.placeholder.com/1200x800?text=Night+2',cap:{zh:'霓虹',en:'Neon'},cat:'night'},
    {src:'https://via.placeholder.com/1200x800?text=City+3',cap:{zh:'屋顶',en:'Rooftop'},cat:'city'},
    {src:'https://via.placeholder.com/1200x800?text=Sea+3',cap:{zh:'礁岩',en:'Reef'},cat:'sea'},
    {src:'https://via.placeholder.com/1200x800?text=Street+3',cap:{zh:'转角',en:'Corner'},cat:'street'},
    {src:'https://via.placeholder.com/1200x800?text=Night+3',cap:{zh:'光轨',en:'Light Trails'},cat:'night'}
  ];

  const pageSize = 8;
  let currentPage = 1;
  let currentFilter = 'all';

  function getFiltered(){
    return currentFilter==='all' ? photos : photos.filter(p=>p.cat===currentFilter);
  }
  function renderGrid(){
    const lang = localStorage.getItem('pd-lang')||'zh';
    const data = getFiltered();
    const total = Math.max(1, Math.ceil(data.length / pageSize));
    currentPage = Math.min(currentPage, total);
    const start = (currentPage-1)*pageSize;
    const pageItems = data.slice(start, start+pageSize);
    photoGrid.innerHTML = pageItems.map(p=>
      `<figure class="photo-item"><img src="${p.src}" alt="photo"><figcaption>${(p.cap[lang]||p.cap.zh)}</figcaption></figure>`
    ).join('');
    pageInfo.textContent = `${currentPage} / ${total}`;
    prevPageBtn.disabled = currentPage<=1;
    nextPageBtn.disabled = currentPage>=total;
  }

  if(filterBar){
    filterBar.addEventListener('click', (e)=>{
      const btn = e.target.closest('[data-filter]');
      if(!btn) return;
      currentFilter = btn.getAttribute('data-filter');
      currentPage = 1;
      document.querySelectorAll('.filters .chip').forEach(b=>b.classList.toggle('active', b===btn));
      renderGrid();
    });
  }
  if(prevPageBtn && nextPageBtn){
    prevPageBtn.addEventListener('click', ()=>{ if(currentPage>1){ currentPage--; renderGrid(); }});
    nextPageBtn.addEventListener('click', ()=>{ currentPage++; renderGrid(); });
  }

  // Re-render grid when language changes
  const origApply = applyI18n;
  applyI18n = function(lang){
    origApply(lang);
    renderGrid();
  }

  // Initial grid render
  renderGrid();
})();



