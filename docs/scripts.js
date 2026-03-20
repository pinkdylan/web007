
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
      'nav.about':'关于','nav.resume':'简历','nav.project':'项目','nav.photo':'摄影集','nav.quotes':'格言','nav.favorites':'喜欢',
      'hero.title':'你好，我是 <span class="accent">吴昱辰</span>（Pink Dylan）',
      'hero.lead':'热爱摄影的学生 / 全栈开发者 / 也在做产品设计与 AI 安全测试。',
      'hero.ctaResume':'查看简历','hero.ctaProject':'查看项目','hero.ctaPhotos':'摄影集',
      'about.title':'关于我',
      'about.body':'我叫 吴昱辰（英文名 Pink Dylan）。摄影对我来说是一种“观察世界”的方式：构图、色彩、比例与耐心，让我在现场更安静、更专注。因为喜欢老单反的机械质感，我也更在意“手感”和“反馈”，这份偏好从相机延伸到代码与产品里。<br><br>我是“观察者”，也是“造物主”：把想法变成可触摸的体验。学习上我会对 AI 与工程保持敏感，也会在产品视角里追问：用户到底需要什么、怎样的交互更能被信任与使用。<br><br>生活里我喜欢夜晚操场的奔跑、喜欢寝室拉上床帘的放松、喜欢和喜欢的人一起旅行——把日子过成诗，不是因为拥有了多少，而是因为看见了更多。',

      'resume.title':'简历',
      'resume.intro':'把我能做什么、我在学什么、我正在把它做成什么样，整理在这里。',
      'resume.edu':'教育：浙江中医药大学 · 计算机科学与技术（2023.09-2027.06）',
      'resume.role':'经历：校团委摄影部副部长（组织部门活动与管理）',
      'resume.skills':'技能：产品设计（PRD 到技术选型，Figma/Google Stitch）/ AI 安全测试 / 前端（Next.js + Cursor）/ 后端（Python + FastAPI）',
      'resume.projects':'项目实习：<span class="muted">宠相随 PetLink</span> / 图像去雾算法（深度学习+物理先验）/ LLM 安全测试与题库构建',
      'resume.awards':'参赛与荣誉：浙江省国际大学生创新大赛银奖、电子商务竞赛省银奖、证券投资大赛省赛银奖',
      'resume.download':'下载完整简历 (dylans_resume.pdf)',
      'resume.contact':'联系方式',
      'resume.email':'邮箱：',
      'resume.phone':'电话：',
      'resume.github':'GitHub：',

      'photo.title':'摄影集',
      'photo.hint':'点击任意照片查看大图',
      'photo.filter.all':'全部',
      'photo.filter.city':'城市',
      'photo.filter.street':'街头',
      'photo.filter.nature':'自然',
      'photo.filter.animal':'动物',

      'quotes.title':'人生格言',

      'project.title':'项目：宠相随 PetLink',
      'project.subtitle':'把“养宠的难”变成可记录、可分析、可决策的日常工具。',
      'project.what':'解决哪些痛点',
      'project.sol':'我们怎么做',
      'project.featureTitle':'核心能力',
      'project.feature1':'多模态健康存证：把记录结构化沉淀',
      'project.feature2':'AI 长记忆问诊：基于档案摘要进行语境推理与红线警示',
      'project.feature3':'BCS 体况量化：让体况评估更稳定、更省事',
      'project.current':'目前进展',
      'project.prd':'查看 PRD',
      'project.mvp':'查看 MVP 文档',
      'project.pain1':'病史记不清：就医时回顾困难、证据不足。',
      'project.pain2':'症状难复现：口述信息容易丢失、难以对比趋势。',
      'project.pain3':'AI 怎么用才靠谱：只问一次容易误判，需要结合档案。',
      'project.s1':'一键多模态记录：文字/语音 + 图片/短视频落到结构化时间轴与标签。',
      'project.s2':'AI 长记忆问诊：基于近 N 天健康档案摘要进行语境反哺与红线警示。',
      'project.s3':'BCS 体况量化：通过视觉与拍摄流程让体况评估更稳定。',
      'project.currentText':'BCS 视觉体重检测相关能力正在训练中，我们优先把核心交互链路跑通，并持续用数据与迭代提升体验。',
      'project.tech':'关键技术栈：Next.js / Prisma / OpenAI-兼容接口（AI API）/ 结构化数据闭环。',
      'project.photosTitle':'项目影像',
      'project.petlinkEmpty':'把 PetLink 图片放到 `petlink_photo` 里后，会自动出现在这里。',

      'favorites.title':'喜欢的电影与文学',
      'favorites.movies':'电影',
      'favorites.m1':'《花样年华》',
      'favorites.m2':'《完美的日子》',
      'favorites.m3':'《大话西游》',
      'favorites.books':'文学',
      'favorites.b1':'陈年喜等 — 《大口呼吸春天》',
      'favorites.b2':'王诗沐 — 《幕后产品》',
      'favorites.b3':'S.A.阿列克谢耶维奇 — 《二手时间》',
      'favorites.b4':'埃里克·乔根森 - 《纳瓦尔宝典》',
      'quotes.by':'— 吴昱辰',
      'open':'打开'
    },
    en: {
      'nav.about':'About','nav.resume':'Resume','nav.project':'Project','nav.photo':'Photo Gallery','nav.quotes':'Quotes','nav.favorites':'Favorites',
      'hero.title':'Hi, I am <span class="accent">Pink Dylan</span>',
      'hero.lead':'A student photographer / full-stack developer / product designer and AI security tester.',
      'hero.ctaResume':'View Resume','hero.ctaProject':'View Project','hero.ctaPhotos':'Photo Gallery',
      'about.title':'About Me',
      'about.body':'I am Pink Dylan. Photography is how I observe the world—composition, color, proportion, and patience keep me calm and focused on-site. I love the mechanical feel of old cameras, so I care about “hand feel” and feedback; it shows up in my code and product thinking too.<br><br>I am both an “observer” and a “maker”: turning ideas into tangible experiences. I stay curious about AI and engineering, and I keep asking from a product lens—what do users really need, and what kind of interaction builds trust?<br><br>In life I enjoy running on night tracks, pulling the curtains for quiet downtime, and traveling with someone I love—turning days into poetry, not because we have more, but because we see more.',

      'resume.title':'Resume',
      'resume.intro':'What I can do, what I am learning, and what I am shaping right now.',
      'resume.edu':'Education: Zhejiang Chinese Medical University · CS (2023.09-2027.06)',
      'resume.role':'Experience: Deputy Head, Photography Dept (Student Union)',
      'resume.skills':'Skills: Product design (from PRD to tech planning, Figma/Google Stitch) / AI security testing / Frontend (Next.js + Cursor) / Backend (Python + FastAPI)',
      'resume.projects':'Internship projects: <span class="muted">PetLink</span> / Image dehazing (deep learning + physical priors) / LLM red-teaming and bilingual test set building',
      'resume.awards':'Awards: Silver at Zhejiang International Innovation Competition, Silver at E-commerce competition, Silver at Securities Investment competition',
      'resume.download':'Download full resume (dylans_resume.pdf)',
      'resume.contact':'Contact',
      'resume.email':'Email:',
      'resume.phone':'Phone:',
      'resume.github':'GitHub:',

      'photo.title':'Photo Gallery',
      'photo.hint':'Click any photo to view large',
      'photo.filter.all':'All',
      'photo.filter.city':'City',
      'photo.filter.street':'Street',
      'photo.filter.nature':'Nature',
      'photo.filter.animal':'Animals',

      'quotes.title':'Life Quotes',

      'project.title':'Project: PetLink',
      'project.subtitle':'Turning “the difficulty of pet care” into a recordable, analyzable, decision-friendly daily tool.',
      'project.what':'What pain points we solve',
      'project.sol':'How we do it',
      'project.featureTitle':'Core capabilities',
      'project.feature1':'Multimodal health logging: structure and store your records',
      'project.feature2':'AI long-memory clinic: reason with archive summaries + red-line warnings',
      'project.feature3':'BCS body/weight quantification: more stable, more convenient scoring',
      'project.current':'Current progress',
      'project.prd':'View PRD',
      'project.mvp':'View MVP Docs',
      'project.pain1':'Unclear medical history: hard to review during vet visits, weak evidence.',
      'project.pain2':'Hard to reproduce symptoms: oral info gets lost, trends are difficult to compare.',
      'project.pain3':'AI that actually works: one-shot questions can be misleading; we need archive context.',
      'project.s1':'One-tap multimodal logging: text/voice + images/videos into structured timeline and tags.',
      'project.s2':'AI long-memory clinic: reasoning with summaries from the last N days + red-line warnings.',
      'project.s3':'BCS body-condition quantification: a more stable visual + capture flow for scoring.',
      'project.currentText':'BCS-related visual body/weight detection is under training. We focus on making the core interaction loop work first, then improve through data and iteration.',
      'project.tech':'Tech stack highlights: Next.js / Prisma / OpenAI-compatible AI API / structured data loop.',
      'project.photosTitle':'Project images',
      'project.petlinkEmpty':'Add PetLink images into `petlink_photo`, and they will appear here automatically.',

      'favorites.title':'Favorite Films & Books',
      'favorites.movies':'Films',
      'favorites.m1':'In the Mood for Love',
      'favorites.m2':'Perfect Days',
      'favorites.m3':'A Chinese Odyssey',
      'favorites.books':'Books',
      'favorites.b1':'Chen Nianxi et al. — Breathe in Spring',
      'favorites.b2':'Wang Shimu — Behind the Product',
      'favorites.b3':'S. A. Alexievich — Secondhand Time',
      'favorites.b4':'埃里克·乔根森 - 《纳瓦尔宝典》',
      'quotes.by':'— Pink Dylan',
      'open':'Open'
    }
  };

  const quoteSets = {
    zh: [
      '“我们把日子过成诗，不是因为拥有了多少，而是因为看见了更多。”',
      '“用心感受光影，也热爱代码。”',
      '“把好工具握在手里，也把反馈写进生活。”'
    ],
    en: [
      '“Turn days into poetry—not because we have more, but because we see more.”',
      '“Feel the light, and love the code.”',
      '“Hold good tools in your hands, and write feedback into life.”'
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

  // Photo data (served from docs/Photography/)
  const imgBase = 'Photography/';
  const photos = [
    // City
    {src: imgBase + 'morning_city.jpg', cap:{zh:'晨光 · 城市',en:'Morning · City'}, cat:'city', alt:{zh:'晨光下的城市',en:'City in morning light'}},
    {src: imgBase + 'tower.jpg', cap:{zh:'塔影',en:'Tower'}, cat:'city', alt:{zh:'塔影与光影',en:'Tower shadow & light'}},

    // Street / everyday
    {src: imgBase + 'coffee.jpg', cap:{zh:'咖啡',en:'Coffee'}, cat:'street', alt:{zh:'咖啡与街头氛围',en:'Coffee & street mood'}},
    {src: imgBase + 'tea.jpg', cap:{zh:'热茶',en:'Tea'}, cat:'street', alt:{zh:'热茶的温度',en:'Warm tea'}},
    {src: imgBase + 'leaves.jpg', cap:{zh:'落叶',en:'Leaves'}, cat:'street', alt:{zh:'落叶纹理',en:'Leaf textures'}},
    {src: imgBase + 'tree.jpg', cap:{zh:'树',en:'Tree'}, cat:'street', alt:{zh:'树的轮廓',en:'Tree silhouette'}},
    {src: imgBase + '2ffdf51ce0848ad06aafa8e4d3cc00dd.jpg', cap:{zh:'摄影集 · 01',en:'Photo Set · 01'}, cat:'street', alt:{zh:'个人作品集摄影作品 01',en:'Personal photo 01'}},
    {src: imgBase + '4559eb00e55189da04744400dae36715.jpg', cap:{zh:'摄影集 · 02',en:'Photo Set · 02'}, cat:'street', alt:{zh:'个人作品集摄影作品 02',en:'Personal photo 02'}},
    {src: imgBase + '7e8de5665d156f37a223198a045fc269.jpg', cap:{zh:'摄影集 · 03',en:'Photo Set · 03'}, cat:'street', alt:{zh:'个人作品集摄影作品 03',en:'Personal photo 03'}},
    {src: imgBase + 'b69c0c77057f3ff7ecdcf28141d2e40f.jpg', cap:{zh:'摄影集 · 04',en:'Photo Set · 04'}, cat:'street', alt:{zh:'个人作品集摄影作品 04',en:'Personal photo 04'}},

    // Nature
    {src: imgBase + 'flower.jpg', cap:{zh:'花',en:'Flower'}, cat:'nature', alt:{zh:'花的细节',en:'Flower detail'}},

    // Animals
    {src: imgBase + 'bird.jpg', cap:{zh:'鸟',en:'Bird'}, cat:'animal', alt:{zh:'鸟的瞬间',en:'A moment with a bird'}},
    {src: imgBase + 'zoo.jpg', cap:{zh:'动物园',en:'Zoo'}, cat:'animal', alt:{zh:'动物园的景象',en:'Zoo scene'}}
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
      `<figure class="photo-item"><a href="${p.src}" target="_blank" rel="noopener"><img src="${p.src}" alt="${(p.alt && (p.alt[lang] || p.alt.zh)) || 'photo'}"></a><figcaption>${(p.cap[lang]||p.cap.zh)}</figcaption></figure>`
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

  // PetLink "film slice" slider
  const petlinkPrevBtn = document.getElementById('petlinkPrev');
  const petlinkNextBtn = document.getElementById('petlinkNext');
  const petlinkScroller = document.getElementById('petlinkScroller');
  const petlinkEmpty = document.getElementById('petlinkEmpty');

  // NOTE: GitHub Pages can’t list folder contents.
  // After you add your real PetLink images, tell me the filenames in `docs/petlink_photo/`,
  // and I’ll update this array accordingly.
  const petlinkPhotos = [
    {src:'petlink_photo/1.png', alt:{zh:'PetLink 01',en:'PetLink 01'}},
    {src:'petlink_photo/2.png', alt:{zh:'PetLink 02',en:'PetLink 02'}},
    {src:'petlink_photo/3.png', alt:{zh:'PetLink 03',en:'PetLink 03'}},
    {src:'petlink_photo/4.png', alt:{zh:'PetLink 04',en:'PetLink 04'}},
    {src:'petlink_photo/5.png', alt:{zh:'PetLink 05',en:'PetLink 05'}},
    {src:'petlink_photo/6.png', alt:{zh:'PetLink 06',en:'PetLink 06'}}
  ];

  function renderPetlinkFilm(){
    if(!petlinkScroller) return;

    if(!petlinkPhotos.length){
      if(petlinkEmpty) petlinkEmpty.style.display = 'block';
      if(petlinkPrevBtn) petlinkPrevBtn.style.display = 'none';
      if(petlinkNextBtn) petlinkNextBtn.style.display = 'none';
      petlinkScroller.innerHTML = '';
      return;
    }

    if(petlinkEmpty) petlinkEmpty.style.display = 'none';
    if(petlinkPrevBtn) petlinkPrevBtn.style.display = '';
    if(petlinkNextBtn) petlinkNextBtn.style.display = '';

    const lang = localStorage.getItem('pd-lang')||'zh';
    petlinkScroller.innerHTML = petlinkPhotos.map((p, i) => {
      const alt = (p.alt && (p.alt[lang] || p.alt.zh)) || `PetLink ${i + 1}`;
      return `
        <figure class="film-slide" data-slide="${i}">
          <a href="${p.src}" target="_blank" rel="noopener">
            <img src="${p.src}" alt="${alt}" />
          </a>
        </figure>
      `;
    }).join('');
  }

  function stepPetlink(delta){
    if(!petlinkScroller) return;
    petlinkScroller.scrollBy({ left: delta, behavior: 'smooth' });
  }

  if(petlinkPrevBtn) petlinkPrevBtn.addEventListener('click', () => stepPetlink(-260));
  if(petlinkNextBtn) petlinkNextBtn.addEventListener('click', () => stepPetlink(260));

  renderPetlinkFilm();
})();
