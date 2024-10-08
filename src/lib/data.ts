import { Category } from "@prisma/client";

type productType = {
  name: string;
  category: Category;
  price: number;
  description: string;
  thumbnail: string;
  stock: number;
  brand: string;
  isFeatured: boolean;
};
const products: productType[] = [
  {
    name: "safety work helmet",
    price: 10.0,
    stock: 30,
    brand: "allon",
    thumbnail:
      "https://res.cloudinary.com/dupzzryrz/image/upload/w_1000,ar_1:1,c_fill/v1726025044/helmet1_t8kgis.jpg",
    category: "safetygears",
    description:
      "This durable blue safety helmet is designed for maximum protection in industrial, construction, and engineering environments. Featuring a robust outer shell made from high-density polyethylene, it offers excellent impact resistance, safeguarding the wearer from falling objects and other potential hazards. The helmet’s interior is lined with soft, sweat-absorbent padding for comfort during extended wear. With an adjustable suspension system, it fits securely on various head sizes, ensuring both comfort and safety. The bright blue color enhances visibility, making it ideal for high-traffic worksites.",
    isFeatured: false,
  },
  {
    name: "smart adhesive tape",
    thumbnail:
      "https://res.cloudinary.com/dupzzryrz/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1726022905/tape1_ppajjt.jpg",
    stock: 30,
    brand: "smart",
    price: 8.0,
    description:
      "Smart adhesive tape revolutionizes the way we think about everyday solutions with its advanced functionality and versatility. This innovative tape combines a high-performance adhesive with intelligent design, making it an essential tool for various applications. Its superior adhesion ensures a secure hold on a wide range of surfaces, while its sleek and durable construction allows for easy handling and application. Whether for home use, office organization, or industrial purposes, smart adhesive tape offers an elegant and practical solution to your adhesive needs, seamlessly integrating into your daily routine with ease.",
    isFeatured: false,
    category: "electrical",
  },
  {
    name: "wire stripper knipex",
    thumbnail:
      "https://res.cloudinary.com/dupzzryrz/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1726576370/wire-stripper-pliers1-snipex_lqgaz8.jpg",
    brand: "knipex",
    price: 25.55,
    category: "electrical",
    isFeatured: false,
    stock: 20,
    description:
      "The Knipex wire stripper is a premium tool designed for precision, durability, and ease of use. Engineered for both professionals and DIY enthusiasts, this wire stripper delivers accurate, clean stripping of various wire types and sizes, ensuring a smooth and efficient workflow. Its ergonomic design provides a comfortable grip, reducing hand fatigue during prolonged use, while the high-quality construction guarantees long-lasting performance. Whether you're working on electrical installations or detailed wiring projects, the Knipex wire stripper is a reliable tool that combines functionality with exceptional craftsmanship.",
  },
  {
    name: "multimeter",
    brand: "fluke",
    category: "electrical",
    stock: 20,
    price: 40.88,
    thumbnail:
      "https://res.cloudinary.com/dupzzryrz/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1726578814/fluke-multimeter_yruxdj.jpg",
    description:
      "The multimeter is a versatile and essential tool for electricians, technicians, and DIY hobbyists alike. Designed to measure voltage, current, and resistance with precision, it is ideal for diagnosing electrical issues, testing circuits, and troubleshooting various electronic components. With its easy-to-read display and intuitive interface, the multimeter simplifies complex electrical measurements, offering reliable and accurate results every time. Built for durability and safety, this tool is perfect for both professional and home use, making it a valuable addition to any toolkit for handling electrical tasks with confidence.",
    isFeatured: false,
  },
  {
    name: "circuit breaker monatlich breaker power breaker",
    thumbnail:
      "https://res.cloudinary.com/dupzzryrz/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1726579543/circuit-breaker1-monalich_dourom.jpg",
    brand: "monatlich",
    description:
      "The Monatlich Circuit Breaker is a dependable and high-performance solution for safeguarding your electrical systems. Engineered with precision and durability, it provides reliable protection by automatically interrupting electrical flow in the event of an overload or short circuit, preventing potential damage and ensuring safety. Designed for both residential and commercial use, the Monatlich Circuit Breaker features a compact design and easy installation, making it an ideal choice for electricians and homeowners alike. With its advanced functionality and robust construction, this circuit breaker delivers long-lasting performance you can trust for all your electrical protection needs.",
    category: "electrical",
    price: 15.0,
    stock: 50,
    isFeatured: false,
  },
  {
    name: "bright flashlight olight seeker 2 pro",
    brand: "olight",
    category: "electrical",
    price: 20.82,
    stock: 30,
    thumbnail:
      "https://res.cloudinary.com/dupzzryrz/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1726580442/amir-shamsipur-ksCDERQJRhA-unsplash_lfough.jpg",
    description:
      "The Bright Flashlight Olight Seeker 2 Pro is a high-performance lighting tool designed to provide powerful illumination in any environment. With its compact yet durable construction, this flashlight delivers an impressive beam that cuts through the darkest conditions, making it ideal for outdoor adventures, emergency situations, or professional use. Equipped with advanced features like multiple brightness settings and a user-friendly interface, the Olight Seeker 2 Pro ensures maximum visibility and convenience. Its ergonomic design offers a comfortable grip, while its rechargeable battery provides long-lasting power, making the Bright Flashlight Olight Seeker 2 Pro the perfect companion for those who need reliable light at their fingertips.",
    isFeatured: false,
  },
  {
    name: "soldermaster pro 5000 soldering iron",
    thumbnail:
      "https://res.cloudinary.com/dupzzryrz/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1726580673/soldering-iron-1038540_1920_hii8eg.jpg",
    stock: 10,
    brand: "fluke",
    price: 40.88,
    category: "electrical",
    description:
      "The SolderMaster Pro 5000 is a cutting-edge soldering tool designed for precision and efficiency in both professional and hobbyist applications. With its fast heating capability and adjustable temperature control, the SolderMaster Pro 5000 delivers consistent, high-quality soldering results for delicate electronics, circuit boards, and small metal components. Its ergonomic, heat-resistant handle ensures comfort during extended use, while the lightweight design offers superior control for intricate tasks. Whether you're a seasoned technician or a DIY enthusiast, the SolderMaster Pro 5000 is the ideal tool to elevate your soldering projects with reliability and ease.",
    isFeatured: false,
  },
  {
    name: "Stramm PowerPro Bit Drill",
    thumbnail:
      "https://res.cloudinary.com/dupzzryrz/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1726581631/bit-drill-stramm_ldqfze.jpg",
    stock: 10,
    brand: "stramm",
    price: 25.99,
    category: "powertools",
    description:
      "The Stramm PowerPro Bit Drill is a high-performance tool engineered for precision and durability in drilling tasks. Designed for both professionals and home enthusiasts, the PowerPro effortlessly handles a wide range of materials, from wood and plastic to metal. Its superior build quality ensures a longer lifespan, while the sharp, sturdy drill bits provide clean and accurate holes with minimal effort. Whether you're working on construction projects, furniture assembly, or DIY repairs, the Stramm PowerPro Bit Drill delivers reliable performance, making it an essential addition to any toolbox.",
    isFeatured: false,
  },
  {
    name: "ApexPro Allen Key Wrench",
    thumbnail:
      "https://res.cloudinary.com/dupzzryrz/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1726582203/allen-key_r5agg6.jpg",
    description:
      "The ApexPro Allen Key Wrench is a robust and reliable tool designed for precision and ease of use. Crafted from high-grade steel, this wrench offers exceptional strength and durability, ensuring it can withstand the rigors of frequent use. Its ergonomic handle provides a comfortable grip, allowing for effortless turning and reducing hand fatigue during extended tasks. Perfect for assembling furniture, working on machinery, or handling various repair projects, the ApexPro Allen Key Wrench delivers the accuracy and performance needed to get the job done efficiently and effectively.",
    brand: "AlexPro",
    price: 5.35,
    stock: 30,
    category: "handtools",
    isFeatured: false,
  },
  {
    name: "Leystan MaxMeasure Tape",
    brand: "leystan",
    category: "handtools",
    price: 20.5,
    thumbnail:
      "https://res.cloudinary.com/dupzzryrz/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1726583210/tape-measure_leystan_rg1yta.jpg",
    stock: 25,
    description:
      "The Leystan MaxMeasure Tape is an essential tool for professionals and DIY enthusiasts alike. Offering precision and durability, this tape measure features a retractable steel blade that ensures long-lasting accuracy, while its compact design allows for easy portability. Whether you're measuring materials for construction, woodworking, or interior design, the MaxMeasure tape provides clear and easy-to-read markings, ensuring accurate measurements every time. With its sturdy housing and reliable locking mechanism, the Leystan MaxMeasure Tape is a must-have for anyone needing a dependable measuring tool.",
    isFeatured: false,
  },
  {
    name: "VoltGuard Insulated Electrical Gloves",
    price: 7,
    stock: 20,
    description:
      "VoltGuard Insulated Electrical Gloves are designed to offer superior protection while working with live electrical systems. Crafted from high-quality latex rubber, these gloves provide excellent insulation against electric shock, making them essential for electricians, technicians, and maintenance personnel. With an ergonomic design for comfort and dexterity, they allow for precise handling of tools and wires, ensuring both safety and efficiency. VoltGuard gloves meet international safety standards and are rigorously tested for durability, offering reliable performance even in the most demanding environments. Whether working in construction, utility maintenance, or any electrical field, these gloves are a must-have for safety-conscious professionals.",
    brand: "SafeHands",
    category: "safetygears",
    thumbnail:
      "https://res.cloudinary.com/dupzzryrz/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1726641017/Electrical_Gloves1_xkaodu.jpg",
    isFeatured: false,
  },
  {
    name: "NetMaster Pro Tester",
    brand: "TechLink Solutions",
    description:
      "The NetMaster Pro Tester is an advanced network cable testing tool designed for professionals. It features high-speed detection, pinpoint diagnostics, and intuitive LED indicators for immediate feedback. Whether you're working with Ethernet, coaxial, or fiber optic cables, the NetMaster Pro ensures flawless connectivity every time. Built with durability in mind, it’s the perfect tool for maintaining and troubleshooting complex network systems.",
    thumbnail:
      "https://res.cloudinary.com/dupzzryrz/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1726676231/tester1_wsblep.jpg",
    category: "electrical",
    price: 14.5,
    stock: 10,
    isFeatured: false,
  },
];
