const header=document.querySelector('header'),menu=document.querySelector('.menu'),nav=document.querySelector('nav'),bar=document.querySelector('.progress');addEventListener('scroll',()=>{header.classList.toggle('solid',scrollY>24);const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h?scrollY/h*100:0)+'%'});menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open);document.body.classList.toggle('locked',!open)});document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{menu?.setAttribute('aria-expanded','false');nav.classList.remove('open');document.body.classList.remove('locked')}));const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('section:not(.hero):not(.page-hero),article').forEach(el=>{el.classList.add('reveal');io.observe(el)});document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const m=e.currentTarget.querySelector('.success');m.hidden=false;m.scrollIntoView({behavior:'smooth',block:'nearest'})});




/* Keep technical compound terms together on mobile. */
(() => {
  const terms = ["自動火災報知設備","ウレタン塗膜防水","アスファルト防水","空調設備工事","換気設備工事","排煙設備工事","リノベーション","アフターサポート","高気密・高断熱","スマートホーム","メンテナンス","受変電設備","非常用電源","水質・保守点検","給水ポンプ","排水ポンプ","給水方式","給水設備","排水設備","衛生設備","照明設備","動力設備","弱電設備","通信設備","電気設備","冷媒配管","ドレン配管","ダクト製作","ダクト取付","改修工事","更新工事","シート防水","漏水調査","部分補修","防水工事","工程内検査","施工記録","注文住宅","定期点検","予防保全","緊急対応","現地調査","会社概要","お問い合わせ"];
  const selector = 'p, li, dt, dd, h1, h2, h3, a, strong';
  const escape = value => value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const pattern = new RegExp('(' + terms.sort((a,b) => b.length-a.length).map(escape).join('|') + ')', 'g');
  function protectTerms() {
    document.querySelectorAll(selector).forEach(root => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        pattern.lastIndex = 0;
        if (node.parentElement?.closest('.keep-word') || !pattern.test(node.data)) return;
        pattern.lastIndex = 0;
        const fragment = document.createDocumentFragment();
        let last = 0;
        node.data.replace(pattern, (match, _term, offset) => {
          fragment.append(node.data.slice(last, offset));
          const span = document.createElement('span');
          span.className = 'keep-word';
          span.textContent = match;
          fragment.append(span);
          last = offset + match.length;
          return match;
        });
        fragment.append(node.data.slice(last));
        node.replaceWith(fragment);
      });
    });
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', protectTerms) : protectTerms();
})();
