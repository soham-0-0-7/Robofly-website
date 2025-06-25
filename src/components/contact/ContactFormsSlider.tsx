"use client";

import React, { useState, useEffect } from "react";
import GeneralForm from './forms/GeneralForm';
import TrainingForm from './forms/TrainingForm';
import DroneProductForm from './forms/DroneProductForm';
import CareerForm from './forms/CareerForm';
import { colorPalette } from "@/utils/variables";
import { MessageCircle, GraduationCap, Users, ChevronRight, Plane } from "lucide-react";
// import { MessageCircle, GraduationCap, Plane, Users, ChevronRight,Drone } from "lucide-react";

const forms = [
  {
    label: "General Query",
    component: <GeneralForm />,
    icon: MessageCircle,
    description: "Ask us anything",
  },
  {
    label: "Training Request",
    component: <TrainingForm />,
    icon: GraduationCap,
    description: "Professional training",
  },
  {
    label: "Drone Product",
    component: <DroneProductForm />,
    icon: Plane,
    description: "Product inquiries",
  },
  {
    label: "Join Our Team",
    component: <CareerForm />,
    icon: Users,
    description: "Career opportunities",
  },
];

const ContactFormsSlider = () => {
  const [selected, setSelected] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // This ensures hydration is complete
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "10px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: colorPalette.green2,
            marginBottom: "8px",
            letterSpacing: "-0.5px",
          }}
        >
          Let us know your query
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: colorPalette.gray,
            margin: 0,
          }}
        >
          Choose the type of inquiry that best fits your needs
        </p>
      </div>

      {/* Slider Navigation */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "32px",
          padding: "8px",
          backgroundColor: colorPalette.green7,
          borderRadius: "16px",
          boxShadow: `0 2px 20px ${colorPalette.greenShadow}15`,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {forms.map((form, index) => {
          const IconComponent = form.icon;
          const isSelected = selected === index;
          const isHovered = hoveredIndex === index;

          return (
            <button
              key={index}
              onClick={() => setSelected(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 24px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                letterSpacing: "0.3px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                minWidth: "180px",
                backgroundColor: isSelected
                  ? colorPalette.green5
                  : isHovered
                  ? colorPalette.whiteMint
                  : colorPalette.white,
                color: isSelected
                  ? colorPalette.white
                  : isHovered
                  ? colorPalette.green2
                  : colorPalette.green2,
                boxShadow: isSelected
                  ? `0 8px 32px ${colorPalette.green5}40, 0 2px 8px ${colorPalette.green5}20`
                  : isHovered
                  ? `0 4px 16px ${colorPalette.greenShadow}20`
                  : `0 2px 8px ${colorPalette.greenShadow}10`,
                transform: isSelected
                  ? "translateY(-2px) scale(1.02)"
                  : isHovered
                  ? "translateY(-1px)"
                  : "translateY(0)",
              }}
            >
              {/* Background gradient effect */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: isSelected
                    ? `linear-gradient(135deg, ${colorPalette.green5} 0%, ${colorPalette.green3} 100%)`
                    : "transparent",
                  opacity: isSelected ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  zIndex: 0,
                }}
              />

              {/* Content */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: isSelected
                      ? `${colorPalette.white}20`
                      : isHovered
                      ? colorPalette.green7
                      : colorPalette.green7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <IconComponent
                    size={18}
                    style={{
                      color: isSelected
                        ? colorPalette.white
                        : colorPalette.green3,
                      transition: "color 0.3s ease",
                    }}
                  />
                </div>

                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "2px",
                    }}
                  >
                    {form.label}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      opacity: 0.8,
                      fontWeight: "400",
                    }}
                  >
                    {form.description}
                  </div>
                </div>

                {isSelected && (
                  <ChevronRight
                    size={16}
                    style={{
                      color: colorPalette.white,
                      marginLeft: "auto",
                    }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <div
        style={{
          background: colorPalette.white,
          borderRadius: "20px",
           padding: "0px", // minimal padding
            position: "relative",
            overflow: "visible", // allow contents to flow naturally
          // overflow: "hidden",
          minHeight: "400px",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "120px",
            height: "120px",
            background: `linear-gradient(135deg, ${colorPalette.green6}20, ${colorPalette.green4}20)`,
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "80px",
            height: "80px",
            background: `linear-gradient(135deg, ${colorPalette.green7}40, ${colorPalette.green6}20)`,
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        {/* Form content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {isHydrated && forms[selected].component}
        </div>
      </div>
    </div>
  );
};

export default ContactFormsSlider;
