import React, { useState, useRef } from "react";

export default function App() {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [rgb, setRgb] = useState("rgb(255,255,255)");
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [colorHistory, setColorHistory] = useState([]);

  const randomColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFE66D",
    "#6C63FF",
    "#FF9F1C",
    "#2EC4B6",
    "#E71D36",
    "#8338EC",
    "#3A86FF",
    "#06D6A0",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      imageRef.current = img;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
    };
  };

  const pickColor = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();

    const x = Math.floor(
      ((e.clientX - rect.left) * canvas.width) / rect.width
    );

    const y = Math.floor(
      ((e.clientY - rect.top) * canvas.height) / rect.height
    );

    const pixel = ctx.getImageData(x, y, 1, 1).data;

    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    const hex =
      "#" +
      [r, g, b]
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("");

    setSelectedColor(hex);
    setRgb(`rgb(${r}, ${g}, ${b})`);

    setColorHistory((prev) => {
      const updated = [hex, ...prev];
      return [...new Set(updated)].slice(0, 8);
    });
  };

  const trackMouse = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const x = Math.floor(
      ((e.clientX - rect.left) * canvas.width) / rect.width
    );

    const y = Math.floor(
      ((e.clientY - rect.top) * canvas.height) / rect.height
    );

    setCoordinates({ x, y });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🎨 Image Color Picker Studio</h1>
        <p style={styles.subtitle}>
          Upload an image and click anywhere to extract colors.
        </p>

        <label style={styles.uploadBtn}>
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>

        <div style={styles.canvasWrapper}>
          <canvas
            ref={canvasRef}
            onClick={pickColor}
            onMouseMove={trackMouse}
            style={styles.canvas}
          />
        </div>

        <div style={styles.infoGrid}>
          <div style={styles.card}>
            <h3>Selected Color</h3>
            <div
              style={{
                ...styles.colorPreview,
                background: selectedColor,
              }}
            />
            <p>
              <strong>HEX:</strong> {selectedColor}
            </p>
            <p>
              <strong>RGB:</strong> {rgb}
            </p>
          </div>

          <div style={styles.card}>
            <h3>Mouse Position</h3>
            <h2>
              X: {coordinates.x}
              <br />
              Y: {coordinates.y}
            </h2>
          </div>
        </div>

        <div style={styles.section}>
          <h2>Recent Picked Colors</h2>

          <div style={styles.historyContainer}>
            {colorHistory.length > 0 ? (
              colorHistory.map((color, index) => (
                <div key={index} style={styles.historyItem}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: color,
                      borderRadius: "12px",
                    }}
                  />
                  <span>{color}</span>
                </div>
              ))
            ) : (
              <p>No colors selected yet.</p>
            )}
          </div>
        </div>

        <div style={styles.section}>
          <h2>Creative Palette Inspiration</h2>

          <div style={styles.paletteGrid}>
            {randomColors.map((color, index) => (
              <div
                key={index}
                style={{
                  ...styles.paletteCard,
                  background: color,
                }}
              >
                {color}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f172a,#1e293b,#312e81,#7c3aed)",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "1100px",
    margin: "auto",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    borderRadius: "25px",
    padding: "30px",
    color: "white",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
  },

  title: {
    textAlign: "center",
    fontSize: "40px",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    opacity: 0.9,
    marginBottom: "25px",
  },

  uploadBtn: {
    display: "block",
    width: "220px",
    margin: "0 auto 25px",
    textAlign: "center",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
    background: "linear-gradient(45deg,#06b6d4,#8b5cf6)",
    fontWeight: "bold",
  },

  canvasWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "25px",
  },

  canvas: {
    maxWidth: "100%",
    borderRadius: "15px",
    border: "4px solid white",
    cursor: "crosshair",
    background: "#fff",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "rgba(255,255,255,0.15)",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
  },

  colorPreview: {
    width: "120px",
    height: "120px",
    margin: "15px auto",
    borderRadius: "15px",
    border: "4px solid white",
  },

  section: {
    marginTop: "30px",
  },

  historyContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    marginTop: "15px",
  },

  historyItem: {
    textAlign: "center",
  },

  paletteGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
    gap: "15px",
    marginTop: "15px",
  },

  paletteCard: {
    height: "100px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
  },
};
