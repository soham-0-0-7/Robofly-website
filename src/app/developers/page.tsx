"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Linkedin, Github } from "lucide-react";
import { useState, useEffect } from "react";

const developers = [
  {
    name: "Soham Gandhi",
    image: "/images/soham.jpg",
    linkedin: "https://www.linkedin.com/in/soham-gandhi-57b856266/",
    role: "Full Stack Developer",
    github: "https://www.github.com/soham-0-0-7",
    mail: "sohamgandhi001@gmail.com",
    // specialty: "React & Node.js",
  },
  {
    name: "Jay Ashwin",
    image: "/images/jay.jpg",
    linkedin: "https://www.linkedin.com/in/jay-ashwin-9ab7952ba/",
    role: "Full Stack Developer",
    // specialty: "UI/UX Design",
    github: "https://www.github.com/jay-padalia",
    mail: "jay.padalia03@gmail.com",
  },
  {
    name: "Vyom Darji",
    image: "/images/vyom.jpg",
    linkedin:
      "https://www.linkedin.com/in/vyom-darji-14a5152a8/?originalSubdomain=in",
    role: "Full Stack Developer",
    github: "https://www.github.com/VyomDarji",
    mail: "vyom301004@gmail.com",
    // specialty: "API & Database",
  },
];

const FloatingElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-green-500/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

const GradientOrb = ({ className }: { className: string }) => (
  <div
    className={`absolute rounded-full opacity-15 blur-3xl animate-pulse ${className}`}
    style={{
      background: "linear-gradient(45deg, #22c55e, #16a34a, #15803d)",
      animationDuration: "4s",
    }}
  />
);

const Developers = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/40 relative overflow-hidden">
      {/* Animated Background Elements */}
      <ParticleBackground />

      {/* Gradient Orbs */}
      <GradientOrb className="w-96 h-96 -top-48 -left-48" />
      <GradientOrb className="w-80 h-80 -bottom-40 -right-40" />
      <GradientOrb className="w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-6 text-center">
          <FloatingElement delay={200}>
            <div className="inline-block">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent mb-6 leading-tight">
                OUR{" "}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent animate-pulse">
                  DEVELOPERS
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto rounded-full mb-8"></div>
            </div>
          </FloatingElement>

          <FloatingElement delay={400}>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              Meet the brilliant minds behind{" "}
              <span className="font-semibold text-green-600">
                Robofly Technology
              </span>
              .
              <br />
              Passionate innovators crafting the future, one line of code at a
              time.
            </p>
          </FloatingElement>
        </div>
      </section>

      {/* Developers Grid */}
      <section className="relative pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {developers.map((developer, index) => (
              <FloatingElement key={index} delay={600 + index * 200}>
                <div
                  className={`group relative bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 transition-all duration-500 ease-out cursor-pointer ${
                    hoveredCard === index
                      ? "transform scale-105 shadow-2xl bg-white/90"
                      : "hover:transform hover:scale-102 hover:shadow-2xl"
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                  {/* Profile Image Container */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="relative group/image">
                      <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-gradient-to-r from-green-500 to-emerald-500 shadow-xl transition-transform duration-500 group-hover:scale-110">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 p-1 rounded-full">
                          <div className="w-full h-full rounded-full overflow-hidden bg-white">
                            <Image
                              src={developer.image}
                              alt={developer.name}
                              fill
                              sizes="128px"
                              className="object-cover transition-transform duration-500 group-hover/image:scale-110"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Floating Ring Animation */}
                      <div
                        className="absolute inset-0 w-32 h-32 rounded-full border-2 border-green-400/30 animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ animationDuration: "8s" }}
                      ></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center relative z-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors duration-300">
                      {developer.name}
                    </h3>

                    <div className="mb-4">
                      <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-1">
                        {developer.role}
                      </p>
                      {/* <p className="text-gray-500 text-sm">
                        {developer.specialty}
                      </p> */}
                    </div>

                    {/* Email Text */}
                    {developer.mail && (
                      <div className="mb-2">
                        <p className="text-gray-500 text-xs">
                          {developer.mail}
                        </p>
                      </div>
                    )}

                    {/* Animated Divider */}
                    <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6 transform group-hover:w-24 transition-all duration-500 rounded-full"></div>

                    {/* LinkedIn Button */}
                    <Button
                      variant="outline"
                      className="w-full relative overflow-hidden border-2 border-green-500/20 text-gray-700 hover:text-white hover:border-green-500 transition-all duration-500 rounded-xl group/button bg-white/50 backdrop-blur-sm"
                      onClick={() => window.open(developer.linkedin, "_blank")}
                    >
                      {/* Button Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-500 ease-out"></div>

                      <div className="relative flex items-center justify-center gap-2">
                        <Linkedin className="w-5 h-5 transition-transform duration-300 group-hover/button:scale-110" />
                        <span className="font-semibold">
                          Connect on LinkedIn
                        </span>
                      </div>
                    </Button>
                    {/* Additional Social Links */}
                    <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {/* GitHub Button */}
                      {developer.github && (
                        <a
                          href={developer.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-800 hover:text-white transition-all duration-300 cursor-pointer"
                          aria-label={`GitHub profile of ${developer.name}`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Developers;
