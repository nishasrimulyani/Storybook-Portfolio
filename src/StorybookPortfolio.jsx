import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function StorybookPortfolio() {

  const pages = [
    { title : "Welcome To My Storybook Portfolio 🚀", bg : "from-blue-100 to-indigo-200"},
    { title : "About Me ✨", bg : "from-purple-100 to-pink-200", type:"text-box"},
    { title : "My Project 💡", bg : "from-green-100 to-emerald-200", type:"image-box"},
    
  ];

  const refs = pages.map(() => useRef(null));
  const [currentChapter, setCurrentChapter] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      let activeIndex = 0;
      refs.forEach((ref, i) => {
        if (ref.current) {
          const offsetTop = ref.current.offsetTop;
          if (scrollPos >= offsetTop) activeIndex = i;
        }
      });
      setCurrentChapter(activeIndex);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [refs]);



  return (
    <div className="relative h-screen w-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth" ref={containerRef} style={{ scrollSnapType: "y mandatory" }}>
      
      {/* Navigation Dots */}
      <motion.div
        className="fixed top-1/2 left-4 -translate-y-1/2 flex flex-col space-y-4 z-20" 
        style={{ scaleY: smoothProgress }} >
        
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => refs[i].current.scrollIntoView({ behavior: "smooth" })}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              i === currentChapter ? "bg-indigo-600 shadow-lg" : "bg-gray-300 hover:bg-indigo-400"
            }`}
            aria-label={`Go to ${pages[i].title}`}
          />
        ))}
      </motion.div>

      {pages.map((pg, i) => {
        const ref = refs[i];
        const { scrollYProgress: sectionProgress } = useScroll({
          target: ref,
          offset: ["start end", "end start"],
        });
        const y = useTransform(sectionProgress, [0, 1], [60, -60]);
        const opacity = useTransform(sectionProgress, [0, 0.5, 1], [0.2, 1, 0.2]);

        return (
          <section
            key={i}
            ref={ref}
            className={`relative h-screen snap-start flex flex-col items-center justify-center bg-gradient-to-b ${pg.bg} p-8 overflow-hidden select-none`}>
            
            {/* Starry Background */}
            <div className="absolute inset-0 overflow-hidden z-0">
              {[...Array(50).map((_, starIdx)=> 
                <motion.div
                  key={starIdx}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{
                    x : Math.random() * window.innerWidth,
                    y : Math.random() * window.innerHeight,
                    opacity : Math.random()
                  }}

                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              )]} 
            </div>
            <motion.div
              style={{ y, opacity }}
              className="absolute w-72 h-72 rounded-full bg-white/30 blur-3xl">
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-serif mb-4 text-center z-10 select-text text-indigo-800"
            >
              {pg.title}
            </motion.h1>

            {i < pages.length - 1 && (
              <motion.button
                onClick={() => refs[i + 1].current.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-10 z-10 bg-indigo-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
                aria-label="Scroll to next chapter"
              >
                Next Chapter →
              </motion.button>
            )}
          </section>
        );
      })}
    </div> 
  );
}
