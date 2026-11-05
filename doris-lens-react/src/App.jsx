import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Instagram,
  Menu, X, MapPin, Phone, Globe, Sparkles
} from 'lucide-react';

const A = '/images/';
const instagram = 'https://www.instagram.com/doris.lens/';
const facebook = 'https://www.facebook.com/doriscontactlensvn/photos?locale=vi_VN';
const phone = '03705195875';

const collections = [
  {
    id: 'circle',
    name: 'Circle',
    title: 'Circle',
    label: 'BỘ SƯU TẬP CIRCLE · DIA 14.5MM GIÃN TO CUỐN HÚT',
    description: 'Dòng lens Circle trứ danh từ DORIS CONTACT LENS mang đến ánh nhìn sâu thẳm, long lanh với viền sắc nét tạo hiệu ứng mắt búp bê to tròn kiêu kỳ.',
    image: `${A}01_circle_model.jpg`,
    count: '01',
  },
  {
    id: 'aromi',
    name: 'Aromi Brown',
    title: 'Aromi',
    label: 'BỘ SƯU TẬP AROMI · DIA 14.5MM NÂU MẬT ONG TRONG TRẺO',
    description: 'Sắc nâu mật ong tự nhiên ngọt ngào, viền chuyển màu êm dịu chuẩn phong cách Hàn Quốc, tôn vinh nét dịu dàng thanh thuần của đôi mắt.',
    image: `${A}02_lens_product.jpg`,
    count: '02',
  },
  {
    id: 'gina',
    name: 'Gina Series',
    title: 'Gina',
    label: 'BỘ SƯU TẬP GINA · DIA 14.3MM GIÃN VỪA THỜI THƯỢNG',
    description: 'Tone xám khói hiện đại và phong cách độc bản. Độ giãn vừa 14.3mm cực kỳ tự nhiên, định hình thần thái riêng biệt cho ánh nhìn của bạn.',
    image: `${A}04_lens_pack.jpg`,
    count: '03',
  },
];

const gallery = [
  { image: `${A}01_circle_model.jpg`, title: 'CIRCLE BLUE 14.5MM' },
  { image: `${A}02_lens_product.jpg`, title: 'AROMI BROWN 14.5MM' },
  { image: `${A}04_lens_pack.jpg`, title: 'GINA GRAY 14.3MM' },
  { image: `${A}03_circle_model_2.jpg`, title: 'CIRCLE DOLL 14.5MM' },
  { image: `${A}06_flower_model.jpg`, title: 'AROMI SWEET BROWN' },
  { image: `${A}07_eye_closeup.jpg`, title: 'CHI TIẾT VÂN LENS' },
];

const products = [
  { name: 'Circle Blue', note: 'DIA 14.5MM · XANH BIỂN GIÃN TO', image: `${A}01_circle_model.jpg` },
  { name: 'Aromi Brown', note: 'DIA 14.5MM · NÂU MẬT ONG BÚP BÊ', image: `${A}02_lens_product.jpg` },
  { name: 'Gina Gray', note: 'DIA 14.3MM · XÁM KHÓI CÁ TÍNH', image: `${A}04_lens_pack.jpg` },
  { name: 'Circle Ribbon Gray', note: 'DIA 14.5MM · ÁNH NHÌN LONG LANH', image: `${A}07_eye_closeup.jpg` },
  { name: 'Aromi Soft Brown', note: 'DIA 14.5MM · NÂU DỊU DÀNG THANH THUẦN', image: `${A}06_flower_model.jpg` },
  { name: 'Circle Classic', note: 'DIA 14.5MM · VIỀN ĐẬM KIÊU KỲ', image: `${A}03_circle_model_2.jpg` },
];

function Eyebrow({ children, light = false }) {
  return <div className={`eyebrow${light ? ' eyebrow-light' : ''}`}>{children}</div>;
}

function SectionHeading({ number, title, copy, light = false }) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <Eyebrow light={light}>{number} / {title.kicker}</Eyebrow>
        <h2>{title.heading}</h2>
      </div>
      <p>{copy}</p>
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['TRANG CHỦ', '#top'],
    ['GIỚI THIỆU', '#about'],
    ['BỘ SƯU TẬP', '#collection'],
    ['HÌNH ẢNH', '#gallery'],
    ['CỬA HÀNG', '#stores'],
    ['LIÊN HỆ', '#contact'],
  ];
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Doris Lens home">DORIS<span>CONTACT LENS</span></a>
      <nav className={open ? 'nav-links nav-open' : 'nav-links'}>
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-instagram" href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook Doris Contact Lens"><Globe size={16} /></a>
        <a className="nav-instagram" href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16} /></a>
      </nav>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Mở menu">{open ? <X /> : <Menu />}</button>
    </header>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.3]);

  return (
    <section className="hero cinematic-section" id="top" ref={heroRef}>
      <motion.div className="hero-panel hero-left" style={{ scale, opacity }}>
        <motion.img
          src={`${A}01_circle_model.jpg`}
          alt="Người mẫu bộ sưu tập Doris Lens Circle"
          style={{ y: yLeft }}
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow light>ÁNH NHÌN CỦA BẠN · PHONG CÁCH CỦA BẠN</Eyebrow>
          <h1>DORIS<span>CONTACT LENS</span></h1>
          <p>Tự tin tỏa sáng với phong cách riêng biệt. Một chút sắc màu, trọn vẹn sự tự tin, mở ra một thần thái hoàn toàn mới.</p>
          <a className="button button-light" href="#collection">KHÁM PHÁ BỘ SƯU TẬP <ArrowUpRight size={14} /></a>
        </motion.div>
      </motion.div>

      <motion.div className="hero-panel hero-right" style={{ scale, opacity }}>
        <motion.img
          src={`${A}07_eye_closeup.jpg`}
          alt="Cận cảnh mắt đeo lens Doris cao cấp"
          style={{ y: yRight }}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="hero-right-copy"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>Đôi mắt kể<br /><i>câu chuyện bạn.</i></h2>
          <p>TỎA SÁNG VẺ ĐẸP RIÊNG</p>
        </motion.div>
      </motion.div>
      <a href="#about" className="scroll-cue">CUỘN ĐỂ KHÁM PHÁ <ArrowDown size={13} /></a>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.section
      className="about section-pad cinematic-section"
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionHeading
        number="01"
        title={{ kicker: 'THẾ GIỚI CỦA CHÚNG TÔI', heading: <>Cảm nhận vẻ đẹp<br /><i>rất khác biệt.</i></> }}
        copy={<>Không chỉ là một màu sắc.<br />Mà là nét biểu đạt riêng của chính bạn.</>}
      />
      <div className="about-grid">
        <motion.div
          className="about-image"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={`${A}06_flower_model.jpg`}
            alt="Người mẫu bộ sưu tập Flower"
            style={{ y: imgY, scale: 1.08 }}
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.8 }}
          />
          <span className="image-caption">MỘT CHÚT TINH TẾ · MỘT ÁNH NHÌN MỚI</span>
        </motion.div>
        <motion.div
          className="about-copy"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow>TRẢI NGHIỆM DORIS LENS</Eyebrow>
          <blockquote>“Đôi mắt của bạn, thần thái của bạn, vẻ đẹp độc bản của chính bạn.”</blockquote>
          <p>Khám phá thế giới DORIS.LENS qua những dải màu êm dịu và thời thượng. Từ ánh nhìn tự nhiên trong trẻo đến sắc thái sắc sảo quyến rũ, tìm kiếm mẫu lens sinh ra là để dành cho bạn.</p>
          <a className="text-link" href={instagram} target="_blank" rel="noreferrer">KHÁM PHÁ THÊM <ArrowUpRight size={15} /></a>
        </motion.div>
      </div>
    </motion.section>
  );
}

function SignatureShade() {
  const [active, setActive] = useState(0);
  const current = collections[active];
  const change = (step) => setActive((active + step + collections.length) % collections.length);

  return (
    <motion.section
      className="signature section-pad cinematic-section"
      id="signature"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionHeading
        number="02"
        title={{ kicker: 'CHỌN SẮC MÀU CỦA BẠN', heading: <>Tìm sắc lens<br /><i>dấu ấn riêng.</i></> }}
        copy={<>Một chi tiết nhỏ.<br />Làm bừng sáng cả diện mạo.</>}
      />
      <motion.div
        className="selector-shell"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="selector-visual">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.image}
              src={current.image}
              alt={`Bộ sưu tập ${current.name}`}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
          <div className="visual-caption">DORIS.LENS — BỘ SƯU TẬP {current.name.toUpperCase()}</div>
          <div className="visual-index">{current.count}<span> / 03</span></div>
        </div>
        <div className="selector-info">
          <Eyebrow>BỘ SƯU TẬP ĐẶC TRƯNG · 0{active + 1}</Eyebrow>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              className="shade-copy"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
            >
              <h3>{current.name}<br /><i>Collection.</i></h3>
              <p>{current.description}</p>
            </motion.div>
          </AnimatePresence>
          <div className="swatch-title">CHỌN BỘ SƯU TẬP</div>
          <div className="swatches" role="group" aria-label="Chọn bộ sưu tập">
            {collections.map((item, index) => (
              <button
                key={item.id || item.name}
                className={`swatch ${active === index ? 'active' : ''}`}
                onClick={() => setActive(index)}
                aria-label={`Bộ sưu tập ${item.name}`}
                aria-pressed={active === index}
              >
                <span className={`swatch-color swatch-${item.id || item.name.toLowerCase()}`} />
              </button>
            ))}
          </div>
          <div className="swatch-label">{current.label}</div>
          <a className="button button-dark" href={instagram} target="_blank" rel="noreferrer">XEM TRÊN INSTAGRAM <ArrowUpRight size={14} /></a>
          <div className="selector-controls">
            <span>CHỌN THẦN THÁI CỦA BẠN</span>
            <div>
              <button onClick={() => change(-1)} aria-label="Bộ sưu tập trước"><ArrowLeft /></button>
              <button onClick={() => change(1)} aria-label="Bộ sưu tập sau"><ArrowRight /></button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function ProductRail() {
  const rail = useRef(null);
  const scroll = (direction) => rail.current?.scrollBy({ left: direction * 340, behavior: 'smooth' });

  return (
    <motion.section
      className="collection section-pad cinematic-section"
      id="collection"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionHeading
        number="03"
        title={{ kicker: 'SẢN PHẨM NỔI BẬT', heading: <>Khám phá các<br /><i>mẫu lens mới.</i></> }}
        copy={<>Vuốt để xem thêm<br />nhiều phong cách từ DORIS.</>}
      />
      <div className="product-rail" ref={rail}>
        {products.map((product, index) => (
          <motion.article
            className="product-card"
            key={product.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href={instagram} target="_blank" rel="noreferrer" className="product-image">
              <img src={product.image} alt={`Hình ảnh ${product.name} Doris Lens`} loading="lazy" />
              <span className="product-index">0{index + 1} / DORIS LENS</span>
              <span className="product-arrow"><ArrowUpRight /></span>
            </a>
            <h3>{product.name}</h3><p>{product.note}</p>
          </motion.article>
        ))}
      </div>
      <div className="rail-controls">
        <span>KÉO / VUỐT ĐỂ XEM THÊM</span>
        <div>
          <button onClick={() => scroll(-1)} aria-label="Cuộn sang trái"><ArrowLeft /></button>
          <button onClick={() => scroll(1)} aria-label="Cuộn sang phải"><ArrowRight /></button>
        </div>
      </div>
    </motion.section>
  );
}

function Campaign() {
  const campRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: campRef, offset: ["start end", "end start"] });
  const campScale = useTransform(scrollYProgress, [0, 1], [1.14, 1.0]);
  const campY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.section
      className="campaign cinematic-section"
      ref={campRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2 }}
    >
      <motion.img
        src={`${A}03_circle_model_2.jpg`}
        alt="Chiến dịch Doris Lens"
        loading="lazy"
        style={{ scale: campScale, y: campY }}
      />
      <div className="campaign-overlay" />
      <motion.div
        className="campaign-copy"
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eyebrow light>CẢM HỨNG TỰ DO THỂ HIỆN CHÍNH MÌNH</Eyebrow>
        <h2>Tô điểm<br /><i>ánh nhìn riêng.</i></h2>
        <a href={instagram} target="_blank" rel="noreferrer">KHÁM PHÁ DORIS <ArrowUpRight size={14} /></a>
      </motion.div>
    </motion.section>
  );
}

function Gallery({ onOpen }) {
  const items = [
    { image: `${A}01_circle_model.jpg`, title: 'CIRCLE BLUE 14.5MM', className: 'mood-one' },
    { image: `${A}02_lens_product.jpg`, title: 'AROMI BROWN 14.5MM', className: 'mood-two' },
    { image: `${A}04_lens_pack.jpg`, title: 'GINA GRAY 14.3MM', className: 'mood-three' },
    { image: `${A}06_flower_model.jpg`, title: 'AROMI BÚP BÊ NỮ TÍNH', className: 'mood-four' },
    { image: `${A}03_circle_model_2.jpg`, title: 'CIRCLE DOLL LONG LANH', className: 'mood-five' },
  ];
  return (
    <motion.section
      className="moodboard section-pad cinematic-section"
      id="gallery"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionHeading
        number="04"
        title={{ kicker: 'THẾ GIỚI DORIS.LENS', heading: <>Ánh nhìn nói thay<br /><i>tâm hồn bạn.</i></> }}
        copy={<>Bộ ảnh độc quyền từ<br />bộ sưu tập DORIS.LENS.</>}
      />
      <div className="mood-grid">
        {items.map((item, idx) => (
          <motion.button
            key={item.title}
            className={`mood-tile ${item.className}`}
            onClick={() => onOpen(item.image, item.title)}
            aria-label={`Xem ${item.title}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={item.image} alt={item.title} loading="lazy" />
            <span>{item.title}</span>
          </motion.button>
        ))}
        <div className="mood-quote"><Sparkles size={18} /><p>“Đôi mắt bạn.<br />Câu chuyện bạn.<br /><i>DORIS của riêng bạn.”</i></p></div>
      </div>
    </motion.section>
  );
}

function Stores() {
  const stores = [
    {
      number: '01',
      area: 'GÒ VẤP · TP. HỒ CHÍ MINH',
      name: 'Chi Nhánh Quang Trung',
      description: 'Quang Trung, P. 10, Q. Gò Vấp\nTP. Hồ Chí Minh, Việt Nam',
      query: 'Doris Contact Lens Quang Trung Go Vap'
    },
    {
      number: '02',
      area: 'TÂN PHÚ · TP. HỒ CHÍ MINH',
      name: 'Chi Nhánh Celadon',
      description: 'Celadon City, Q. Tân Phú\nTP. Hồ Chí Minh, Việt Nam',
      query: 'Doris Contact Lens Celadon Tan Phu'
    },
  ];
  return (
    <motion.section
      className="stores section-pad cinematic-section"
      id="stores"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionHeading
        number="05"
        title={{ kicker: 'HỆ THỐNG CỬA HÀNG', heading: <>Ghé thăm<br /><i>cửa hàng DORIS.</i></> }}
        copy={<>Trải nghiệm trực tiếp và nhận tư vấn độ cận.<br />Chúng tôi luôn hân hạnh được đón tiếp bạn.</>}
        light
      />
      <div className="store-grid">
        {stores.map((store, idx) => (
          <motion.article
            className="store-card"
            key={store.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
          >
            <span className="store-number">{store.number}</span>
            <Eyebrow light>{store.area}</Eyebrow>
            <h3>{store.name}</h3>
            <p>{store.description.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</p>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.query)}`} target="_blank" rel="noreferrer">XEM VỊ TRÍ <ArrowUpRight size={14} /></a>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <>
      <motion.section
        className="contact cinematic-section"
        id="contact"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eyebrow>KẾT NỐI VỚI CHÚNG TÔI</Eyebrow>
        <h2>Hẹn sớm gặp <i>bạn.</i></h2>
        <p>Bạn cần tư vấn độ cận hay chọn màu lens phù hợp? Đội ngũ DORIS luôn sẵn sàng hỗ trợ.</p>
        <a className="phone-link" href={`tel:${phone}`}><Phone size={17} /> 0370 519 875</a>
        <div className="contact-actions">
          <a className="button button-dark" href={`tel:${phone}`}>GỌI NGAY CHO DORIS <ArrowUpRight size={14} /></a>
          <a className="button button-outline" href={facebook} target="_blank" rel="noreferrer"><Globe size={14} /> FACEBOOK</a>
          <a className="button button-outline" href={instagram} target="_blank" rel="noreferrer"><Instagram size={14} /> INSTAGRAM</a>
        </div>
      </motion.section>
      <footer className="footer">
        <Eyebrow light>TỎA SÁNG VẺ ĐẸP CỦA CHÍNH BẠN</Eyebrow>
        <div className="footer-logo">DORIS LENS<span>.</span></div>
        <div className="footer-grid">
          <div>
            <p>Một chút sắc màu. Trọn vẹn sự tự tin.<br />Vẻ đẹp độc bản của riêng bạn.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a className="social-link" href={facebook} target="_blank" rel="noreferrer"><Globe size={15} /> Doris Contact Lens Facebook</a>
              <a className="social-link" href={instagram} target="_blank" rel="noreferrer"><Instagram size={15} /> @DORIS.LENS Instagram</a>
            </div>
          </div>
          <div>
            <h4>KHÁM PHÁ</h4>
            <a href="#about">Về Doris Lens</a>
            <a href="#collection">Bộ sưu tập</a>
            <a href="#gallery">Hình ảnh</a>
          </div>
          <div>
            <h4>LIÊN HỆ & CỬA HÀNG</h4>
            <a href={`tel:${phone}`}>0370 519 875</a>
            <span>Quang Trung · Gò Vấp</span>
            <span>Celadon · Tân Phú</span>
          </div>
        </div>
        <div className="copyright">
          <span>© {new Date().getFullYear()} DORIS.LENS</span>
          <span>TỎA SÁNG VẺ ĐẸP RIÊNG</span>
          <a href="#top">VỀ ĐẦU TRANG ↑</a>
        </div>
      </footer>
    </>
  );
}

function Lightbox({ image, title, onClose }) {
  useEffect(() => {
    if (!image) return;
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [image, onClose]);
  return (
    <AnimatePresence>
      {image && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <button className="lightbox-close" onClick={onClose} aria-label="Đóng ảnh"><X /></button>
        <motion.img src={image} alt={title} initial={{ scale: .94 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} />
        <span>{title}</span>
      </motion.div>}
    </AnimatePresence>
  );
}

export default function App() {
  const [lightbox, setLightbox] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="cinematic-wrapper">
      <motion.div className="cinema-progress" style={{ scaleX }} />
      <div className="cinema-vignette" />
      <Header />
      <main>
        <Hero />
        <About />
        <SignatureShade />
        <ProductRail />
        <Campaign />
        <Gallery onOpen={(image, title) => setLightbox({ image, title })} />
        <Stores />
        <Footer />
      </main>
      <Lightbox image={lightbox?.image} title={lightbox?.title} onClose={() => setLightbox(null)} />
    </div>
  );
}
