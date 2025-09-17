
// Basic interactivity: theme toggle, lightbox, year
(function(){
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  // restore theme from localStorage
  const saved = localStorage.getItem('pd-theme');
  if(saved === 'dark') document.documentElement.classList.add('dark');
  themeBtn.addEventListener('click', ()=>{
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('pd-theme', isDark? 'dark' : 'light');
    themeBtn.textContent = isDark? '☀️' : '🌙';
  });

  // lightbox
  const photoGrid = document.getElementById('photoGrid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImage');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');

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
})();

