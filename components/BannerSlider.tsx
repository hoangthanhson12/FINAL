"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface BannerSlide {
  id: number
  title: string
  subtitle: string
  buttonText: string
  gradient: string
  image: string
}

interface BannerSliderProps {
  slides: BannerSlide[]
}

export default function BannerSlider({ slides }: BannerSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="mb-6 relative">
      <div className="relative overflow-hidden rounded-lg h-64">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
          >
            <div
              className={`bg-gradient-to-r ${slide.gradient} h-full p-8 text-white flex flex-row justify-between items-center`}
            >
              <div>
                <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg mb-4">{slide.subtitle}</p>
                <div>
                  <Button size="lg" variant="secondary">
                    {slide.buttonText}
                  </Button>
                </div>
              </div>
              <div className="">
                <img
                  src={slide.image || "/img/banner-default.png"}
                  alt={slide.title}
                  className="max-h-1 md:max-h-56 rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors opacity-55 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors opacity-55 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
