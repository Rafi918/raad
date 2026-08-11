/* هوية الملف: صفحة تحريرية عربية تحتفي بالمسار العلمي عبر تخطيط غير متماثل، لون ورقي، حبر أزرق، ونحاس هادئ. */
import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpLeft,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  Copy,
  Download,
  ExternalLink,
  GraduationCap,
  Landmark,
  Mail,
  Menu,
  Phone,
  Quote,
  ScrollText,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

const ASSETS = {
  hero: "/manus-storage/raad-cv-hero-editorial_ccc5d7fd.jpg",
  research: "/manus-storage/raad-cv-research-archive_9070720f.jpg",
  paper: "/manus-storage/raad-cv-paper-detail_110c1fc8.jpg",
  mark: "/manus-storage/raad-cv-monogram-seal_fc9f2fa9.png",
};

const navItems = [
  { id: "overview", label: "الواجهة" },
  { id: "education", label: "المؤهلات" },
  { id: "experience", label: "المسار" },
  { id: "research", label: "البحث" },
  { id: "honors", label: "التكريمات" },
];

const education = [
  { year: "1997", title: "الدكتوراه الأولى", detail: "الأدب العربي ونقده — الأدب الأندلسي", institution: "جامعة أم درمان الإسلامية، الخرطوم" },
  { year: "2006", title: "دكتوراه القانون الدولي", detail: "دراسة عن بعد بإشراف السفارة الأمريكية في صنعاء", institution: "الجامعة العالمية الأمريكية" },
  { year: "1992", title: "الماجستير", detail: "الأدب العربي", institution: "جامعة الموصل" },
  { year: "1987", title: "البكالوريوس", detail: "اللغة العربية وآدابها", institution: "جامعة الموصل" },
  { year: "2024", title: "بكالوريوس الترجمة", detail: "الترجمة", institution: "جامعة واسط — كلية الآداب" },
];

const timeline = [
  { years: "2020 — 2023", role: "عميد كلية الدراسات العليا", place: "جامعتا العلوم التطبيقية والملكة أروى — صنعاء", note: "الإشراف على 15 برنامجاً للدكتوراه وتطوير اللوائح الأكاديمية." },
  { years: "2018 — 2019", role: "القائم بأعمال رئيس الجامعة", place: "جامعة العلوم التطبيقية والاجتماعية — صنعاء", note: "قيادة سبع كليات وتمثيل الجامعة رسمياً." },
  { years: "2015 — 2018", role: "عميد كلية الآداب", place: "جامعتا العلوم التطبيقية والملكة أروى — صنعاء", note: "إدارة البرامج الأكاديمية وبناء جسور التعاون العلمي." },
  { years: "2010 — الآن", role: "أستاذ الأدب العربي والأدب الأندلسي", place: "جامعة واسط — كلية التربية", note: "تدريس الأدب العربي والدراسات العليا والإشراف على البحوث." },
  { years: "1995 — 2001", role: "رئيس قسم اللغة العربية لغير الناطقين بها", place: "المدرسة الأمريكية — صنعاء", note: "تطوير تعليم العربية للطلبة الأجانب والدبلوماسيين." },
];

const publications = [
  "شعر الجهاد والحرب في عهد بني الأحمر — أطروحة دكتوراه",
  "رثاء المدن في الشعر الأندلسي",
  "أبو الحسن سلام الإشبيلي — دراسة وتحقيق",
  "قضايا في الأدب الأندلسي — قراءة ثانية",
  "الشعر الأندلسي في عهد بني الأحمر — صور بطولية وجهادية",
  "لغتنا الجميلة لغير الناطقين بها — بالاشتراك مع روبرت ماجور",
];

const awards = [
  "كتب شكر وتقدير من رئاسة الوزراء ووزارة التعليم العالي، بأكثر من سبع مناسبات.",
  "تكريم رئيس وزراء الأردن بوصفه ثالثاً على العالم في تعليم اللغة العربية للناطقين بغيرها.",
  "اختياره شخصية مؤثرة في المجتمع اليمني عام 1998 إلى جانب الشاعر عبدالله البردوني.",
  "اختياره واحداً من 100 شخصية عالمية خدمت العربية لغير الناطقين بها، والثالث عالمياً والوحيد من داخل العراق.",
  "العضوية الذهبية في المجلس الدولي العالمي للغة العربية واللجنة الاستشارية للمحكمين عام 2018.",
  "الحصول على القلادة الذهبية من جامعة ويستمنستر البريطانية عن بحث في الشعر الصقلي عام 2025.",
];

function SectionHeading({ eyebrow, title, copy, number }: { eyebrow: string; title: string; copy?: string; number?: string }) {
  return (
    <div className="section-heading">
      {number && <span className="section-number">{number}</span>}
      <div className="section-heading-line" aria-hidden="true" />
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {copy && <p className="section-copy">{copy}</p>}
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const sections = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-24% 0px -64% 0px", threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("ralwaili@uowasit.edu.iq");
    toast.success("تم نسخ البريد الإلكتروني");
  };

  return (
    <div className="site-shell" dir="rtl">
      <aside className="identity-rail" aria-label="هوية الملف الأكاديمي">
        <img src={ASSETS.mark} alt="ختم رعد ناصر" />
        <span>RN · 2026</span>
        <i aria-hidden="true" />
        <small>ملف<br />أكاديمي</small>
      </aside>
      <header className="topbar">
        <div className="topbar-inner container">
          <button className="brand" onClick={() => scrollTo("overview")} aria-label="العودة إلى بداية السيرة">
            <img src={ASSETS.mark} alt="ختم رعد ناصر" className="brand-mark" />
            <span className="brand-copy">
              <strong>رعد ناصر</strong>
              <small>الملف الأكاديمي</small>
            </span>
          </button>
          <nav className="desktop-nav" aria-label="التنقل الرئيسي">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "active" : ""} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="topbar-actions">
            <button className="print-button" onClick={() => window.print()} title="طباعة السيرة">
              <Download size={16} />
              <span>نسخة للطباعة</span>
            </button>
            <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-nav" aria-label="تنقل الهاتف">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "active" : ""} onClick={() => setMenuOpen(false)}>
                <span>0{navItems.indexOf(item) + 1}</span>{item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="overview" className="hero-section">
          <div className="hero-media" style={{ backgroundImage: `url(${ASSETS.hero})` }} aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-grid container">
            <div className="hero-copy">
              <p className="hero-kicker"><span className="kicker-dot" /> أستاذ دكتور · باحث · محكّم علمي</p>
              <h1>رعد ناصر<br /><em>مايود الوائلي</em></h1>
              <p className="hero-lede">مسار علمي يمتد من الأدب الأندلسي إلى فضاءات القانون الدولي، ومن قاعات الدرس إلى بناء المؤسسات الأكاديمية.</p>
              <div className="hero-cta-row">
                <a className="button button-primary" href="#education">استكشف المسار <ArrowDownLeft size={16} /></a>
                <button className="text-button" onClick={() => scrollTo("contact")}>للتواصل <ArrowUpLeft size={16} /></button>
              </div>
              <div className="hero-signature">
                <span className="signature-line" />
                <span>العراق · جامعة واسط</span>
              </div>
              <img className="hero-seal" src={ASSETS.mark} alt="" aria-hidden="true" />
            </div>
            <aside className="hero-panel">
              <div className="hero-panel-top"><span>سجل مختصر</span><span>2026</span></div>
              <p className="hero-panel-note">«المعرفة لا تُحفظ في الكتب وحدها؛ تُختبر حين تتحول إلى أثر في طالب، أو مؤسسة، أو سؤال جديد.»</p>
              <div className="hero-panel-rule" />
              <div className="mini-facts">
                <div><strong>الأدب العربي</strong><span>التخصص الرئيس</span></div>
                <div><strong>القانون الدولي</strong><span>مجال معرفي ثانٍ</span></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="intro-strip">
          <div className="container intro-strip-grid">
            <div className="intro-marker"><span>01</span><span className="marker-line" /></div>
            <p className="intro-statement">أستاذ الأدب العربي، المتخصص في الأدب الأندلسي، وصاحب تجربة ممتدة في تعليم العربية لغير الناطقين بها وإدارة البرامج الأكاديمية.</p>
            <div className="intro-location"><Landmark size={18} /><span>جامعة واسط<br /><small>كلية التربية</small></span></div>
          </div>
        </section>

        <section className="section-shell about-section">
          <div className="container about-grid">
            <div className="about-aside">
              <p className="vertical-label">ملاحظة من الأرشيف</p>
              <div className="about-stamp"><img src={ASSETS.mark} alt="" /><span>RN<br />2026</span></div>
            </div>
            <div className="about-content">
              <SectionHeading eyebrow="نبذة" title="أكثر من سيرة؛ خريطة معرفة" copy="يُقرأ هذا الملف بوصفه مساراً متصلاً بين البحث والتدريس والقيادة الأكاديمية." number="02" />
              <p className="about-lead">يجمع الدكتور رعد ناصر بين التكوين العميق في الأدب العربي ونقده، والخبرة في القانون الدولي، وتجربة طويلة في إدارة الجامعات والبرامج العليا.</p>
              <div className="about-columns">
                <p>عمل في جامعات عراقية وعربية، ودرّس العربية وآدابها لسنوات طويلة، مع اهتمام خاص بالأدب الأندلسي وبناء جسور اللغة للناطقين بغيرها.</p>
                <p>إلى جانب التدريس، أشرف على رسائل علمية، وشارك في مناقشات وتحكيم بحوث، وأسهم في تطوير لوائح وبرامج أكاديمية ومؤتمرات علمية.</p>
              </div>
              <div className="about-tags"><span>الأدب الأندلسي</span><span>نقد الأدب</span><span>تعليم العربية</span><span>القانون الدولي</span></div>
            </div>
          </div>
        </section>

        <section className="metrics-section">
          <div className="container metrics-grid">
            <div className="metrics-intro"><p className="eyebrow">أثر متراكم</p><h2>أرقام تروي<br /><em>حكاية العمل</em></h2></div>
            <div className="metric"><strong>70<span>+</span></strong><span>رسالة ماجستير<br />ودكتوراه تحت الإشراف</span></div>
            <div className="metric"><strong>100<span>+</span></strong><span>مناقشة علمية<br />في جامعات عربية وعراقية</span></div>
            <div className="metric"><strong>25<span>+</span></strong><span>بحثاً منشوراً<br />في مجلات محكّمة</span></div>
            <div className="metric"><strong>22</strong><span>مؤتمراً دولياً<br />في ثلاث قارات</span></div>
          </div>
        </section>

        <section id="education" className="section-shell education-section">
          <div className="container">
            <SectionHeading eyebrow="المؤهلات العلمية" title="تكوين متعدد المسارات" copy="من الموصل إلى الخرطوم، ثم إلى فضاء القانون الدولي؛ مسار يتسع كلما أضيف إليه سؤال جديد." number="03" />
            <div className="education-layout">
              <div className="education-list">
                {education.map((item, index) => (
                  <article className="education-card" key={`${item.year}-${item.title}`}>
                    <span className="education-index">0{index + 1}</span>
                    <span className="education-year">{item.year}</span>
                    <div><h3>{item.title}</h3><p>{item.detail}</p><small>{item.institution}</small></div>
                    <GraduationCap size={21} className="education-icon" />
                  </article>
                ))}
              </div>
              <div className="education-note" style={{ backgroundImage: `url(${ASSETS.paper})` }}>
                <div className="education-note-inner"><ScrollText size={20} /><p>«اللغة ليست أداةً للتعبير فحسب؛ إنها طريقة لرؤية العالم وترتيب أسئلته.»</p><span>منهج في التعلم المستمر</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section-shell experience-section">
          <div className="container">
            <div className="experience-head"><SectionHeading eyebrow="الخبرات الإدارية والأكاديمية" title="محطات صنعت الأثر" copy="قيادة الكلية والجامعة لم تأتِ منفصلة عن قاعة الدرس؛ بل نمت منها وتعود إليها." number="04" /><div className="head-aside"><BriefcaseBusiness size={20} /><span>1992<br /><small>حتى الآن</small></span></div></div>
            <div className="timeline">
              {timeline.map((item, index) => (
                <article className="timeline-item" key={item.role}>
                  <div className="timeline-rail"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
                  <div className="timeline-content"><p className="timeline-years">{item.years}</p><h3>{item.role}</h3><p className="timeline-place">{item.place}</p><p className="timeline-note">{item.note}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="research" className="research-section">
          <div className="container research-grid">
            <div className="research-image-wrap"><img src={ASSETS.research} alt="تفاصيل أرشيفية على مكتب باحث" onError={(event) => { event.currentTarget.src = ASSETS.paper; }} /><span className="image-caption">من دفتر الباحث · قراءة، تحقيق، ومقارنة</span></div>
            <div className="research-copy"><SectionHeading eyebrow="البحث والكتابة" title="الأندلس بوصفها سؤالاً مفتوحاً" copy="اهتمام لا يكتفي باستعادة النص، بل يقرأه في سياقه الثقافي والإنساني." number="05" /><p className="research-lede">تتوزع الأعمال بين الشعر الأندلسي، صور الحرب والجهاد، رثاء المدن، والتحقيق، مع امتداد معرفي إلى الدراسات المقارنة والقانون الدولي.</p><div className="publication-list">{publications.map((publication, index) => <div className="publication-item" key={publication}><span>{String(index + 1).padStart(2, "0")}</span><p>{publication}</p><ChevronLeft size={15} /></div>)}</div><a className="inline-link" href="mailto:ralwaili@uowasit.edu.iq">اطلب قائمة الأعمال كاملة <ExternalLink size={14} /></a></div>
          </div>
        </section>

        <section id="honors" className="section-shell honors-section">
          <div className="container honors-grid">
            <div><SectionHeading eyebrow="الجوائز والتكريمات" title="علامات تقدير على الطريق" copy="تكريمات جاءت من مؤسسات ومجالس علمية، لكنها تبقى شاهدة على أثر العمل لا غايته." number="06" /><div className="honors-quote"><Quote size={22} /><p>«وحده ما نتركه في الآخرين يمنح الإنجاز معناه الكامل.»</p></div></div>
            <div className="awards-list">{awards.map((award, index) => <article className="award-item" key={award}><div className="award-number">{String(index + 1).padStart(2, "0")}</div><div><p>{award}</p><span><Award size={14} /> تكريم موثق في السيرة الذاتية</span></div></article>)}</div>
          </div>
        </section>

        <section className="teaching-section">
          <div className="container teaching-grid"><div className="teaching-title"><p className="eyebrow">في قاعة الدرس</p><h2>تعليم العربية<br /><em>لمن يكتشفها</em></h2></div><div className="teaching-copy"><p>درّس اللغة العربية وآدابها، والأدب الأندلسي، والنصوص الإنجليزية للدراسات العليا، والدراسات الاستشراقية والأدب المقارن في جامعات ومؤسسات تعليمية متعددة.</p><div className="teaching-pills"><span>العربية للناطقين بغيرها</span><span>الأدب العربي القديم</span><span>الدراسات العليا</span><span>الأدب المقارن</span></div></div><div className="teaching-symbol"><BookOpen size={31} /><span>تعليم<br />وتحقيق</span></div></div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid"><div className="contact-copy"><p className="eyebrow light">للبحث، التعاون، أو الاستفسار</p><h2>افتح حواراً<br /><em>حول المعرفة</em></h2><p>للتواصل الأكاديمي أو طلب معلومات إضافية عن الأبحاث والبرامج والخبرات، يمكن مراسلة الدكتور رعد ناصر مباشرة.</p></div><div className="contact-card"><div className="contact-card-top"><img src={ASSETS.mark} alt="ختم رعد ناصر" /><span>معلومات التواصل</span></div><a href="mailto:ralwaili@uowasit.edu.iq" className="contact-row"><Mail size={18} /><span>ralwaili@uowasit.edu.iq</span><ExternalLink size={14} /></a><button className="contact-row copy-row" onClick={copyEmail}><Copy size={18} /><span>نسخ البريد الإلكتروني</span><span className="copy-hint">نسخ</span></button><a href="tel:+9647848340361" className="contact-row"><Phone size={18} /><span dir="ltr">+964 07848340361</span><ExternalLink size={14} /></a><div className="contact-card-footer"><span>العراق · جامعة واسط</span><Sparkles size={15} /></div></div></div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-inner"><div className="footer-brand"><img src={ASSETS.mark} alt="ختم رعد ناصر" /><span>© 2026 رعد ناصر مايود الوائلي</span></div><span>ملف أكاديمي صُمم ليُقرأ على مهل</span><button onClick={() => scrollTo("overview")} aria-label="العودة إلى الأعلى"><ArrowUpLeft size={17} /></button></div></footer>
    </div>
  );
}
