
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
      'hero.lead':'热爱摄影的学生 / 开发者 / 喜欢简约质朴的生活。',
      'hero.ctaResume':'查看简历','hero.ctaPhotos':'摄影集',
      'about.title':'关于我',
      'about.body':'我叫 Dylan（网名 pinkdylan），计算机科学与技术专业本科生，热爱摄影、攀登、绘画。希望从事产品设计与开发。我始终相信，所有关于美好的相遇，都并非偶然。它们源于我们对生活的无限热爱，源于心中那一片永不荒芜的诗意田野。<br><br>我们把日子过成诗，不是因为拥有了多少，而是因为看见了更多。看见清晨第一缕阳光穿透薄雾的金色，听见落叶在秋风中轻声的告别，闻见街角咖啡店飘出的温暖香气，感受冬日里一杯热茶带来的熨帖。',
      'resume.title':'简历','resume.intro':'下面是我的简历简介和下载链接呦～。','resume.edu':'教育：浙江中医药大学大学 · 27届计算机科学与技术专业','resume.skills':'技能：Java后端/Oracle数据库/产品设计/摄影/绘画','resume.projects':'项目：宠相随、坦克大战游戏网页设计、图像增强脚本等','resume.download':'下载完整简历 (dylans_resume.pdf)','resume.contact':'联系方式','resume.email':'邮箱：','resume.github':'GitHub：',
      'photo.title':'摄影记录','photo.hint':'点击任意照片查看大图','photo.cap1':'晨光 · 城市','photo.cap2':'海边','photo.cap3':'旧巷','photo.cap4':'夜景',
      'photo.filter.all':'全部','photo.filter.city':'城市','photo.filter.sea':'海边','photo.filter.street':'街头','photo.filter.fav':'最爱',
      'quotes.title':'人生格言',
      'favorites.title':'喜欢的电影与文学','favorites.movies':'电影','favorites.m1':'《花样年华》','favorites.m2':'《完美的日子》','favorites.m3':'《大话西游》','favorites.books':'文学','favorites.b1':'陈年喜等 — 《大口呼吸春天》','favorites.b2':'王诗沐 — 《幕后产品》','favorites.b3':'S.A.阿列克谢耶维奇 — 《二手时间》','open':'打开'
    },
    en: {
      'nav.about':'About','nav.resume':'Resume','nav.photo':'Photos','nav.quotes':'Quotes','nav.favorites':'Favorites',
      'hero.title':'Hi, I am <span class="accent">pinkdylan</span>',
      'hero.lead':'A student photographer / developer who enjoys a simple, grounded life.',
      'hero.ctaResume':'View Resume','hero.ctaPhotos':'Gallery',
      'about.title':'About Me',
      'about.body':'I am Dylan (aka pinkdylan), a CS undergrad who loves photography, hiking, and drawing. I hope to work in product design and development. I believe beautiful encounters come from our love of life and a poetic heart.<br><br>We try to live poetically not because we have more, but because we see more—the first morning light through mist, the whisper of falling leaves, the warm aroma of coffee at the corner, and the comfort of a hot tea in winter.',
      'resume.title':'Resume','resume.intro':'Below is my resume and download link～','resume.edu':'Education: Zhejiang Chinese Medical University · CS Class of 2027','resume.skills':'Skills: Java backend / Oracle DB / Product design / Photography / Drawing','resume.projects':'Projects: Pet Companion, Tank Battle web game, Image enhancement scripts','resume.download':'Download full resume (dylans_resume.pdf)','resume.contact':'Contact','resume.email':'Email:','resume.github':'GitHub:',
      'photo.title':'Photography','photo.hint':'Click any photo to view large','photo.cap1':'Morning light · City','photo.cap2':'Seaside','photo.cap3':'Old alley','photo.cap4':'Nightscape',
      'photo.filter.all':'All','photo.filter.city':'City','photo.filter.sea':'Sea','photo.filter.street':'Street','photo.filter.fav':'Faves',
      'quotes.title':'Life Quotes',
      'favorites.title':'Favorite Films & Books','favorites.movies':'Films','favorites.m1':'In the Mood for Love','favorites.m2':'Perfect Days','favorites.m3':'A Chinese Odyssey','favorites.books':'Books','favorites.b1':'Chen Nianxi et al. — Breathe in Spring','favorites.b2':'Wang Shimu — Behind the Product','favorites.b3':'S. A. Alexievich — Secondhand Time','open':'Open'
    }
  };

  const quoteSets = {
    zh: [
      '“一路向前，带着好奇心与温柔。”',
      '“面朝大海，春暖花开。”',
      '“用心感受光影，也热爱代码。”'
    ],
    en: [
      '“Keep moving with curiosity and kindness.”',
      '“Facing the Sea, with Spring Blossoms.”',
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
    e.preventDefault();
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

  // Photo data from web007/dylans_photos
  const photos = [
    {src:'/morning_city.jpg',cap:{zh:'晨光 · 城市',en:'Morning · City'},cat:'city'},
    {src:'web007/coffee.jpg',cap:{zh:'咖啡',en:'Coffee'},cat:'street'},
    {src:'web007/flower.jpg',cap:{zh:'花',en:'Flower'},cat:'fav'},
    {src:'web007/leaves.jpg',cap:{zh:'落叶',en:'Leaves'},cat:'street'},
    {src:'web007/love.jpg',cap:{zh:'最爱',en:'Favorite'},cat:'fav'},
    {src:'web007/tea.jpg',cap:{zh:'热茶',en:'Tea'},cat:'street'},
    {src:'web007/tower.jpg',cap:{zh:'塔影',en:'Tower'},cat:'city'},
    {src:'web007/tree.jpg',cap:{zh:'树',en:'Tree'},cat:'street'},
    {src:'web007/zoo.jpg',cap:{zh:'动物园',en:'Zoo'},cat:'fav'},
    {src:'web007/bird.jpg',cap:{zh:'鸟',en:'Bird'},cat:'fav'}
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
      `<figure class="photo-item"><a href="${p.src}" target="_blank" rel="noopener"><img src="${p.src}" alt="photo"></a><figcaption>${(p.cap[lang]||p.cap.zh)}</figcaption></figure>`
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

