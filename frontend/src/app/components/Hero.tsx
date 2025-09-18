"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/app/utils/animations";

type Props = {
  onCTAClick?: () => void;
};

export default function Hero({ onCTAClick }: Props) {
  return (
    <section className="min-h-[70vh] md:min-h-[80vh] grid place-items-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer(0.1)}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold tracking-tight">
          Hi, I'm Prince
        </motion.h1>
        <motion.p variants={fadeInUp} className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Building modern web experiences with AI and code.
        </motion.p>
        <motion.div variants={fadeInUp} className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/projects"
            onClick={onCTAClick}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/50 transition-colors"
          >
            See My Work
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Contact Me
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}


