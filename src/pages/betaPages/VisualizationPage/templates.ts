// 模板定义示例
export const templates = {
  corporate: {
    id: "corporate",
    name: "Corporate Overview",
    components: [
      { type: "header", position: "top", style: "gradient" },
      { type: "keyMetrics", position: "upperMiddle", style: "cards" },
      { type: "businessModel", position: "middle", style: "flowchart" },
      { type: "marketData", position: "lowerMiddle", style: "charts" },
      { type: "challenges", position: "bottom", style: "bulletPoints" },
      { type: "footer", position: "footer", style: "minimal" },
    ],
    colorScheme: ["#1a73e8", "#34a853", "#fbbc04", "#ea4335"],
    typography: {
      heading: "'Montserrat', sans-serif",
      body: "'Open Sans', sans-serif",
    },
    spacing: "compact",
  },

  modern: {
    id: "modern",
    name: "Modern Pitch Deck",
    components: [
      { type: "hero", position: "fullWidth", style: "bold" },
      { type: "companyInfo", position: "left", style: "sidebar" },
      { type: "keyMetrics", position: "right", style: "infographic" },
      { type: "marketPerformance", position: "bottom", style: "dashboard" },
      { type: "futureOutlook", position: "bottomRight", style: "roadmap" },
    ],
    colorScheme: ["#121212", "#BB86FC", "#03DAC6", "#CF6679"],
    typography: {
      heading: "'Poppins', sans-serif",
      body: "'Roboto', sans-serif",
    },
    spacing: "airy",
  },
};
