"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface BannerSliderProps {
  images: string[];
}

export default function BannerSlider({ images }: BannerSliderProps) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive: số ảnh mỗi slide
  const [imagesPerSlide, setImagesPerSlide] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setImagesPerSlide(1);
      } else {
        setImagesPerSlide(2);
      }
    };
    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(images.length / imagesPerSlide);

  // Auto-play slider, reset timer on manual change
  useEffect(() => {
    if (totalSlides <= 1) return;
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, totalSlides]);

  const prev = () => setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev + 1) % totalSlides);
  const goTo = (idx: number) => setCurrent(idx);

  // Lấy ảnh cho slide hiện tại
  const startIdx = current * imagesPerSlide;
  const slideImages = images.slice(startIdx, startIdx + imagesPerSlide);

  return (
    <div className="mb-6 relative">
      <div className="relative overflow-hidden rounded-lg h-64 flex items-center justify-center bg-gray-100">
        <div className="flex w-full h-full items-center justify-center gap-1.5">
          {slideImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Banner ${startIdx + idx + 1}`}
              className="w-full md:w-1/2 h-full rounded-lg transition-all duration-700 bg-white"
              style={{ maxHeight: "100%" }}
            />
          ))}
        </div>
        {totalSlides > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 transition-colors shadow cursor-pointer z-20"
              type="button"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 transition-colors shadow cursor-pointer z-20"
              type="button"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}
        {/* Đã loại bỏ dấu chấm tròn chuyển ảnh ở dưới */}
      </div>
    </div>
  );
}
