export type Product = {
  id: number;
  slug: string;
  title: string;
  logos: string[];
  description: string;
  productImage: string;
  packageIncludes: string[];
  software: string;
  sketchfabUrl: string;
  keyFeatures?: string[];  // Add this
};

export const products: Product[] = [
  {
    id: 1,
    slug: "faro-orbis",
    title: "FARO® Orbis™",
    logos: ["sphere-xg.jpg"],
    description:
      "FARO Orbis 2 in 1 Mobile Laser Scanner and stationery scanner all in one device. A unique mobile scanning solution created to optimize workflows and elevate productivity. scan while moving with 6 mm accuracy and you can stop for 15 seconds to scan a station with accuracy 2 mm, Designed for construction, engineering and surveying professionals, Orbis delivers rapid speed of capture, while returning highly accurate 3D visual representations of the real world thru 360 camera for point cloud colorization.",
    productImage: "/images/product-3.png",
    packageIncludes: [
      "Scanner",
      "Rechargeable Battery",
      "Charging Dock",
      "Protective Carry Case",
    ],
    software: "FARO Sphere® XG",
    sketchfabUrl:
      "https://sketchfab.com/models/282954bbc43c416fac30eb458a6afd0e/embed",
    keyFeatures: [
      "Lightweight and Easy-to-Use",
      "Engineered for the Toughest Environments",
    ],
  },
  {
    id: 2,
    slug: "faro-focus",
    title: "FARO® Focus",
    logos: ["scene.png"],
    description:
      "Your tool to capture, view and understand the world around you. Great for indoor and outdoor use, including spaces where features are positioned further apart. Lightweight and rugged, simple to use, fast to capture and easy to process giving you the most accurate information you need to make the most important decisions.",
    productImage: "/images/product-4.png",
    packageIncludes: [
      "Scanner",
      "Rechargeable Battery",
      "Charging Dock",
      "Protective Carry Case",
    ],
    software: "FARO® SCENE Software",
    sketchfabUrl:
      "https://sketchfab.com/models/282954bbc43c416fac30eb458a6afd0e/embed",
    keyFeatures: [
      "high-speed SSD data storage",
      "Withstand the harshest environments daily",
    ],
  },
  {
    id: 3,
    slug: "faro-blink",
    title: "FARO® Blink™",
    logos: ["sphere-xg.jpg"],
    description:
      "From site to insights, Blink is a reality capture solution designed for simplicity and accessibility. It brings high-quality visualization and automated workflows into the hands of designers, builders, surveyors, operators, and public safety professionals, helping teams capture, view, and share data seamlessly, regardless of expertise. With Blink, anyone can take control of reality capture on-site and move projects to final delivery efficiently.",
    productImage: "/images/product-5.png",
    packageIncludes: [
      "Scanner",
      "Rechargeable Battery",
      "Charging Dock",
      "Protective Carry Case",
    ],
    software: "FARO Sphere® XG",
    sketchfabUrl:
      "https://sketchfab.com/models/282954bbc43c416fac30eb458a6afd0e/embed",
    keyFeatures: [
      "Guided Scanning with Real-Time Feedback",
      "Automatic Point Cloud Processing",
    ],
  },
];