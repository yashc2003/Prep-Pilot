import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;
    const update = () => setReduced(Boolean(media.matches));
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  return reduced;
};

const VideoHeroSlider = ({ slides, intervalMs = 5200 }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const safeSlides = useMemo(() => (slides || []).filter(Boolean), [slides]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failedVideoIds, setFailedVideoIds] = useState(() => new Set());

  const active = safeSlides[activeIndex] || safeSlides[0];

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (paused) return;
    if (!safeSlides.length) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeSlides.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [prefersReducedMotion, paused, safeSlides.length, intervalMs]);

  const goTo = (idx) => {
    if (!safeSlides.length) return;
    const next = ((idx % safeSlides.length) + safeSlides.length) % safeSlides.length;
    setActiveIndex(next);
  };

  const handleVideoError = (slideId) => {
    setFailedVideoIds((prev) => new Set([...prev, slideId]));
  };

  if (!active) return null;

  const showFallback = failedVideoIds.has(active.id) || !active.videoSrc;

  return (
    <div
      className="vh-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="vh-media">
        {showFallback ? (
          <img className="vh-fallback" src={active.poster} alt="" aria-hidden="true" />
        ) : (
          <video
            key={active.id}
            className="vh-video"
            src={active.videoSrc}
            poster={active.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => handleVideoError(active.id)}
          />
        )}
        <div className="vh-overlay" aria-hidden="true" />
      </div>

      <div className="vh-caption">
        <div className="vh-caption-pill">
          <PlayCircleIcon className="vh-caption-icon" />
          <span>{active.kicker || 'PrepPilot'}</span>
        </div>
        <div className="vh-caption-title">{active.title}</div>
        {active.subtitle ? <div className="vh-caption-sub">{active.subtitle}</div> : null}
      </div>

      <button className="vh-arrow left" type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Previous slide">
        <ChevronLeftIcon className="vh-arrow-icon" />
      </button>
      <button className="vh-arrow right" type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Next slide">
        <ChevronRightIcon className="vh-arrow-icon" />
      </button>

      <div className="vh-dots" role="tablist" aria-label="Hero slides">
        {safeSlides.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            className={`vh-dot ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-pressed={idx === activeIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoHeroSlider;

