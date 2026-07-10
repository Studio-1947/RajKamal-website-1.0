import React, { useState, useEffect, useRef } from 'react';
import { IMAGES } from '../data/arData';

const CONFIG = {
  price: 1499,
  totalCopies: 1500,
  copiesLeftInitial: 417,
  maxPerPerson: 5,
  launchISO: "2026-08-01T11:00:00+05:30"
};

const ArPage: React.FC = () => {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [qty, setQty] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Stock tracking states
  const [copiesLeft, setCopiesLeft] = useState(CONFIG.copiesLeftInitial);
  const [reserved, setReserved] = useState(CONFIG.totalCopies - CONFIG.copiesLeftInitial);
  const [stockLeft, setStockLeft] = useState(0);
  const [reservedCount, setReservedCount] = useState(0);
  const [barWidth, setBarWidth] = useState('0%');
  const [assignedNo, setAssignedNo] = useState('No. 0835 / 1500');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });

  // Refs for signature animation
  const certRef = useRef<HTMLDivElement>(null);
  const penRectRef = useRef<SVGRectElement>(null);
  const penNibRef = useRef<SVGCircleElement>(null);
  const penCursorRef = useRef<SVGSVGElement>(null);
  const penInkRef = useRef<SVGSVGElement>(null);
  const pageWrapRef = useRef<HTMLDivElement>(null);

  // Signature script execution
  const runSignAnimation = () => {
    const penRect = penRectRef.current;
    const penNib = penNibRef.current;
    const penCursor = penCursorRef.current;
    const penInk = penInkRef.current;
    const pageWrap = pageWrapRef.current;

    if (!penRect || !penNib || !penCursor || !penInk || !pageWrap) return;

    const FULL = 610.12;
    const MIDY = 176;
    const X0 = -4;
    const WSPAN = 624;

    const placeCursor = (cx: number, cy: number) => {
      const svgBox = penInk.getBoundingClientRect();
      const wrapBox = pageWrap.getBoundingClientRect();
      const px = svgBox.left - wrapBox.left + (cx / FULL) * svgBox.width;
      const py = svgBox.top - wrapBox.top + (cy / 352.2) * svgBox.height;
      penCursor.style.left = `${px}px`;
      penCursor.style.top = `${py}px`;
    };

    penRect.setAttribute('x', X0.toString());
    penRect.setAttribute('width', '0');

    let t0: number | null = null;
    const dur = 2600;

    penNib.style.opacity = '1';
    penCursor.style.opacity = '1';

    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      // Easing: easeInOutQuad
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const w = e * WSPAN;
      const cx = X0 + w;

      penRect.setAttribute('width', w.toString());
      const cy = MIDY + Math.sin(p * 22) * 46 * (1 - p * 0.4);
      penNib.setAttribute('cx', cx.toString());
      penNib.setAttribute('cy', cy.toString());

      placeCursor(cx, cy);

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        penNib.style.opacity = '0';
        penCursor.style.opacity = '0';
      }
    };
    requestAnimationFrame(step);
  };

  // Intersection Observers and Interval timers
  useEffect(() => {
    // 1. Scroll reveal observer
    let signTriggered = false;
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
          if (entry.target.id === 'cert' && !signTriggered) {
            signTriggered = true;
            setTimeout(runSignAnimation, 400);
          }
        }
      });
    }, { threshold: 0.12 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => revealObserver.observe(el));

    // 2. Stock animate count observer
    let stockDone = false;
    const stockPanel = document.querySelector('.stock-panel');
    const animateCount = (to: number, setValue: React.Dispatch<React.SetStateAction<number>>) => {
      let t0: number | null = null;
      const dur = 1400;
      const step = (ts: number) => {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setValue(Math.round(to * e));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const stockObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !stockDone) {
          stockDone = true;
          animateCount(copiesLeft, setStockLeft);
          animateCount(reserved, setReservedCount);
          setTimeout(() => {
            setBarWidth(`${((reserved / CONFIG.totalCopies) * 100).toFixed(1)}%`);
          }, 200);
          stockObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    if (stockPanel) stockObserver.observe(stockPanel);

    // 3. Countdown timer logic
    const targetTime = new Date(CONFIG.launchISO).getTime();
    const pad = (n: number) => (n < 10 ? '0' : '') + n;
    
    const updateCountdown = () => {
      let d = targetTime - Date.now();
      if (d < 0) d = 0;
      setTimeLeft({
        days: pad(Math.floor(d / 86400000)),
        hours: pad(Math.floor((d % 86400000) / 3600000)),
        mins: pad(Math.floor((d % 3600000) / 60000)),
        secs: pad(Math.floor((d % 60000) / 1000)),
      });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup
    return () => {
      revealElements.forEach((el) => revealObserver.unobserve(el));
      if (stockPanel) stockObserver.unobserve(stockPanel);
      clearInterval(intervalId);
    };
  }, [copiesLeft, reserved]);

  // Field validation helper
  const handleInputChange = (field: string, val: string) => {
    if (errors[field]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }

    if (field === 'name') setName(val);
    if (field === 'email') setEmail(val);
    if (field === 'phone') setPhone(val);
    if (field === 'address') setAddress(val);
    if (field === 'city') setCity(val);
    if (field === 'pin') setPin(val);
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    const errMsgs = {
      hi: {
        name: "कृपया नाम भरें",
        email: "सही ईमेल भरें",
        phone: "10 अंकों का सही नंबर",
        address: "कृपया पता भरें",
        city: "शहर भरें",
        pin: "6 अंकों का पिन"
      },
      en: {
        name: "Please enter your name",
        email: "Enter a valid email",
        phone: "Enter a valid 10-digit number",
        address: "Please enter your address",
        city: "Enter city",
        pin: "Enter a 6-digit PIN"
      }
    };

    const msgs = lang === 'en' ? errMsgs.en : errMsgs.hi;

    if (name.trim().length < 2) tempErrors.name = msgs.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) tempErrors.email = msgs.email;
    if (!/^[6-9]\d{9}$/.test(phone)) tempErrors.phone = msgs.phone;
    if (address.trim().length < 6) tempErrors.address = msgs.address;
    if (city.trim().length < 2) tempErrors.city = msgs.city;
    if (!/^\d{6}$/.test(pin)) tempErrors.pin = msgs.pin;

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      const firstError = Object.keys(tempErrors)[0];
      const el = document.getElementById(`f_${firstError}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    return true;
  };

  const handlePay = () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const assigned = reserved + 1;
      const nextReserved = reserved + qty;
      const nextLeft = Math.max(0, copiesLeft - qty);

      setReserved(nextReserved);
      setCopiesLeft(nextLeft);

      setStockLeft(nextLeft);
      setReservedCount(nextReserved);
      setBarWidth(`${((nextReserved / CONFIG.totalCopies) * 100).toFixed(1)}%`);

      setAssignedNo(`No. ${String(assigned).padStart(4, '0')} / 1500`);
      setShowModal(true);
      setIsProcessing(false);
    }, 900);
  };

  const handlePlus = () => {
    if (qty < Math.min(CONFIG.maxPerPerson, copiesLeft)) {
      setQty(qty + 1);
    }
  };

  const handleMinus = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  // Translations object matching S from original HTML script
  const t = {
    hi: {
      pay: "भुगतान करें",
      processing: "प्रोसेस हो रहा है…",
      marquee: "हस्ताक्षरित प्रति · क्रमांकित संस्करण · नीले जेल पेन से साइन · बुकर विजेता लेखिका · निःशुल्क डिलीवरी · "
    },
    en: {
      pay: "Pay",
      processing: "Processing…",
      marquee: "signed copy · numbered edition · signed in blue gel pen · booker prize author · free delivery · "
    }
  }[lang];

  return (
    <div className={`campaign-page ${lang === 'en' ? 'lang-en' : ''}`}>
      {/* Scope all stylesheet imports and configurations in scoped nested CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Tiro+Devanagari+Hindi:ital@0;1&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        .campaign-page {
          --red:#E1352A; --red-deep:#B22A20; --red-ink:#8E2018;
          --bone:#ECE3D0; --paper:#F6F1E6; --paper-2:#FBF7EE;
          --ink:#17130E; --ink-2:#403930; --muted:#8A8272;
          --line:rgba(23,19,14,.16); --line-soft:rgba(23,19,14,.09);
          --gold:#C39A55;
          --pen:#1B3FD1; --pen-deep:#122A9C; --pen-light:#3C63F0;
          --disp:"Fraunces",Georgia,serif;
          --hin:"Tiro Devanagari Hindi",serif;
          --mono:"Space Mono",ui-monospace,monospace;
          --maxw:1200px;

          background:var(--paper);color:var(--ink);font-family:var(--disp);font-optical-sizing:auto;
          -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden;

          h1,h2,h3,h4{margin:0;font-weight:400;line-height:1.02}
          p{margin:0}
          a{color:inherit;text-decoration:none}
          img{display:block;max-width:100%}
          .hin{font-family:var(--hin)}
          .mono{font-family:var(--mono)}
          .wrap{max-width:var(--maxw);margin:0 auto;padding:0 28px}
          .eyebrow{font-family:var(--mono);font-size:11.5px;letter-spacing:.28em;text-transform:uppercase;color:var(--red-deep);font-weight:700}
          .section{padding:clamp(64px,9vw,120px) 0;position:relative}

          .en{display:none}
          &.lang-en .hi{display:none}
          &.lang-en .en{display:inline}

          /* ---------- BUTTONS ---------- */
          .btn{display:inline-flex;align-items:center;gap:.6em;font-family:var(--mono);font-weight:700;
            font-size:13px;letter-spacing:.06em;text-transform:uppercase;padding:15px 26px;border:1.5px solid var(--ink);
            background:var(--ink);color:var(--paper);cursor:pointer;border-radius:0;transition:.25s ease;line-height:1}
          .btn:hover{background:transparent;color:var(--ink)}
          .btn--red{background:var(--red);border-color:var(--red);color:#fff}
          .btn--red:hover{background:transparent;color:var(--red)}
          .btn--ghost{background:transparent;color:var(--ink)}
          .btn--ghost:hover{background:var(--ink);color:var(--paper)}
          .btn--onred{background:#fff;border-color:#fff;color:var(--red-deep)}
          .btn--onred:hover{background:transparent;color:#fff}
          .btn .arw{transition:transform .25s ease}
          .btn:hover .arw{transform:translateX(4px)}

          /* ---------- HERO ---------- */
          .hero{background:var(--red);color:#fff;position:relative;overflow:hidden;padding-top:clamp(40px,6vw,74px)}
          .hero-grid{display:grid;grid-template-columns:1fr;gap:34px;align-items:center;position:relative;z-index:2}
          .hero-lede .over{font-family:var(--disp);font-style:italic;font-size:clamp(15px,2.4vw,20px);color:rgba(255,255,255,.9);margin-bottom:16px}
          .hero-lede .over .en{font-style:normal}
          .hero-title{font-family:var(--hin);color:#fff;font-size:clamp(52px,12.5vw,118px);line-height:.94;letter-spacing:-.01em}
          .hero-title span{display:block}
          .hero-sub{margin-top:22px;display:flex;flex-wrap:wrap;align-items:baseline;gap:10px 20px}
          .hero-author{font-size:clamp(24px,5vw,34px);color:#fff}
          .hero-trans{font-family:var(--mono);font-size:12px;letter-spacing:.08em;color:rgba(255,255,255,.85);text-transform:uppercase}
          .hero-copy{margin-top:22px;max-width:46ch;font-size:clamp(15px,1.6vw,17.5px);line-height:1.62;color:rgba(255,255,255,.94)}
          .hero-cta{margin-top:30px;display:flex;flex-wrap:wrap;gap:14px;align-items:center}
          .hero-price{font-family:var(--mono);font-size:12.5px;letter-spacing:.05em;color:rgba(255,255,255,.9)}
          .hero-price b{font-size:16px;color:#fff}
          .hero-price s{opacity:.6;margin-left:8px}
          .book-stage{position:relative;display:flex;justify-content:center;align-items:center;min-height:340px}
          .book-stage .halo{position:absolute;width:78%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(0,0,0,.20),transparent 62%);filter:blur(6px);bottom:2%;z-index:1}
          .book-img{position:relative;z-index:2;width:min(70%,330px);filter:drop-shadow(0 30px 40px rgba(0,0,0,.32));animation:floaty 6s ease-in-out infinite}
          @keyframes floaty{0%,100%{transform:translateY(0) rotate(-.3deg)}50%{transform:translateY(-14px) rotate(.3deg)}}
          .book-tag{position:absolute;z-index:3;right:2%;top:6%;background:var(--ink);color:#fff;font-family:var(--mono);
            font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;padding:9px 12px;line-height:1.5;text-align:center;
            transform:rotate(4deg);box-shadow:0 8px 20px rgba(0,0,0,.28)}
          .book-tag b{display:block;font-size:19px;letter-spacing:.02em}
          @media(min-width:860px){.hero-grid{grid-template-columns:1.05fr .95fr;gap:40px}.book-img{width:min(86%,380px)}}
          .hero-marquee{position:relative;z-index:2;margin-top:clamp(30px,5vw,52px);border-top:1px solid rgba(255,255,255,.28);border-bottom:1px solid rgba(255,255,255,.28);overflow:hidden;padding:12px 0}
          .mq-track{display:flex;gap:44px;width:max-content;animation:mq 26s linear infinite;font-family:var(--mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.9)}
          .mq-track span{white-space:nowrap;display:flex;align-items:center;gap:44px}
          .mq-track span::after{content:"✶";opacity:.7}
          @keyframes mq{to{transform:translateX(-50%)}}

          .torn{display:block;width:100%;height:26px;line-height:0}
          .torn svg{display:block;width:100%;height:100%}

          /* ---------- LIMITED / SIGNING ---------- */
          .limited{background:var(--ink);color:var(--bone);position:relative}
          .limited .eyebrow{color:var(--red)}
          .limited-head{display:grid;grid-template-columns:1fr;gap:20px;align-items:end;margin-bottom:44px}
          .limited-head h2{font-size:clamp(34px,6vw,62px);line-height:1.0;color:#fff}
          .limited-head .h-side{max-width:40ch;font-size:15.5px;line-height:1.6;color:rgba(236,227,208,.78)}
          @media(min-width:860px){.limited-head{grid-template-columns:1.3fr .9fr}}
          .cert-grid{display:grid;grid-template-columns:1fr;gap:26px}
          @media(min-width:920px){.cert-grid{grid-template-columns:1.05fr .95fr;gap:36px;align-items:start}}

          /* signing card = real book page */
          .cert{background:linear-gradient(180deg,#1c1712,#14100b);border:1px solid rgba(195,154,85,.4);padding:22px clamp(18px,3vw,26px) 22px;position:relative;box-shadow:0 30px 60px rgba(0,0,0,.4)}
          .cert-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:16px}
          .cert-top .lbl{font-family:var(--mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
          .cert-no{font-family:var(--mono);font-size:11px;color:rgba(236,227,208,.8);text-align:right;line-height:1.4}
          .cert-no b{display:block;font-size:19px;color:#fff;letter-spacing:.04em}
          .page-wrap{position:relative;background:#fff;box-shadow:0 14px 34px rgba(0,0,0,.5);line-height:0}
          .page-img{width:100%;display:block}
          /* signature overlay positioned in the empty space above the colophon */
          .pen-ink{position:absolute;left:50%;top:55.5%;transform:translateX(-50%);width:52%;height:auto;overflow:visible;z-index:2}
          .pen-path{fill:var(--pen)}
          .pen-nib{fill:var(--pen-light);opacity:0}
          .pen-cursor{position:absolute;width:22px;height:22px;left:0;top:0;z-index:3;opacity:0;transform:translate(-4px,-16px) rotate(38deg);pointer-events:none;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
          .cert-foot{display:flex;justify-content:space-between;align-items:center;gap:14px;margin-top:16px}
          .cert-foot .by{font-size:14px;color:rgba(236,227,208,.9)}
          .cert-foot .by em{font-family:var(--mono);font-style:normal;font-size:10px;color:var(--muted);display:block;letter-spacing:.04em;margin-top:3px}
          .replay{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--pen-light);
            background:none;border:1px solid rgba(60,99,240,.55);padding:9px 13px;cursor:pointer;transition:.2s;white-space:nowrap}
          .replay:hover{background:var(--pen);border-color:var(--pen);color:#fff}

          /* stock + countdown */
          .stock-panel{display:flex;flex-direction:column;gap:26px;justify-content:center}
          .count-block .clabel{font-family:var(--mono);font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:rgba(236,227,208,.6);margin-bottom:12px}
          .timer{display:flex;gap:10px}
          .tcell{background:rgba(255,255,255,.04);border:1px solid rgba(236,227,208,.14);padding:12px 0;text-align:center;flex:1}
          .tcell b{display:block;font-family:var(--mono);font-size:clamp(24px,4vw,34px);color:#fff;font-weight:700;line-height:1}
          .tcell span{font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:6px;display:block}
          .stock-num{display:flex;align-items:baseline;gap:10px;font-family:var(--mono)}
          .stock-num .big{font-size:clamp(40px,7vw,58px);color:var(--red);font-weight:700;line-height:1}
          .stock-num .of{font-size:15px;color:rgba(236,227,208,.7)}
          .bar{height:10px;background:rgba(255,255,255,.08);border:1px solid rgba(236,227,208,.14);margin-top:14px;position:relative;overflow:hidden}
          .bar i{position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,var(--red-deep),var(--red));transition:width 1.6s cubic-bezier(.2,.7,.2,1)}
          .stock-foot{display:flex;justify-content:space-between;font-family:var(--mono);font-size:10.5px;letter-spacing:.06em;color:var(--muted);margin-top:10px;text-transform:uppercase}
          .stock-panel .btn{width:100%;justify-content:center}

          /* ---------- QUOTE ---------- */
          .quote{background:var(--bone);text-align:center}
          .quote .wrap{max-width:960px}
          .quote .mk{font-family:var(--disp);font-size:80px;line-height:0;color:var(--red);display:block;height:34px}
          .quote blockquote{font-size:clamp(26px,4.6vw,46px);line-height:1.28;color:var(--ink);margin:8px 0 22px}
          .quote blockquote em{color:var(--red-deep)}
          .quote cite{font-family:var(--mono);font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);font-style:normal}

          /* ---------- ABOUT ---------- */
          .about{background:var(--paper)}
          .about-grid{display:grid;grid-template-columns:1fr;gap:40px}
          @media(min-width:880px){.about-grid{grid-template-columns:1fr 1fr;gap:56px;align-items:start}}
          .about h2{font-size:clamp(30px,5vw,50px);line-height:1.06;margin:14px 0 20px}
          .about p{font-size:16.5px;line-height:1.7;color:var(--ink-2);margin-bottom:16px;max-width:52ch}
          .about-facts{border-top:1px solid var(--line);margin-top:6px}
          .fact{display:grid;grid-template-columns:auto 1fr;gap:18px;padding:16px 0;border-bottom:1px solid var(--line-soft);align-items:baseline}
          .fact .k{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--red-deep);white-space:nowrap}
          .fact .v{font-size:15.5px;line-height:1.5;color:var(--ink)}

          /* ---------- GALLERY ---------- */
          .gallery{background:var(--ink);color:var(--bone)}
          .gallery .eyebrow{color:var(--red)}
          .gallery h2{font-size:clamp(30px,5vw,50px);color:#fff;margin:14px 0 34px;max-width:22ch}
          .g-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
          @media(min-width:760px){.g-grid{grid-template-columns:repeat(4,1fr)}}
          .g-card{background:linear-gradient(180deg,#211b14,#171009);border:1px solid rgba(236,227,208,.1);padding:22px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-height:230px;position:relative;overflow:hidden;transition:.3s}
          .g-card:hover{border-color:rgba(195,154,85,.5);transform:translateY(-4px)}
          .g-card img{width:76%;filter:drop-shadow(0 16px 24px rgba(0,0,0,.45));transition:.4s}
          .g-card:hover img{transform:scale(1.05)}
          .g-card.poster{background:var(--red);border-color:var(--red);justify-content:space-between;align-items:flex-start;text-align:left}
          .g-card.poster .pk{font-family:var(--mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.75)}
          .g-card.poster .ph{font-size:26px;color:#fff;line-height:1.05}
          .g-card.poster .pf{font-family:var(--mono);font-size:10px;letter-spacing:.1em;color:rgba(255,255,255,.85)}
          .g-cap{position:absolute;left:0;bottom:0;width:100%;font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);padding:8px 12px;text-align:left}

          /* ---------- AUTHOR ---------- */
          .author{background:var(--paper-2)}
          .author-grid{display:grid;grid-template-columns:1fr;gap:34px;align-items:center}
          @media(min-width:820px){.author-grid{grid-template-columns:.8fr 1.2fr;gap:52px}}
          .author-card{border:1px solid var(--line);background:var(--bone);padding:34px;position:relative}
          .author-mono{font-family:var(--disp);font-size:clamp(70px,12vw,120px);font-style:italic;color:var(--red);line-height:.8}
          .author-card .nm{font-size:30px;margin-top:10px}
          .author-card .nm em{font-family:var(--disp);font-style:italic;font-size:16px;color:var(--muted);display:block;margin-top:4px}
          .author-sig-mini{margin-top:22px;border-top:1px solid var(--line);padding-top:18px}
          .author-sig-mini svg{width:160px;height:auto}
          .author-sig-mini .pen-path{fill:var(--pen)}
          .author h2{font-size:clamp(28px,4.5vw,44px);margin:12px 0 18px}
          .author p{font-size:16px;line-height:1.72;color:var(--ink-2);margin-bottom:15px;max-width:56ch}

          /* ---------- ORDER ---------- */
          .order{background:var(--red);color:#fff}
          .order-grid{display:grid;grid-template-columns:1fr;gap:38px}
          @media(min-width:900px){.order-grid{grid-template-columns:1fr 1fr;gap:56px}}
          .order-intro .eyebrow{color:#fff;opacity:.85}
          .order-intro h2{font-size:clamp(34px,6vw,60px);color:#fff;line-height:1.02;margin:14px 0 20px}
          .order-intro p{font-size:16px;line-height:1.65;color:rgba(255,255,255,.92);max-width:44ch;margin-bottom:24px}
          .order-perks{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px}
          .order-perks li{display:flex;gap:14px;align-items:flex-start;font-size:15px;line-height:1.45}
          .order-perks .ic{font-family:var(--mono);color:#fff;border:1.5px solid rgba(255,255,255,.6);width:26px;height:26px;display:grid;place-items:center;flex:none;font-size:13px;margin-top:1px}
          .form-card{background:var(--paper-2);color:var(--ink);padding:clamp(24px,4vw,40px);position:relative}
          .form-card h3{font-size:24px;margin-bottom:4px}
          .form-card .fsub{font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:var(--muted);text-transform:uppercase;margin-bottom:22px}
          .frow{display:grid;grid-template-columns:1fr;gap:16px;margin-bottom:16px}
          .frow.two{grid-template-columns:1fr 1fr}
          .field label{display:block;font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-2);margin-bottom:7px}
          .field input,.field textarea{width:100%;font-family:var(--disp);font-size:16px;color:var(--ink);background:#fff;border:1.5px solid var(--line);padding:12px 14px;border-radius:0;transition:.2s;outline:none}
          .field textarea{resize:vertical;min-height:76px;font-size:15px}
          .field input:focus,.field textarea:focus{border-color:var(--red);box-shadow:0 0 0 3px rgba(225,53,42,.12)}
          .field input.err,.field textarea.err{border-color:var(--red);background:#fff6f5}
          .field .msg{font-family:var(--mono);font-size:10px;color:var(--red-deep);margin-top:5px;min-height:12px;letter-spacing:.02em}
          .qty-row{display:flex;align-items:center;justify-content:space-between;border:1.5px solid var(--line);padding:10px 14px;margin-bottom:6px}
          .qty-row .ql{font-size:16px}
          .qty-row .ql em{font-family:var(--mono);font-size:10px;color:var(--muted);display:block;letter-spacing:.06em;font-style:normal}
          .stepper{display:flex;align-items:center;gap:2px}
          .stepper button{width:36px;height:36px;border:1.5px solid var(--ink);background:#fff;font-family:var(--mono);font-size:18px;cursor:pointer;line-height:1;transition:.15s}
          .stepper button:hover{background:var(--ink);color:#fff}
          .stepper button:disabled{opacity:.3;cursor:not-allowed}
          .stepper input{width:46px;text-align:center;border:none;font-family:var(--mono);font-size:18px;font-weight:700;pointer-events:none;background:transparent}
          .summary{border-top:1px dashed var(--line);margin-top:18px;padding-top:16px}
          .sline{display:flex;justify-content:space-between;font-family:var(--mono);font-size:13px;color:var(--ink-2);padding:5px 0}
          .sline.total{font-size:16px;color:var(--ink);border-top:1px solid var(--line);margin-top:8px;padding-top:12px}
          .sline.total b{font-size:22px}
          .sline .free{color:#2e7d4f}
          .pay-btn{width:100%;justify-content:center;margin-top:18px;font-size:14px;padding:17px}
          .pay-note{font-family:var(--mono);font-size:10px;color:var(--muted);text-align:center;margin-top:12px;line-height:1.5;letter-spacing:.02em}

          /* ---------- MODAL ---------- */
          .modal-bg{position:fixed;inset:0;background:rgba(20,16,11,.72);backdrop-filter:blur(4px);z-index:200;display:none;align-items:center;justify-content:center;padding:24px;opacity:0;transition:opacity .3s}
          .modal-bg.show{display:flex;opacity:1}
          .modal{background:var(--paper-2);max-width:460px;width:100%;border:1px solid var(--gold);position:relative;transform:translateY(14px);transition:transform .4s cubic-bezier(.2,.8,.2,1)}
          .modal-bg.show .modal{transform:translateY(0)}
          .modal-top{background:var(--ink);color:var(--bone);padding:26px 30px 22px;text-align:center}
          .modal-top .ok{width:46px;height:46px;border-radius:50%;border:2px solid var(--red);color:var(--red);display:grid;place-items:center;margin:0 auto 14px;font-family:var(--disp);font-size:24px}
          .modal-top h3{font-size:26px;color:#fff}
          .modal-top p{font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--muted);margin-top:6px;text-transform:uppercase}
          .modal-body{padding:26px 30px 30px;text-align:center}
          .modal-body .cnum{font-family:var(--mono);font-size:13px;color:var(--ink-2);letter-spacing:.06em}
          .modal-body .cnum b{display:block;font-size:34px;color:var(--red);margin:6px 0 2px;letter-spacing:.05em}
          .modal-body p{font-size:15px;line-height:1.6;color:var(--ink-2);margin:16px 0 22px}
          .modal-body .btn{width:100%;justify-content:center}

          .mobile-cta{position:fixed;left:0;right:0;bottom:0;z-index:70;background:var(--ink);padding:12px 16px;display:flex;gap:12px;align-items:center;justify-content:space-between;border-top:1px solid rgba(195,154,85,.3)}
          .mobile-cta .mc-left{font-family:var(--mono);font-size:10px;color:var(--bone);letter-spacing:.04em;line-height:1.4}
          .mobile-cta .mc-left b{color:var(--red);font-size:14px}
          .mobile-cta .btn{padding:12px 18px;font-size:11px}
          @media(min-width:760px){.mobile-cta{display:none}}
          padding-bottom:64px;
          @media(min-width:760px){padding-bottom:0}

          @media (prefers-reduced-motion: reduce){
            *{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.1ms !important}
          }
          .reveal{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1)}
          .reveal.in{opacity:1;transform:none}
        }
      ` }} />

      {/* Floating Language Pill */}
      <button 
        onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
        className="fixed top-24 right-4 z-40 bg-white/95 backdrop-blur border border-gray-200 text-gray-800 font-extrabold text-xs px-4 py-2 rounded-full shadow-lg hover:bg-red-50 hover:border-red-200 transition-all duration-300 flex items-center gap-1.5 active:scale-95"
        style={{ fontFamily: '"Space Mono", monospace' }}
        aria-label="Switch Language"
      >
        <span>{lang === 'hi' ? 'EN' : 'हिंदी'}</span>
      </button>

      {/* ============ HERO ============ */}
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-lede reveal">
              <div className="eyebrow" style={{ color: 'rgba(255,255,255,.85)' }}>
                <span className="hi">सीमित हस्ताक्षरित संस्करण · केवल 1500 प्रतियाँ</span>
                <span className="en">Signed limited edition · only 1500 copies</span>
              </div>
              <div className="over">
                <span className="hi">Mother Mary Comes To Me</span>
                <span className="en hin">मेरी माँ मेरी गैंगस्टर</span>
              </div>
              <h1 className="hero-title">
                <span>मेरी माँ</span>
                <span>मेरी गैंगस्टर</span>
              </h1>
              <div className="hero-sub">
                <div className="hero-author">
                  <span className="hi hin">अरुंधति रॉय</span>
                  <span className="en">Arundhati Roy</span>
                </div>
                <div className="hero-trans">
                  <span className="hi hin">अनुवाद : प्रभात सिंह</span>
                  <span className="en">Translated by Prabhat Singh</span>
                </div>
              </div>
              <p className="hero-copy">
                <span className="hi">बुकर पुरस्कार विजेता अरुंधति रॉय की पहली स्मृति-कथा — अपनी माँ मेरी रॉय के बारे में, जिन्हें वे प्यार से “मेरी गैंगस्टर” कहती हैं। शरणस्थली भी, तूफ़ान भी। अब हिंदी में, लेखिका के हाथ से हस्ताक्षरित सीमित संस्करण में।</span>
                <span className="en">The first memoir from Booker Prize–winning Arundhati Roy — about her mother, Mary Roy, whom she lovingly calls “my gangster.” Her shelter and her storm. Now in Hindi, in a limited edition signed by the author’s own hand.</span>
              </p>
              <div className="hero-cta">
                <a href="#order" className="btn btn--onred">
                  <span className="hi">अपनी प्रति सुरक्षित करें</span>
                  <span className="en">Reserve your copy</span>
                  <span className="arw"> →</span>
                </a>
                <div className="hero-price">
                  ₹ <b>1499</b> <s>₹1999</s> · <span className="hi">निःशुल्क डिलीवरी</span><span className="en">free delivery</span>
                </div>
              </div>
            </div>
            <div className="book-stage reveal">
              <div className="halo"></div>
              <img className="book-img" src={IMAGES.BOOK_HERO} alt="मेरी माँ मेरी गैंगस्टर — पुस्तक" />
              <div className="book-tag">
                Signed<b>1 / 1500</b>Edition
              </div>
            </div>
          </div>
          <div className="hero-marquee">
            <div className="mq-track" id="mq">
              <span>{t.marquee}</span>
              <span>{t.marquee}</span>
            </div>
          </div>
        </div>
        <div className="torn" style={{ marginTop: '34px' }} aria-hidden="true">
          <svg viewBox="0 0 1440 26" preserveAspectRatio="none">
            <path d="M0,26 L0,10.6 L31.3,7.0 L62.6,17.4 L93.9,5.4 L125.2,15.0 L156.5,11.5 L187.8,5.1 L219.1,14.5 L250.4,4.7 L281.7,12.9 L313.0,5.4 L344.3,5.8 L375.7,12.7 L407.0,21.1 L438.3,6.5 L469.6,8.5 L500.9,17.0 L532.2,23.6 L563.5,15.9 L594.8,12.2 L626.1,24.2 L657.4,4.9 L688.7,21.8 L720.0,9.9 L751.3,6.9 L782.6,6.4 L813.9,10.3 L845.2,20.9 L876.5,7.7 L907.8,16.0 L939.1,17.2 L970.4,11.6 L1001.7,15.3 L1033.0,5.2 L1064.3,5.1 L1095.7,8.2 L1127.0,18.1 L1158.3,12.8 L1189.6,10.4 L1220.9,16.1 L1252.2,13.3 L1283.5,10.1 L1314.8,20.4 L1346.1,18.4 L1377.4,9.0 L1408.7,15.8 L1440.0,14.8 L1440,26 Z" fill="var(--paper)"/>
          </svg>
        </div>
      </section>

      {/* ============ LIMITED / SIGNING ON REAL TITLE PAGE ============ */}
      <section className="section limited" id="edition">
        <div className="wrap">
          <div className="limited-head reveal">
            <div>
              <div className="eyebrow">
                <span className="hi">हस्ताक्षरित संस्करण</span>
                <span className="en">The signed edition</span>
              </div>
              <h2 style={{ marginTop: '14px' }}>
                <span className="hi hin">देखिए, आपकी प्रति पर<br/>हस्ताक्षर होते हुए।</span>
                <span className="en">Watch your copy<br/>being signed.</span>
              </h2>
            </div>
            <p className="h-side">
              <span className="hi">अरुंधति रॉय हर प्रति के शीर्षक-पृष्ठ पर, नीले जेल पेन से, अपने हाथ से हस्ताक्षर और क्रमांक अंकित कर रही हैं। यह संस्करण दोबारा नहीं छपेगा।</span>
              <span className="en">Arundhati Roy signs and numbers every copy by hand — in blue gel pen, on the book’s own title page. This edition will never be reprinted.</span>
            </p>
          </div>

          <div className="cert-grid">
            {/* REAL TITLE PAGE + LIVE BLUE-PEN SIGNATURE */}
            <div className="cert reveal" id="cert" ref={certRef}>
              <div className="cert-top">
                <div className="lbl">
                  <span className="hi">प्रमाणित प्रति · शीर्षक-पृष्ठ</span>
                  <span className="en">Authenticated copy · title page</span>
                </div>
                <div className="cert-no">
                  EDITION<b id="certNo">No. {String(reserved + 1).padStart(4, '0')}</b>/ 1500
                </div>
              </div>

              <div className="page-wrap" id="pageWrap" ref={pageWrapRef}>
                <img className="page-img" src={IMAGES.PAGE_CERT} alt="मेरी माँ मेरी गैंगस्टर — शीर्षक पृष्ठ" />
                

                {/* SVG Signature projection container */}
                <svg className="pen-ink" id="penInk" ref={penInkRef} viewBox="0 0 610.12 352.2" preserveAspectRatio="xMidYMid meet" aria-label="अरुंधति रॉय के हस्ताक्षर">
                  <defs>
                    <clipPath id="penWipe" clipPathUnits="userSpaceOnUse">
                      <rect id="penRect" ref={penRectRef} x="-4" y="-30" width="620" height="412"/>
                    </clipPath>
                    <filter id="gel" x="-25%" y="-25%" width="150%" height="150%">
                      <feDropShadow dx="0" dy="1.1" stdDeviation="0.7" floodColor="#0a1a5c" floodOpacity="0.4"/>
                    </filter>
                  </defs>
                  <g clipPath="url(#penWipe)" filter="url(#gel)">
                    <g transform="translate(-324.63 -846.71)">
                      <path className="pen-path" d="m925.25 1197.5c-2.7101-1.8983-4.9214-9.0766-5.754-18.679-1.8438-21.262-6.0112-43.857-13.609-73.784-1.7454-6.875-3.5301-14.075-3.966-16-2.7754-12.258-12.389-45.801-13.423-46.835-1.08-1.08-1.8393 1.1999-4.0913 12.285-2.5875 12.736-5.7356 21.121-8.4812 22.591-2.8196 1.509-6.4635 1.128-8.2664-0.8642-0.90802-1.0034-2.5538-5.3544-3.6573-9.669-2.2549-8.8165-2.6644-9.5923-3.642-6.8998-4.0638 11.192-8.1631 17.723-12.546 19.99-5.8256 3.0125-9.3195-0.017-12.799-11.096-0.69087-2.2-1.5835-4.3593-1.9837-4.7984s-1.9399 2.5255-3.4216 6.588c-3.5515 9.7377-5.0156 11.71-8.6907 11.71-2.2352 0-3.1996-0.6091-3.906-2.4669-0.51585-1.3568-1.1669-12.494-1.4468-24.75-1.2598-55.161-11.487-100.33-25.293-111.71-3.1234-2.5746-4.5881-3.0736-9.0209-3.0736-7.2428 0-13.737 4.169-20.639 13.25-2.6492 3.4853-2.7748 4.0505-1.7788 8.0056 1.3993 5.5572 7.0611 50.125 8.1615 64.244 0.47149 6.05 1.1314 17.3 1.4665 25 0.70467 16.193 2.0038 26.237 4.1713 32.25 1.699 4.7134 2.3384 5.0603 4.6076 2.5 2.1473-2.4229 3.5674-10.343 4.7747-26.632 0.56593-7.6349 1.2705-14.272 1.5656-14.75 0.6505-1.0526 6.4847-1.1275 8.0189-0.1031 1.8915 1.263 3.3986 4.9672 3.4254 8.419 0.0387 4.9979 3.3624 18.499 6.336 25.738 1.4511 3.5323 2.6383 6.8306 2.6383 7.3295 0 0.4988 1.1752 3.8446 2.6116 7.4349 2.1218 5.3038 2.4072 6.9767 1.5214 8.9206-1.0761 2.3618-3.4125 2.99-6.5882 1.7714-2.1539-0.8265-3.983-4.565-5.8848-12.028-0.86189-3.3822-2.4262-7.5622-3.4762-9.2888l-1.9091-3.1392-1.1374 3.0387c-0.62554 1.6713-1.6496 4.4073-2.2758 6.08-0.62613 1.6727-2.7537 4.3727-4.7278 6-4.8002 3.9567-9.7563 4.0344-13.324 0.2087-5.6859-6.0962-7.3888-12.821-8.7991-34.75-2.4695-38.396-2.9191-43.809-3.7045-44.594-0.4518-0.4518-0.94403 5.9456-1.0938 14.216-0.15699 8.667-0.88878 17.652-1.7274 21.208-0.80022 3.3936-1.4616 7.5953-1.4697 9.3372-8e-3 1.7419-0.84685 5.1169-1.8638 7.5s-2.1778 6.1028-2.5797 8.2661c-1.2604 6.7847-11.62 25.63-16.501 30.017-5.2227 4.6943-12.177 1.2838-17.741-8.7-1.4558-2.6125-2.913-4.7327-3.2381-4.7115-0.32509 0.021-1.4982 1.4837-2.6068 3.25-3.9675 6.3211-9.1329 3.9543-11.967-5.4834-3.2695-10.886-6.5792-35.133-8.573-62.805-0.49534-6.875-1.3365-16.775-1.8692-22-0.53272-5.225-1.4393-14.45-2.0147-20.5-0.57536-6.05-1.2678-11.582-1.5387-12.294s-0.73414-7.4618-1.0294-15c-0.58425-14.915-3.1067-40.718-4.5-46.03-1.0443-3.9817-0.45504-5.8936 2.0627-6.6927 2.8133-0.89291 5.6657 1.1099 6.7786 4.7596 1.2286 4.0291 2.9592 19.118 3.6424 31.758 0.52715 9.7516 0.85478 13.836 2.5669 32 0.54434 5.775 1.1832 12.975 1.4197 16s1.1178 12.25 1.9584 20.5 2.2401 22.875 3.1101 32.5c0.86995 9.625 1.9271 17.848 2.3492 18.274 0.42207 0.4255 1.5915-0.137 2.5988-1.25 3.0567-3.3776 8.0237-2.4229 9.692 1.8628 0.55957 1.4375 2.3207 7.9105 3.9137 14.384 2.9795 12.109 5.5075 18.316 8.4572 20.764 1.4823 1.2302 1.931 1.1003 3.6868-1.0669 4.5372-5.6004 14.764-28.528 16.84-37.753 2.6306-11.691 4.0692-37.614 3.3857-61.01-0.47356-16.211-1.0146-23.184-1.7791-22.929-1.257 0.419-3.5213 11.245-3.6131 17.275-0.0626 4.1091-1.4204 6.45-3.7413 6.45-1.6876 0-5.3203-7.2078-5.3203-10.556 0-13.831 19.854-42.011 36.204-51.388 9.9677-5.7162 21.293-3.7176 29.483 5.203 8.8586 9.6484 15.48 28.933 19.31 56.241 0.61707 4.4 1.5372 10.7 2.0446 14s1.2219 10.725 1.5876 16.5c0.90835 14.345 1.5071 15.741 4.1692 9.723 1.7983-4.0653 2.4932-4.723 4.9904-4.723 3.1769 0 6.2112 2.6486 6.2112 5.4217 0 3.262 4.045 21.65 5.6388 25.634 0.86812 2.1696 2.1487 3.9448 2.8458 3.9448 0.79847 0 2.621-5.4072 4.9259-14.615 4.5968-18.363 5.7368-21.133 9.0367-21.962 4.9537-1.2433 8.0138 3.827 9.1706 15.195 0.3851 3.7845 1.2687 8.2309 1.9636 9.8809l1.2634 3 1.0625-2.7752c0.58437-1.5264 1.5384-5.7541 2.12-9.3949 0.58161-3.6407 1.4292-7.3419 1.8835-8.2247 0.45433-0.8829 1.1481-3.4052 1.5416-5.6052 0.39357-2.2 1.6145-5.4625 2.7132-7.25 1.5948-2.5947 2.6556-3.25 5.261-3.25 3.1419 0 6.5734 2.4485 6.5734 4.6904 0 0.5681 1.296 3.9077 2.88 7.4213s3.3414 8.4133 3.9053 10.888c0.56388 2.475 1.4974 5.85 2.0745 7.5s2.4706 9.075 4.2079 16.5c1.7372 7.425 4.2249 17.325 5.5281 22 3.9681 14.235 9.2995 37.07 10.506 45 0.62775 4.125 1.516 9.75 1.9738 12.5 0.45785 2.75 1.6126 11.392 2.5661 19.205 1.6002 13.111 1.888 14.189 3.7374 14 1.616-0.1652 2.1758 0.6388 2.8928 4.1555 1.0593 5.1949 0.38214 8.4852-2.2977 11.165-2.3763 2.3764-3.8218 2.4703-6.7244 0.4373zm-465.55-32.557c-2.7309-1.4411-5.4931-4.5824-9.8088-11.155-6.3975-9.7428-22.132-40.821-34.114-67.379-4.0019-8.8705-7.7261-16.201-8.2761-16.29-0.55-0.089-1.1544 0.8374-1.3432 2.0583s-1.6547 4.5438-3.2578 7.3842c-1.603 2.8404-3.6357 7.5968-4.5171 10.57s-2.4529 7.075-3.4922 9.1156-1.8897 4.7981-1.8897 6.1278c0 1.3298-0.62196 3.9352-1.3821 5.7899-0.76017 1.8546-1.6948 6.8199-2.0771 11.034l-0.69492 7.6619 3.577 3.9593c5.8988 6.5293 4.6072 8.6025-4.5673 7.3309-8.3706-1.1602-11.856-4.3859-11.856-10.973 0-3.3705 4.7946-17.798 8.1884-24.64 1.364-2.75 3.42-7.475 4.5687-10.5 5.2902-13.931 7.347-19.037 8.7275-21.665 0.8188-1.5591 2.4528-5.075 3.6311-7.8131l2.1424-4.9783-3.3077-10.022c-1.8192-5.5119-3.6207-10.472-4.0033-11.022-1.3788-1.9821-10.794-28.318-15.373-43-2.573-8.25-5.0698-15.9-5.5484-17-1.0608-2.4383-6.2608-20.78-9.356-33-0.83582-3.3-3.1179-12.075-5.0713-19.5-1.9534-7.425-3.5621-13.612-3.5748-13.75-0.0896-0.96731-2.9818 0.07-4.1822 1.5-2.0711 2.4672-2.2216 11.521-3.2778 14.646 0 0-0.59573 2.3642-0.85687 4.3946-0.59759 4.6462-4.9113 30.649-5.2764 80.21-0.27879 37.846-0.3706 39.55-2.913 54.078-0.90679 5.1818-2.4791 14.936-3.494 21.677-2.0854 13.85-4.1466 18.572-8.3214 19.061-4.8997 0.574-5.1216-2.2959-2.0347-26.316 0.84818-6.6 1.9018-17.625 2.3414-24.5s1.2687-16.55 1.8424-21.5 1.4045-12.6 1.8462-17c1.2382-12.335 0.86113-80.676-0.5656-102.5-0.95047-14.539-1.0163-24.207-0.25882-38 1.1617-21.154 3.0818-29.67 7.1461-31.697 6.7742-3.3773 13.479 7.6758 18.514 30.519 0.7664 3.4774 2.0851 7.709 2.9305 9.4036s1.537 4.5469 1.537 6.3384c0 1.7915 0.89419 6.1099 1.9871 9.5964 1.0929 3.4865 1.9929 7.1171 2 8.0681 7e-3 0.95095 0.88969 4.551 1.9613 8 1.0716 3.449 2.9078 9.5293 4.0803 13.512 2.6455 9.0841 4.5318 18.566 6.6005 26.759 1.3594 5.3375 3.9788 13.562 15.445 48.5 6.165 18.784 14.152 38.067 15.718 37.945 0.38907-0.03 3.1824-3.4452 6.2074-7.5886 8.9762-12.295 12.007-15.386 17.583-17.937 6.0776-2.7799 8.2196-2.9567 12.699-1.048 7.3144 3.1166 7.6556 4.126 13.736 40.629 1.695 10.175 3.4765 18.895 3.9588 19.377 0.50271 0.5028 1.396-0.9909 2.0931-3.5 1.3968-5.0276 1.4291-5.3574 2.4702-25.215 0.77572-14.796 1.561-17.662 4.8396-17.662 3.3286 0 4.5415 2.6928 6.0812 13.5 1.6504 11.584 2.7185 16.862 5.5659 27.5 0.95688 3.575 2.3006 8.6375 2.9862 11.25s1.6379 4.75 2.1164 4.75 0.87346-3.9375 0.87763-8.75c8e-3 -8.7437 1.4-23.808 2.5296-27.367 0.97708-3.0785 4.2121-4.2772 6.8604-2.542 2.7749 1.8182 4.9441 7.4902 7.136 18.659 2.0849 10.624 6.7941 25.454 9.4571 29.782 1.7249 2.8036 2.309 3.1275 4.004 2.2203 4.2346-2.2662 5.3732-6.6347 5.3437-20.503-0.0152-7.15-0.34703-16.375-0.73742-20.5-0.87896-9.2875 0.46121-12.063 5.0518-10.461 2.5926 0.9045 2.9674 1.6628 4.19 8.4772 4.1808 23.302 10.982 44.984 14.111 44.984 1.5184 0 2.2504-9.9072 1.8898-25.576l-0.3435-14.924 2.3078-0.3271c3.7911-0.5374 7.0947 2.3654 7.8144 6.8664 0.79876 4.9952 1.4501 5.4001 5.2126 3.2407 2.8377-1.6286 3.1208-1.6301 4.8941-0.025 1.8417 1.6667 3.554 7.1598 4.7785 15.329 0.80209 5.3512 3.8302 10.212 6.8309 10.965 2.3515 0.5902 12.044-3.8304 25.162-11.475 10.777-6.281 16.386-9.2842 26.008-13.924 6.9696-3.3611 10.786-5.8622 12.57-8.2378 4.3299-5.7663 8.8931-16.82 12.136-29.399 2.9612-11.485 3.1012-12.935 3.1866-33.012 0.0666-15.651-0.49575-26.349-2.2079-42-1.2635-11.55-3.0128-27.525-3.8874-35.5-2.0517-18.708-2.0431-33.691 0.0204-35.755 1.9403-1.9403 6.326-0.91612 7.1465 1.6688 0.3333 1.0502 0.79944 6.1116 1.0359 11.248 0.5285 11.481 2.1269 31.308 3.4939 43.338 0.56247 4.95 1.4511 13.63 1.9747 19.288s1.1488 10.609 1.3892 11c0.49303 0.80265 2.9884 22.618 4.6569 40.712 0.60861 6.6 1.7006 16.05 2.4266 21 0.726 4.95 1.336 9.9 1.3556 11 0.0501 2.8093 5.0424 28.269 6.3729 32.5 0.60533 1.925 1.471 4.625 1.9238 6s1.4851 6.1045 2.294 10.51c0.80895 4.4055 1.9507 9.2723 2.5373 10.815 1.5206 3.9996 1.323 12.942-0.33628 15.211-1.163 1.5905-1.8895 1.7495-4.25 0.9302-2.5382-0.881-3.0315-1.8012-4.5445-8.4773-3.1569-13.929-6.9768-31.453-8.39-38.489-2.8626-14.252-3.1701-15.591-3.7047-16.125-0.30031-0.3003-0.99465 0.2923-1.543 1.3169s-3.9134 3.8406-7.4779 6.2578c-3.7175 2.5209-7.1091 5.7121-7.9541 7.4842-2.1259 4.4581-5.975 6.291-10.011 4.7674-3.5605-1.3439-8.9894 0.1847-15.952 4.4916-2.0516 1.2691-4.0096 2.3074-4.3511 2.3074-0.70175 0-19.903 10.885-28.715 16.278-7.1257 4.3611-14.206 5.6162-18.788 3.3304-2.9465-1.4699-3.31-1.4435-5.6672 0.4106-3.0628 2.4092-5.5188 2.5059-8.8138 0.3469-2.4405-1.5991-2.5768-1.5451-6.3112 2.5-6.6656 7.2201-11.938 5.3127-17.135-6.1986-2.5806-5.7166-3.3218-6.636-4.537-5.6275-0.79884 0.663-1.4524 1.6886-1.4524 2.2792 0 2.2873-5.2977 8.562-8.2676 9.7921-7.8007 3.2312-12.198 0.056-17.321-12.508-3.8185-9.3656-5.4117-11.051-5.4117-5.7239 0 1.5189-1.2375 5.2049-2.75 8.191-2.24 4.4225-3.2793 5.4898-5.6042 5.7558-1.874 0.2143-3.6335-0.4057-5.1236-1.8056-2.5051-2.3534-6.5072-11.389-8.9783-20.271-0.87989-3.1625-1.955-5.75-2.389-5.75s-1.5751 3.2625-2.5357 7.25c-2.8535 11.846-6.1524 16.911-10.042 15.418-0.93205-0.3577-2.9634-3.4668-4.5141-6.9091-3.3085-7.3446-5.0537-15.624-9.645-45.759-0.87986-5.775-2.4956-13.312-3.5905-16.75-1.9511-6.1255-2.0618-6.25-5.5555-6.25-5.6736 0-15.191 9.7289-21.937 22.425-3.6511 6.871-3.7356 10.19-0.47276 18.575 4.061 10.436 9.0068 20.738 12.328 25.68 1.5453 2.2991 2.8096 4.917 2.8096 5.8176s3.0644 7.7946 6.8098 15.32c3.7454 7.5252 7.8094 15.861 9.0312 18.523 1.2218 2.6626 4.0074 7.5896 6.1902 10.949s3.9688 6.4202 3.9688 6.8019c0 0.3818 0.61556 0.9304 1.3679 1.2191 1.0727 0.4117 1.2604-0.4286 0.86995-3.893-0.44209-3.9222-0.2727-4.4179 1.5096-4.4179 2.753 0 3.9058 1.6541 6.2359 8.948 2.3589 7.3839 1.8388 10.576-2.0509 12.587-3.3806 1.7482-2.5998 1.8161-7.2339-0.6294zm210.3-113.04c0-4.6703-2.2254-15.865-3.1538-15.865-0.44445 0-1.0816 1.2375-1.4159 2.75-0.33432 1.5125-1.2441 5.3785-2.0217 8.5912-0.77763 3.2126-1.1611 6.2501-0.85219 6.75 0.30893 0.4998 2.1101 0.9088 4.0027 0.9088 3.1895 0 3.441-0.2291 3.441-3.1347zm-328.62-153.2c1.451-11.77 3.2556-16.661 6.147-16.661 0.81232 0 1.4693-0.5625 1.4598-1.25-0.0436-3.1891-3.7918-15.809-5.4444-18.332-1.7624-2.6897-1.8811-2.7245-2.606-0.76499-2.7283 7.3754-3.9634 51.711-1.3682 49.116 0.20023-0.20022 1.0155-5.6487 1.8118-12.108z" fill="var(--pen)" />
                    </g>
                  </g>
                  <circle className="pen-nib" id="penNib" ref={penNibRef} r="5" cx="0" cy="176" />
                </svg>

                {/* little pen cursor that rides the nib */}
                <svg className="pen-cursor" id="penCursor" ref={penCursorRef} viewBox="0 0 24 24" fill="none">
                  <path d="M3 21l3-1 12-12-2-2L4 18l-1 3z" fill="#1B3FD1"/>
                  <path d="M16 4l2-2a1.5 1.5 0 0 1 2 2l-2 2-2-2z" fill="#122A9C"/>
                  <circle cx="4.5" cy="19.5" r="1" fill="#0a1a5c"/>
                </svg>
              </div>

              <div className="cert-foot">
                <div className="by">
                  Arundhati Roy
                  <em><span className="hi">हस्ताक्षरकर्ता</span><span className="en">Author / Signatory</span></em>
                </div>
                <button className="replay" id="replayBtn" onClick={runSignAnimation} type="button">
                  <span className="hi">पुनः देखें</span>
                  <span className="en">Replay sign</span>
                </button>
              </div>
            </div>

            {/* LIVE STOCK PANEL + COUNTDOWN */}
            <div className="stock-panel reveal">
              <div className="count-block">
                <div className="clabel">
                  <span className="hi">संस्करण स्थिति</span>
                  <span className="en">Edition Status</span>
                </div>
                <div className="stock-num">
                  <span className="big" id="stockLeft">{stockLeft}</span>
                  <span className="of">/ 1500 <span className="hi">शेष</span><span className="en">left</span></span>
                </div>
                <div className="bar"><i id="stockBar" style={{ width: barWidth }}></i></div>
                <div className="stock-foot">
                  <span><b id="reservedNum">{reservedCount}</b> <span className="hi">सुरक्षित</span><span className="en">reserved</span></span>
                  <span>100% <span className="hi">हस्ताक्षरित</span><span className="en">signed</span></span>
                </div>
              </div>

              <div className="count-block" id="timer">
                <div className="clabel">
                  <span className="hi">लॉन्च होने में समय</span>
                  <span className="en">Time to official launch</span>
                </div>
                <div className="timer">
                  <div className="tcell"><b id="td">{timeLeft.days}</b><span>Days</span></div>
                  <div className="tcell"><b id="th">{timeLeft.hours}</b><span>Hrs</span></div>
                  <div className="tcell"><b id="tm">{timeLeft.mins}</b><span>Mins</span></div>
                  <div className="tcell"><b id="ts">{timeLeft.secs}</b><span>Secs</span></div>
                </div>
              </div>

              <a href="#order" className="btn btn--red">
                <span className="hi">अपनी प्रति आरक्षित करें</span>
                <span className="en">Book your copy now</span>
                <span className="arw"> →</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ============ QUOTE ============ */}
      <section className="section quote">
        <div className="wrap">
          <span className="mk">“</span>
          <blockquote>
            <span className="hi">मेरी गैंगस्टर एक <em>असाधारण महिला</em> थीं। यह पुस्तक मेरी शरणस्थली और मेरे तूफ़ान के बारे में है।</span>
            <span className="en">My gangster was an <em>extraordinary woman</em>. This book is about my shelter and my storm.</span>
          </blockquote>
          <cite>— Arundhati Roy</cite>
        </div>
      </section>

      {/* ============ ABOUT THE BOOK ============ */}
      <section className="section about" id="about">
        <div className="wrap about-grid">
          <div className="reveal">
            <div className="eyebrow"><span className="hi">पुस्तक के बारे में</span><span className="en">About the book</span></div>
            <h2>
              <span className="hi hin">मेरी माँ मेरी गैंगस्टर</span>
              <span className="en">Mother Mary Comes To Me</span>
            </h2>
            <p>
              <span className="hi">यह केवल एक माँ-बेटी के असाधारण संबंधों की कहानी नहीं है, बल्कि एक विद्रोही स्त्री मेरी रॉय के संघर्षों की गाथा है, जिन्होंने समाज की बंदिशों को चुनौती दी। बुकर विजेता अरुंधति रॉय अपनी चिरपरिचित बेबाक शैली में अपनी माँ के प्रति प्रेम और संघर्षों को शब्द देती हैं।</span>
              <span className="en">This is not just a memoir of a mother-daughter relationship, but an epic chronicle of Mary Roy — a rebel who fought societal norms. In her characteristic bold style, Arundhati Roy captures the love, storms, and liberation of her mother.</span>
            </p>
            <p>
              <span className="hi">यह संस्करण केवल 1500 प्रतियों तक सीमित है, जिनमें से प्रत्येक को अरुंधति रॉय द्वारा स्वयं शीर्षक-पृष्ठ पर हस्ताक्षरित और क्रमांकित किया गया है।</span>
              <span className="en">This edition is strictly limited to 1,500 copies, each personally signed and numbered by Arundhati Roy on the title page.</span>
            </p>
          </div>
          <div className="reveal">
            <div className="about-facts">
              <div className="fact">
                <span className="k"><span className="hi">शीर्षक</span><span className="en">Title</span></span>
                <span className="v"><b><span className="hi hin">मेरी माँ मेरी गैंगस्टर</span><span className="en">Mother Mary Comes To Me</span></b></span>
              </div>
              <div className="fact">
                <span className="k"><span className="hi">लेखिका</span><span className="en">Author</span></span>
                <span className="v"><span className="hi hin">अरुंधति रॉय</span><span className="en">Arundhati Roy</span></span>
              </div>
              <div className="fact">
                <span className="k"><span className="hi">अनुवाद</span><span className="en">Translation</span></span>
                <span className="v"><span className="hi hin">प्रभात सिंह</span><span className="en">Prabhat Singh</span></span>
              </div>
              <div className="fact">
                <span className="k"><span className="hi">प्रकाशक</span><span className="en">Publisher</span></span>
                <span className="v">Rajkamal Prakashan</span>
              </div>
              <div className="fact">
                <span className="k"><span className="hi">संस्करण</span><span className="en">Edition</span></span>
                <span className="v"><span className="hi">सीमित हस्ताक्षरित (हार्डबाउंड)</span><span className="en">Limited signed (Hardbound)</span></span>
              </div>
              <div className="fact">
                <span className="k"><span className="hi">सम्मान</span><span className="en">Acclaim</span></span>
                <span className="v">
                  <span className="hi">न्यूयॉर्क टाइम्स की 2025 की सर्वश्रेष्ठ पुस्तकों में शामिल।</span>
                  <span className="en">A New York Times Best Book of 2025 selection.</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="section gallery" id="details">
        <div className="wrap">
          <div className="eyebrow"><span className="hi">विशेषताएँ</span><span className="en">Features</span></div>
          <h2>
            <span className="hi hin">शानदार बनावट, उत्कृष्ट कला।</span>
            <span className="en">Exquisite details of a lifetime edition.</span>
          </h2>
          <div className="g-grid">
            <div className="g-card poster reveal">
              <span className="pk">LIMITED</span>
              <span className="ph"><span className="hi">भव्य<br/>सज्जा</span><span className="en">Premium<br/>binding</span></span>
              <span className="pf">Cloth Bound</span>
            </div>
            <div className="g-card reveal">
              <img src={IMAGES.BOOK_HERO} alt="कपड़ा जिल्द" />
              <span className="g-cap"><span className="hi">कपड़ा जिल्द (क्लॉथ बाउंड)</span><span className="en">Cloth spine binding</span></span>
            </div>
            <div className="g-card reveal">
              <img src={IMAGES.PAGE_CERT} alt="शीर्षक पृष्ठ" />
              <span className="g-cap"><span className="hi">शीर्षक-पृष्ठ हस्ताक्षर</span><span className="en">Title-page autograph</span></span>
            </div>
            <div className="g-card reveal">
              <img src={IMAGES.BOOK_HERO} alt="विशेष आवरण" />
              <span className="g-cap"><span className="hi">सुनहरी पन्नी छपाई</span><span className="en">Gold foil embossing</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ AUTHOR PROFILE ============ */}
      <section className="section author">
        <div className="wrap author-grid">
          <div className="author-card reveal">
            <div className="author-mono">A.R.</div>
            <div className="nm">
              <span className="hi hin">अरुंधति रॉय</span>
              <span className="en">Arundhati Roy</span>
              <em><span className="hi">बुकर पुरस्कार विजेता लेखिका</span><span className="en">Booker Prize-winning author</span></em>
            </div>
            <div className="author-sig-mini">
              <svg viewBox="0 0 610.12 352.2" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(-324.63 -846.71)">
                  <path className="pen-path" d="m925.25 1197.5c-2.7101-1.8983-4.9214-9.0766-5.754-18.679-1.8438-21.262-6.0112-43.857-13.609-73.784-1.7454-6.875-3.5301-14.075-3.966-16-2.7754-12.258-12.389-45.801-13.423-46.835-1.08-1.08-1.8393 1.1999-4.0913 12.285-2.5875 12.736-5.7356 21.121-8.4812 22.591-2.8196 1.509-6.4635 1.128-8.2664-0.8642-0.90802-1.0034-2.5538-5.3544-3.6573-9.669-2.2549-8.8165-2.6644-9.5923-3.642-6.8998-4.0638 11.192-8.1631 17.723-12.546 19.99-5.8256 3.0125-9.3195-0.017-12.799-11.096-0.69087-2.2-1.5835-4.3593-1.9837-4.7984s-1.9399 2.5255-3.4216 6.588c-3.5515 9.7377-5.0156 11.71-8.6907 11.71-2.2352 0-3.1996-0.6091-3.906-2.4669-0.51585-1.3568-1.1669-12.494-1.4468-24.75-1.2598-55.161-11.487-100.33-25.293-111.71-3.1234-2.5746-4.5881-3.0736-9.0209-3.0736-7.2428 0-13.737 4.169-20.639 13.25-2.6492 3.4853-2.7748 4.0505-1.7788 8.0056 1.3993 5.5572 7.0611 50.125 8.1615 64.244 0.47149 6.05 1.1314 17.3 1.4665 25 0.70467 16.193 2.0038 26.237 4.1713 32.25 1.699 4.7134 2.3384 5.0603 4.6076 2.5 2.1473-2.4229 3.5674-10.343 4.7747-26.632 0.56593-7.6349 1.2705-14.272 1.5656-14.75 0.6505-1.0526 6.4847-1.1275 8.0189-0.1031 1.8915 1.263 3.3986 4.9672 3.4254 8.419 0.0387 4.9979 3.3624 18.499 6.336 25.738 1.4511 3.5323 2.6383 6.8306 2.6383 7.3295 0 0.4988 1.1752 3.8446 2.6116 7.4349 2.1218 5.3038 2.4072 6.9767 1.5214 8.9206-1.0761 2.3618-3.4125 2.99-6.5882 1.7714-2.1539-0.8265-3.983-4.565-5.8848-12.028-0.86189-3.3822-2.4262-7.5622-3.4762-9.2888l-1.9091-3.1392-1.1374 3.0387c-0.62554 1.6713-1.6496 4.4073-2.2758 6.08-0.62613 1.6727-2.7537 4.3727-4.7278 6-4.8002 3.9567-9.7563 4.0344-13.324 0.2087-5.6859-6.0962-7.3888-12.821-8.7991-34.75-2.4695-38.396-2.9191-43.809-3.7045-44.594-0.4518-0.4518-0.94403 5.9456-1.0938 14.216-0.15699 8.667-0.88878 17.652-1.7274 21.208-0.80022 3.3936-1.4616 7.5953-1.4697 9.3372-8e-3 1.7419-0.84685 5.1169-1.8638 7.5s-2.1778 6.1028-2.5797 8.2661c-1.2604 6.7847-11.62 25.63-16.501 30.017-5.2227 4.6943-12.177 1.2838-17.741-8.7-1.4558-2.6125-2.913-4.7327-3.2381-4.7115-0.32509 0.021-1.4982 1.4837-2.6068 3.25-3.9675 6.3211-9.1329 3.9543-11.967-5.4834-3.2695-10.886-6.5792-35.133-8.573-62.805-0.49534-6.875-1.3365-16.775-1.8692-22-0.53272-5.225-1.4393-14.45-2.0147-20.5-0.57536-6.05-1.2678-11.582-1.5387-12.294s-0.73414-7.4618-1.0294-15c-0.58425-14.915-3.1067-40.718-4.5-46.03-1.0443-3.9817-0.45504-5.8936 2.0627-6.6927 2.8133-0.89291 5.6657 1.1099 6.7786 4.7596 1.2286 4.0291 2.9592 19.118 3.6424 31.758 0.52715 9.7516 0.85478 13.836 2.5669 32 0.54434 5.775 1.1832 12.975 1.4197 16s1.1178 12.25 1.9584 20.5 2.2401 22.875 3.1101 32.5c0.86995 9.625 1.9271 17.848 2.3492 18.274 0.42207 0.4255 1.5915-0.137 2.5988-1.25 3.0567-3.3776 8.0237-2.4229 9.692 1.8628 0.55957 1.4375 2.3207 7.9105 3.9137 14.384 2.9795 12.109 5.5075 18.316 8.4572 20.764 1.4823 1.2302 1.931 1.1003 3.6868-1.0669 4.5372-5.6004 14.764-28.528 16.84-37.753 2.6306-11.691 4.0692-37.614 3.3857-61.01-0.47356-16.211-1.0146-23.184-1.7791-22.929-1.257 0.419-3.5213 11.245-3.6131 17.275-0.0626 4.1091-1.4204 6.45-3.7413 6.45-1.6876 0-5.3203-7.2078-5.3203-10.556 0-13.831 19.854-42.011 36.204-51.388 9.9677-5.7162 21.293-3.7176 29.483 5.203 8.8586 9.6484 15.48 28.933 19.31 56.241 0.61707 4.4 1.5372 10.7 2.0446 14s1.2219 10.725 1.5876 16.5c0.90835 14.345 1.5071 15.741 4.1692 9.723 1.7983-4.0653 2.4932-4.723 4.9904-4.723 3.1769 0 6.2112 2.6486 6.2112 5.4217 0 3.262 4.045 21.65 5.6388 25.634 0.86812 2.1696 2.1487 3.9448 2.8458 3.9448 0.79847 0 2.621-5.4072 4.9259-14.615 4.5968-18.363 5.7368-21.133 9.0367-21.962 4.9537-1.2433 8.0138 3.827 9.1706 15.195 0.3851 3.7845 1.2687 8.2309 1.9636 9.8809l1.2634 3 1.0625-2.7752c0.58437-1.5264 1.5384-5.7541 2.12-9.3949 0.58161-3.6407 1.4292-7.3419 1.8835-8.2247 0.45433-0.8829 1.1481-3.4052 1.5416-5.6052 0.39357-2.2 1.6145-5.4625 2.7132-7.25 1.5948-2.5947 2.6556-3.25 5.261-3.25 3.1419 0 6.5734 2.4485 6.5734 4.6904 0 0.5681 1.296 3.9077 2.88 7.4213s3.3414 8.4133 3.9053 10.888c0.56388 2.475 1.4974 5.85 2.0745 7.5s2.4706 9.075 4.2079 16.5c1.7372 7.425 4.2249 17.325 5.5281 22 3.9681 14.235 9.2995 37.07 10.506 45 0.62775 4.125 1.516 9.75 1.9738 12.5 0.45785 2.75 1.6126 11.392 2.5661 19.205 1.6002 13.111 1.888 14.189 3.7374 14 1.616-0.1652 2.1758 0.6388 2.8928 4.1555 1.0593 5.1949 0.38214 8.4852-2.2977 11.165-2.3763 2.3764-3.8218 2.4703-6.7244 0.4373zm-465.55-32.557c-2.7309-1.4411-5.4931-4.5824-9.8088-11.155-6.3975-9.7428-22.132-40.821-34.114-67.379-4.0019-8.8705-7.7261-16.201-8.2761-16.29-0.55-0.089-1.1544 0.8374-1.3432 2.0583s-1.6547 4.5438-3.2578 7.3842c-1.603 2.8404-3.6357 7.5968-4.5171 10.57s-2.4529 7.075-3.4922 9.1156-1.8897 4.7981-1.8897 6.1278c0 1.3298-0.62196 3.9352-1.3821 5.7899-0.76017 1.8546-1.6948 6.8199-2.0771 11.034l-0.69492 7.6619 3.577 3.9593c5.8988 6.5293 4.6072 8.6025-4.5673 7.3309-8.3706-1.1602-11.856-4.3859-11.856-10.973 0-3.3705 4.7946-17.798 8.1884-24.64 1.364-2.75 3.42-7.475 4.5687-10.5 5.2902-13.931 7.347-19.037 8.7275-21.665 0.8188-1.5591 2.4528-5.075 3.6311-7.8131l2.1424-4.9783-3.3077-10.022c-1.8192-5.5119-3.6207-10.472-4.0033-11.022-1.3788-1.9821-10.794-28.318-15.373-43-2.573-8.25-5.0698-15.9-5.5484-17-1.0608-2.4383-6.2608-20.78-9.356-33-0.83582-3.3-3.1179-12.075-5.0713-19.5-1.9534-7.425-3.5621-13.612-3.5748-13.75-0.0896-0.96731-2.9818 0.07-4.1822 1.5-2.0711 2.4672-2.2216 11.521-3.2778 14.646 0 0-0.59573 2.3642-0.85687 4.3946-0.59759 4.6462-4.9113 30.649-5.2764 80.21-0.27879 37.846-0.3706 39.55-2.913 54.078-0.90679 5.1818-2.4791 14.936-3.494 21.677-2.0854 13.85-4.1466 18.572-8.3214 19.061-4.8997 0.574-5.1216-2.2959-2.0347-26.316 0.84818-6.6 1.9018-17.625 2.3414-24.5s1.2687-16.55 1.8424-21.5 1.4045-12.6 1.8462-17c1.2382-12.335 0.86113-80.676-0.5656-102.5-0.95047-14.539-1.0163-24.207-0.25882-38 1.1617-21.154 3.0818-29.67 7.1461-31.697 6.7742-3.3773 13.479 7.6758 18.514 30.519 0.7664 3.4774 2.0851 7.709 2.9305 9.4036s1.537 4.5469 1.537 6.3384c0 1.7915 0.89419 6.1099 1.9871 9.5964 1.0929 3.4865 1.9929 7.1171 2 8.0681 7e-3 0.95095 0.88969 4.551 1.9613 8 1.0716 3.449 2.9078 9.5293 4.0803 13.512 2.6455 9.0841 4.5318 18.566 6.6005 26.759 1.3594 5.3375 3.9788 13.562 15.445 48.5 6.165 18.784 14.152 38.067 15.718 37.945 0.38907-0.03 3.1824-3.4452 6.2074-7.5886 8.9762-12.295 12.007-15.386 17.583-17.937 6.0776-2.7799 8.2196-2.9567 12.699-1.048 7.3144 3.1166 7.6556 4.126 13.736 40.629 1.695 10.175 3.4765 18.895 3.9588 19.377 0.50271 0.5028 1.396-0.9909 2.0931-3.5 1.3968-5.0276 1.4291-5.3574 2.4702-25.215 0.77572-14.796 1.561-17.662 4.8396-17.662 3.3286 0 4.5415 2.6928 6.0812 13.5 1.6504 11.584 2.7185 16.862 5.5659 27.5 0.95688 3.575 2.3006 8.6375 2.9862 11.25s1.6379 4.75 2.1164 4.75 0.87346-3.9375 0.87763-8.75c8e-3 -8.7437 1.4-23.808 2.5296-27.367 0.97708-3.0785 4.2121-4.2772 6.8604-2.542 2.7749 1.8182 4.9441 7.4902 7.136 18.659 2.0849 10.624 6.7941 25.454 9.4571 29.782 1.7249 2.8036 2.309 3.1275 4.004 2.2203 4.2346-2.2662 5.3732-6.6347 5.3437-20.503-0.0152-7.15-0.34703-16.375-0.73742-20.5-0.87896-9.2875 0.46121-12.063 5.0518-10.461 2.5926 0.9045 2.9674 1.6628 4.19 8.4772 4.1808 23.302 10.982 44.984 14.111 44.984 1.5184 0 2.2504-9.9072 1.8898-25.576l-0.3435-14.924 2.3078-0.3271c3.7911-0.5374 7.0947 2.3654 7.8144 6.8664 0.79876 4.9952 1.4501 5.4001 5.2126 3.2407 2.8377-1.6286 3.1208-1.6301 4.8941-0.025 1.8417 1.6667 3.554 7.1598 4.7785 15.329 0.80209 5.3512 3.8302 10.212 6.8309 10.965 2.3515 0.5902 12.044-3.8304 25.162-11.475 10.777-6.281 16.386-9.2842 26.008-13.924 6.9696-3.3611 10.786-5.8622 12.57-8.2378 4.3299-5.7663 8.8931-16.82 12.136-29.399 2.9612-11.485 3.1012-12.935 3.1866-33.012 0.0666-15.651-0.49575-26.349-2.2079-42-1.2635-11.55-3.0128-27.525-3.8874-35.5-2.0517-18.708-2.0431-33.691 0.0204-35.755 1.9403-1.9403 6.326-0.91612 7.1465 1.6688 0.3333 1.0502 0.79944 6.1116 1.0359 11.248 0.5285 11.481 2.1269 31.308 3.4939 43.338 0.56247 4.95 1.4511 13.63 1.9747 19.288s1.1488 10.609 1.3892 11c0.49303 0.80265 2.9884 22.618 4.6569 40.712 0.60861 6.6 1.7006 16.05 2.4266 21 0.726 4.95 1.336 9.9 1.3556 11 0.0501 2.8093 5.0424 28.269 6.3729 32.5 0.60533 1.925 1.471 4.625 1.9238 6s1.4851 6.1045 2.294 10.51c0.80895 4.4055 1.9507 9.2723 2.5373 10.815 1.5206 3.9996 1.323 12.942-0.33628 15.211-1.163 1.5905-1.8895 1.7495-4.25 0.9302-2.5382-0.881-3.0315-1.8012-4.5445-8.4773-3.1569-13.929-6.9768-31.453-8.39-38.489-2.8626-14.252-3.1701-15.591-3.7047-16.125-0.30031-0.3003-0.99465 0.2923-1.543 1.3169s-3.9134 3.8406-7.4779 6.2578c-3.7175 2.5209-7.1091 5.7121-7.9541 7.4842-2.1259 4.4581-5.975 6.291-10.011 4.7674-3.5605-1.3439-8.9894 0.1847-15.952 4.4916-2.0516 1.2691-4.0096 2.3074-4.3511 2.3074-0.70175 0-19.903 10.885-28.715 16.278-7.1257 4.3611-14.206 5.6162-18.788 3.3304-2.9465-1.4699-3.31-1.4435-5.6672 0.4106-3.0628 2.4092-5.5188 2.5059-8.8138 0.3469-2.4405-1.5991-2.5768-1.5451-6.3112 2.5-6.6656 7.2201-11.938 5.3127-17.135-6.1986-2.5806-5.7166-3.3218-6.636-4.537-5.6275-0.79884 0.663-1.4524 1.6886-1.4524 2.2792 0 2.2873-5.2977 8.562-8.2676 9.7921-7.8007 3.2312-12.198 0.056-17.321-12.508-3.8185-9.3656-5.4117-11.051-5.4117-5.7239 0 1.5189-1.2375 5.2049-2.75 8.191-2.24 4.4225-3.2793 5.4898-5.6042 5.7558-1.874 0.2143-3.6335-0.4057-5.1236-1.8056-2.5051-2.3534-6.5072-11.389-8.9783-20.271-0.87989-3.1625-1.955-5.75-2.389-5.75s-1.5751 3.2625-2.5357 7.25c-2.8535 11.846-6.1524 16.911-10.042 15.418-0.93205-0.3577-2.9634-3.4668-4.5141-6.9091-3.3085-7.3446-5.0537-15.624-9.645-45.759-0.87986-5.775-2.4956-13.312-3.5905-16.75-1.9511-6.1255-2.0618-6.25-5.5555-6.25-5.6736 0-15.191 9.7289-21.937 22.425-3.6511 6.871-3.7356 10.19-0.47276 18.575 4.061 10.436 9.0068 20.738 12.328 25.68 1.5453 2.2991 2.8096 4.917 2.8096 5.8176s3.0644 7.7946 6.8098 15.32c3.7454 7.5252 7.8094 15.861 9.0312 18.523 1.2218 2.6626 4.0074 7.5896 6.1902 10.949s3.9688 6.4202 3.9688 6.8019c0 0.3818 0.61556 0.9304 1.3679 1.2191 1.0727 0.4117 1.2604-0.4286 0.86995-3.893-0.44209-3.9222-0.2727-4.4179 1.5096-4.4179 2.753 0 3.9058 1.6541 6.2359 8.948 2.3589 7.3839 1.8388 10.576-2.0509 12.587-3.3806 1.7482-2.5998 1.8161-7.2339-0.6294zm210.3-113.04c0-4.6703-2.2254-15.865-3.1538-15.865-0.44445 0-1.0816 1.2375-1.4159 2.75-0.33432 1.5125-1.2441 5.3785-2.0217 8.5912-0.77763 3.2126-1.1611 6.2501-0.85219 6.75 0.30893 0.4998 2.1101 0.9088 4.0027 0.9088 3.1895 0 3.441-0.2291 3.441-3.1347zm-328.62-153.2c1.451-11.77 3.2556-16.661 6.147-16.661 0.81232 0 1.4693-0.5625 1.4598-1.25-0.0436-3.1891-3.7918-15.809-5.4444-18.332-1.7624-2.6897-1.8811-2.7245-2.606-0.76499-2.7283 7.3754-3.9634 51.711-1.3682 49.116 0.20023-0.20022 1.0155-5.6487 1.8118-12.108z" fill="var(--pen)"/>
                </g>
              </svg>
            </div>
          </div>
          <div className="reveal">
            <div className="eyebrow"><span className="hi">लेखिका परिचय</span><span className="en">The author</span></div>
            <h2>
              <span className="hi hin">विद्रोही विचारों की प्रतिध्वनि</span>
              <span className="en">A voice of fierce resonance</span>
            </h2>
            <p>
              <span className="hi">अरुंधति रॉय भारत की सबसे प्रभावशाली लेखिकाओं और विचारकों में से एक हैं। 1997 में अपनी पहली कृति ‘द गॉड ऑफ़ स्मॉल थिंग्स’ के लिए उन्हें प्रतिष्ठित बुकर पुरस्कार से सम्मानित किया गया। वे मानवाधिकारों और सामाजिक मुद्दों पर निरंतर सक्रिय रही हैं।</span>
              <span className="en">Arundhati Roy is one of the most prominent writers and activists of our time. She won the Booker Prize in 1997 for her debut novel, 'The God of Small Things'. Her fiction and essays have consistently challenged power.</span>
            </p>
            <p>
              <span className="hi">‘मेरी माँ मेरी गैंगस्टर’ उनकी अब तक की सबसे अंतरंग रचना है, जिसमें वे माँ और बेटी के जटिल, गहरे स्नेह और वैचारिक टकराहट को असाधारण संवेदनशीलता के साथ चित्रित करती हैं।</span>
              <span className="en">'Mother Mary Comes To Me' is her most intimate work yet, charting the complicated and deep bonds of love and rebellion with her mother.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============ ORDER ============ */}
      <section className="section order" id="order">
        <div className="wrap order-grid">
          <div className="order-intro reveal">
            <div className="eyebrow"><span className="hi">अभी बुक करें</span><span className="en">Reserve Now</span></div>
            <h2>
              <span className="hi hin">अपनी दुर्लभ प्रति आज ही आरक्षित करें।</span>
              <span className="en">Secure your rare copy today.</span>
            </h2>
            <p>
              <span className="hi">केवल 1500 प्रतियां ही मुद्रित की जा रही हैं। भुगतान के बाद आपको एक विशिष्ट संस्करण संख्या (जैसे No. 0418) तुरंत आवंटित की जाएगी।</span>
              <span className="en">Only 1,500 copies will ever be printed. Upon successful booking, a unique edition number will be instantly assigned to your order.</span>
            </p>
            <ul className="order-perks">
              <li>
                <div className="ic">✓</div>
                <div>
                  <b><span className="hi">हस्ताक्षरित प्रति</span><span className="en">Personally Signed</span></b><br/>
                  <span className="hi">शीर्षक-पृष्ठ पर नीले जेल पेन से स्वयं लेखिका के दस्तख़त।</span>
                  <span className="en">Signed directly by Arundhati Roy on the title page.</span>
                </div>
              </li>
              <li>
                <div className="ic">✓</div>
                <div>
                  <b><span className="hi">निःशुल्क शिपिंग</span><span className="en">Free Delivery</span></b><br/>
                  <span className="hi">पूरे भारत में सुरक्षित पैकेजिंग के साथ निःशुल्क शिपिंग।</span>
                  <span className="en">Secure shipping at no additional cost across India.</span>
                </div>
              </li>
              <li>
                <div className="ic">✓</div>
                <div>
                  <b><span className="hi">आवंटन संख्या प्रमाण</span><span className="en">Edition Number</span></b><br/>
                  <span className="hi">आपके आदेश के साथ विशिष्ट संस्करण प्रमाण पत्र।</span>
                  <span className="en">Assigned certificate number automatically generated.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="form-card reveal">
            <h3><span className="hi hin">बुकिंग विवरण</span><span className="en">Reserve Edition</span></h3>
            <div className="fsub"><span className="hi">सुरक्षित बुकिंग फ़ॉर्म</span><span className="en">Secure checkout details</span></div>
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="frow">
                <div className="field">
                  <label htmlFor="f_name"><span className="hi">पूरा नाम</span><span className="en">Full Name</span></label>
                  <input 
                    type="text" 
                    id="f_name" 
                    value={name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'err' : ''}
                    placeholder={lang === 'en' ? "Full Name" : "पूरा नाम"}
                  />
                  <div className="msg" data-for="f_name">{errors.name}</div>
                </div>
              </div>

              <div className="frow two">
                <div className="field">
                  <label htmlFor="f_email"><span className="hi">ईमेल पता</span><span className="en">Email Address</span></label>
                  <input 
                    type="email" 
                    id="f_email" 
                    value={email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'err' : ''}
                    placeholder="email@example.com"
                  />
                  <div className="msg" data-for="f_email">{errors.email}</div>
                </div>
                <div className="field">
                  <label htmlFor="f_phone"><span className="hi">मोबाइल नंबर (10 अंक)</span><span className="en">Phone (10 digits)</span></label>
                  <input 
                    type="tel" 
                    id="f_phone" 
                    value={phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? 'err' : ''}
                    placeholder={lang === 'en' ? "10-digit mobile number" : "10 अंकों का मोबाइल नंबर"}
                  />
                  <div className="msg" data-for="f_phone">{errors.phone}</div>
                </div>
              </div>

              <div className="frow">
                <div className="field">
                  <label htmlFor="f_addr"><span className="hi">शिपिंग का पता</span><span className="en">Shipping Address</span></label>
                  <textarea 
                    id="f_addr" 
                    value={address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={errors.address ? 'err' : ''}
                    placeholder={lang === 'en' ? "House No., Street, Area..." : "मकान संख्या, गली, क्षेत्र..."}
                  />
                  <div className="msg" data-for="f_addr">{errors.address}</div>
                </div>
              </div>

              <div className="frow two">
                <div className="field">
                  <label htmlFor="f_city"><span className="hi">शहर / कस्बा</span><span className="en">City</span></label>
                  <input 
                    type="text" 
                    id="f_city" 
                    value={city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={errors.city ? 'err' : ''}
                    placeholder={lang === 'en' ? "City / Town" : "शहर / कस्बा"}
                  />
                  <div className="msg" data-for="f_city">{errors.city}</div>
                </div>
                <div className="field">
                  <label htmlFor="f_pin"><span className="hi">पिन कोड (6 अंक)</span><span className="en">PIN Code</span></label>
                  <input 
                    type="text" 
                    id="f_pin" 
                    value={pin}
                    onChange={(e) => handleInputChange('pin', e.target.value)}
                    className={errors.pin ? 'err' : ''}
                    placeholder={lang === 'en' ? "6-digit PIN code" : "6 अंकों का पिन कोड"}
                  />
                  <div className="msg" data-for="f_pin">{errors.pin}</div>
                </div>
              </div>

              {/* Quantity Stepper Row */}
              <div className="qty-row">
                <div className="ql">
                  <span className="hi">प्रतियों की संख्या</span>
                  <span className="en">Copies</span>
                  <em><span className="hi">अधिकतम 5 प्रति प्रति व्यक्ति</span><span className="en">Max 5 per order</span></em>
                </div>
                <div className="stepper">
                  <button type="button" id="qMinus" onClick={handleMinus} disabled={qty <= 1}>−</button>
                  <input type="text" id="qty" value={qty} readOnly />
                  <button type="button" id="qPlus" onClick={handlePlus} disabled={qty >= Math.min(CONFIG.maxPerPerson, copiesLeft)}>+</button>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="summary">
                <div className="sline">
                  <span><span className="hi">मूल्य (₹1499 × </span><span className="en">Subtotal ({qty} copy × </span>{qty})</span>
                  <span>₹<span id="sSub">{CONFIG.price * qty}</span></span>
                </div>
                <div className="sline">
                  <span><span className="hi">शिपिंग और पैकेजिंग</span><span className="en">Delivery & Packaging</span></span>
                  <span className="free"><span className="hi">निःशुल्क</span><span className="en">FREE</span></span>
                </div>
                <div className="sline total">
                  <span><b><span className="hi">कुल देय राशि</span><span className="en">Total Amount</span></b></span>
                  <span>₹<b><span id="sTotal">{CONFIG.price * qty}</span></b></span>
                </div>
              </div>

              {/* Submit / Pay Button */}
              <button 
                type="button" 
                className="btn btn--red pay-btn" 
                id="payBtn"
                onClick={handlePay}
                disabled={isProcessing || copiesLeft <= 0}
              >
                {isProcessing ? t.processing : `${t.pay} — ₹${CONFIG.price * qty} →`}
              </button>

              <div className="pay-note">
                <span className="hi">सुरक्षित पेमेंट गेटवे। सफल ऑर्डर के बाद रसीद आपके ईमेल पर भेजी जाएगी।</span>
                <span className="en">Secured payment processing. A digital invoice will be sent to your email.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ============ SUCCESS MODAL ============ */}
      <div className={`modal-bg ${showModal ? 'show' : ''}`} id="modal" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
        <div className="modal">
          <div className="modal-top">
            <div className="ok">✓</div>
            <h3>
              <span className="hi">आपकी प्रति सुरक्षित!</span>
              <span className="en">Your copy is reserved!</span>
            </h3>
            <p>Reservation confirmed</p>
          </div>
          <div className="modal-body">
            <div className="cnum">
              <span className="hi">आपकी एडिशन संख्या</span>
              <span className="en">Your edition number</span>
              <b id="modalNo">{assignedNo}</b>
              <span className="hi">क्रमांकित · हस्ताक्षरित</span>
              <span className="en">numbered · signed</span>
            </div>
            <p>
              <span className="hi">धन्यवाद! पुष्टि आपके ईमेल पर भेज दी गई है। यह हस्ताक्षरित प्रति लॉन्च पर सीधे आपके पते पर पहुँचेगी।</span>
              <span className="en">Thank you! A confirmation has been sent to your email. This signed copy will ship to your address at launch.</span>
            </p>
            <button className="btn btn--ghost" id="modalClose" onClick={() => setShowModal(false)} type="button">
              <span className="hi">ठीक है</span>
              <span className="en">Done</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============ MOBILE CTA BAR ============ */}
      <div className="mobile-cta">
        <div className="mc-left">
          <span data-stock-pill>{copiesLeft}/1500</span> <span className="hi">शेष</span><span className="en">left</span><br/>
          <b>₹1499</b> · <span className="hi">हस्ताक्षरित</span><span className="en">signed</span>
        </div>
        <a href="#order" className="btn btn--red">
          <span className="hi">बुक करें</span>
          <span className="en">Book</span> →
        </a>
      </div>

    </div>
  );
};

export default ArPage;
