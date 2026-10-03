import { useEffect } from "react";
import "./PortfolioLightbox.css";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PortfolioLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;

        case "ArrowRight":
          onNext();
          break;

        case "ArrowLeft":
          onPrev();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button
        className="lightbox-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <FaTimes />
      </button>

      <button
        className="lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        <FaChevronLeft />
      </button>

      <img
        className="lightbox-image"
        src={images[currentIndex]}
        alt=""
        onClick={(e) => e.stopPropagation()}
      />
      <div className="lightbox-counter">
        {currentIndex + 1} / {images.length}
      </div>

      <button
        className="lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
