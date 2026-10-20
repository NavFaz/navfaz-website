(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const menu = $('#menuToggle'), nav = $('#mainNav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
    }));
  }
  const price = $('#priceInput'), discount = $('#discountInput'), result = $('#discountResult'), saving = $('#savingResult');
  const money = n => new Intl.NumberFormat('en-IN', {style:'currency', currency:'INR', maximumFractionDigits:2}).format(n);
  function updateDiscount() {
    if (!price || !discount || !result || !saving) return;
    const p = Number(price.value), d = Number(discount.value);
    if (price.value === '' || discount.value === '' || !Number.isFinite(p) || !Number.isFinite(d) || p < 0 || d < 0 || d > 100) {
      result.textContent = 'Enter valid values'; saving.textContent = 'Discount: 0–100%'; return;
    }
    result.textContent = money(p * (1 - d / 100)); saving.textContent = `You save ${money(p * d / 100)}`;
  }
  [price, discount].filter(Boolean).forEach(el => el.addEventListener('input', updateDiscount));
  updateDiscount();
  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();
  const catalog = [
    ['Percentage calculator','/calculators/percentage.html','calculator math percentage'],
    ['Discount calculator','/calculators/discount.html','calculator shopping discount sale'],
    ['GST calculator','/calculators/gst.html','calculator india tax gst'],
    ['EMI calculator','/calculators/emi.html','calculator finance loan emi'],
    ['Age calculator','/calculators/age.html','calculator date age'],
    ['Profit margin calculator','/calculators/profit-margin.html','calculator business profit margin'],
    ['Salary calculator','/calculators/salary.html','calculator salary income'],
    ['Savings goal calculator','/calculators/savings.html','calculator savings money'],
    ['Unit converter','/tools/unit-converter.html','tool convert units measurement'],
    ['Word counter','/tools/word-counter.html','tool writing words characters'],
    ['Text case converter','/tools/text-case.html','tool text uppercase lowercase'],
    ['Laptop buying guide','/guides/choose-a-laptop.html','guide product laptop computer buying'],
    ['Wireless headphones guide','/guides/wireless-headphones.html','guide product headphones audio'],
    ['Productivity apps guide','/guides/productivity-apps.html','guide software apps productivity']
  ];
  const search = $('#siteSearch'), output = $('#searchResults');
  if (search && output) {
    const render = () => {
      const q = search.value.trim().toLowerCase();
      output.innerHTML = '';
      if (!q) { output.hidden = true; return; }
      const matches = catalog.filter(x => (x[0] + ' ' + x[2]).toLowerCase().includes(q)).slice(0, 6);
      output.hidden = false;
      if (!matches.length) { output.textContent = 'No matching resource yet. Try “calculator”, “GST” or “laptop”.'; return; }
      matches.forEach(x => { const a = document.createElement('a'); a.href = x[1]; a.textContent = x[0] + ' ↗'; output.appendChild(a); });
    };
    search.addEventListener('input', render);
    search.addEventListener('keydown', e => { if (e.key === 'Enter' && output.querySelector('a')) location.href = output.querySelector('a').href; });
  }
  const newsletter = $('#newsletterForm'), message = $('#newsletterMessage');
  if (newsletter && message) newsletter.addEventListener('submit', e => {
    e.preventDefault(); message.textContent = 'Thanks for your interest. This form is a demo and has not sent or stored your email. Connect a mailing-list service before launch.';
  });
})();