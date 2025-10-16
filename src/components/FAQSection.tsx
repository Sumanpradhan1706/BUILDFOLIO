import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Who can participate?',
    answer:
      'Buildfolio is open to all developers and designers, regardless of experience level. Whether you\'re a student, professional, or hobbyist, we welcome your creativity and passion.',
  },
  {
    question: 'Is there any registration fee?',
    answer:
      'No, participation is free!',
  },
  {
    question: 'Can I participate individually or in a team?',
    answer:
      'This is an individual competition.',
  },
  {
    question: 'How do I submit my portfolio?',
    answer:
      'Once you register, you\'ll receive detailed submission guidelines via email. You can submit your portfolio through our online portal by the deadline on November 15th, 2025.',
  },
  {
    question: 'Can I use platforms like GitHub, Behance, Notion, or Canva?',
    answer:
      'Yes! You can use any platform that best represents your work and skills.',
  },
  {
    question: 'What is TechVerse?',
    answer:
      'A cosmic community where developers, designers and tech enthusiasts unite to build the future. Connect, learn, and create amazing projects together.',
  },
  {
    question: 'What are the rewards for the winners?',
    answer:
      'Winners will receive exciting swags as a token of appreciation for their creativity and effort. Certificates will also be given to all the performers!',
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-neon">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-foreground/85">
              Got questions? We've got answers!
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-glass p-6 md:p-8 rounded-2xl border border-primary/20"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    <span className="font-semibold text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
