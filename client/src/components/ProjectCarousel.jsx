import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ProjectCarousel
 * - props.projects optional; otherwise uses internal dummy list
 * - autoplay with pause-on-hover, manual controls, dots, keyboard left/right support
 */
export default function ProjectCarousel({ projects: propProjects }) {
  const navigate = useNavigate();
  const autoRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const projects = propProjects || [
    {
      id: "1",
      title: "Smart City Development",
      subtitle: "Sustainable, tech-driven urban upgrades",
      img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=123",
    },
    {
      id: "2",
      title: "Rural Broadband Expansion",
      subtitle: "High-speed internet for remote communities",
      img: "https://images.unsplash.com/photo-1603791452906-bb7b4f3f3a4b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=456",
    },
    {
      id: "3",
      title: "Green Energy Program",
      subtitle: "Solar & wind deployment at scale",
      img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=789",
    },
  ];

  // autoplay
  useEffect(() => {
    if (isHovering) return;
    autoRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, 4000);
    return () => clearInterval(autoRef.current);
  }, [isHovering, projects.length]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIndex((i) => (i + 1) % projects.length);
  const goTo = (i) => setIndex(i);

  return (
    <section
      className="mt-10"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Carousel viewport */}
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {projects.map((p, i) => (
              <article
                key={p.id}
                className="min-w-full bg-white flex flex-col md:flex-row items-stretch"
                role="group"
                aria-label={`${p.title} (${i + 1} of ${projects.length})`}
              >
                {/* Image half */}
                <div
                  className="w-full md:w-1/2 h-56 md:h-auto bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${p.img})`,
                  }}
                  onClick={() => navigate(`/projects/${p.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(`/projects/${p.id}`);
                  }}
                  aria-label={`Open project ${p.title}`}
                />

                {/* Content half */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-sm text-indigo-600 font-semibold mb-2">Featured Project</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{p.subtitle}</p>

                    <div className="flex gap-3 flex-wrap">
                      <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full">On-chain</span>
                      <span className="px-3 py-1 text-xs bg-sky-100 text-sky-800 rounded-full">Real-time</span>
                      <span className="px-3 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">Audit-ready</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/projects/${p.id}`)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                    >
                      View project
                    </button>
                    <button
                      onClick={() => navigate(`/projects`)}
                      className="border border-slate-200 px-4 py-2 rounded-md text-slate-700"
                    >
                      All projects
                    </button>

                    <div className="ml-auto hidden sm:flex items-center gap-2 text-sm text-slate-500">
                      <button
                        onClick={prev}
                        aria-label="Previous"
                        className="p-2 rounded-md hover:bg-slate-100"
                      >
                        ‹
                      </button>
                      <button
                        onClick={next}
                        aria-label="Next"
                        className="p-2 rounded-md hover:bg-slate-100"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full transition ${i === index ? "bg-indigo-600" : "bg-slate-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
