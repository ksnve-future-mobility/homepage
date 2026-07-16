"use client";

import { useEffect, useState } from "react";

type HeroSlide = {
  src: string;
  alt?: string;
  showText?: boolean;
  textLines?: string[];
};

type HomeHeroCarouselProps = {
  slides: HeroSlide[];
};

export default function HomeHeroCarousel({ slides }: HomeHeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex];
  const canNavigate = totalSlides > 1;

  const goToPrevious = () => {
    if (!canNavigate) {
      return;
    }

    setCurrentIndex((index) => (index - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    if (!canNavigate) {
      return;
    }

    setCurrentIndex((index) => (index + 1) % totalSlides);
  };

  useEffect(() => {
    if (paused || totalSlides < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % totalSlides);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused, totalSlides]);

  return (
    <section className="visual-panel image-panel hero-carousel" aria-labelledby="hero-title">
      <div className="hero-slides" aria-hidden="true">
        {slides.map((slide, index) => (
          <img
            className={index === currentIndex ? "active" : ""}
            src={slide.src}
            alt={slide.alt || ""}
            key={slide.src}
          />
        ))}
      </div>
      {currentSlide?.showText ? (
        <div className="hero-text">
          <h1 id="hero-title">
            <span className="hero-title-line hero-title-top">
              <span>Connecting</span> <em>Technology,</em>
            </span>
            <span className="hero-title-line hero-title-bottom">People and Mobility</span>
          </h1>
          <p>Engineering the Future Mobility Experience</p>
          <span aria-hidden="true" />
          <small>Future Mobility Division</small>
        </div>
      ) : currentSlide?.textLines?.length ? (
        <div className="hero-text hero-text-event">
          <h1 id="hero-title">
            {currentSlide.textLines.map((line) => (
              <span className="hero-title-line" key={line}>{line}</span>
            ))}
          </h1>
        </div>
      ) : (
        <h1 id="hero-title" className="sr-only">미래모빌리티 부문회 사진 슬라이드</h1>
      )}
      <div className="hero-carousel-status" aria-label={`슬라이드 ${currentIndex + 1} / ${totalSlides}`}>
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="이전 사진 보기"
          disabled={!canNavigate}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "슬라이드 재생" : "슬라이드 일시정지"}
        >
          {paused ? "▶" : "Ⅱ"}
        </button>
        <span>
          {currentIndex + 1} / {totalSlides}
        </span>
        <button
          type="button"
          onClick={goToNext}
          aria-label="다음 사진 보기"
          disabled={!canNavigate}
        >
          ›
        </button>
      </div>
    </section>
  );
}
