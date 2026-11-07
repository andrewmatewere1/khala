import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Team from "./components/Team";
import Contact from "./components/Contact";
import RequestForm from "./components/RequestForm";
import Footer from "./components/Footer";

function App() {
    useEffect(() => {
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        let raf;
        const loop = (t) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        const onClick = (e) => {
            const a = e.target.closest('a[href^="#"]');
            if (!a) return;
            const target = document.querySelector(a.getAttribute("href"));
            if (target) {
                e.preventDefault();
                lenis.scrollTo(target, { offset: -70 });
            }
        };
        document.addEventListener("click", onClick);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            document.removeEventListener("click", onClick);
        };
    }, []);

    return (
        <ErrorBoundary>
            <div className="bg-paper text-ink antialiased">
                <Navbar />
                <main>
                    <Hero />
                    <Marquee />
                    <About />
                    <Services />
                    <Projects />
                    <Team />
                    <Contact />
                    <RequestForm />
                </main>
                <Footer />
                <Toaster position="bottom-right" richColors closeButton />
            </div>
        </ErrorBoundary>
    );
}

export default App;
