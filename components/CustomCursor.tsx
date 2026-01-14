import React, { useEffect, useState, useCallback } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [trailingPosition, setTrailingPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });

  const updatePosition = useCallback((x: number, y: number) => {
    setPosition({ x, y });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-hover") ||
        target.getAttribute("role") === "button";
      setIsHoveringInteractive(isInteractive);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [updatePosition]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setTrailingPosition((prev) => {
        const easing = 0.15;
        const newX = prev.x + (position.x - prev.x) * easing;
        const newY = prev.y + (position.y - prev.y) * easing;
        return { x: newX, y: newY };
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [position]);

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{
          transform: `translate(${trailingPosition.x}px, ${trailingPosition.y}px)`,
        }}
      />
      <div
        className={`custom-cursor-ring ${
          isHoveringInteractive ? "interactive" : ""
        }`}
        style={{
          transform: `translate(${trailingPosition.x}px, ${trailingPosition.y}px)`,
        }}
      />
    </>
  );
};
