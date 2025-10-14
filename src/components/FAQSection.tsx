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
    question: 'Who can participate in Buildfolio?',
    answer:
      'Buildfolio is open to all developers and designers, regardless of experience level. Whether you\'re a student, professional, or hobbyist, we welcome your creativity and passion.',
  },
  {
    question: 'Is there a registration fee?',
    answer:
      'No! Buildfolio is completely free to participate. We believe in making opportunities accessible to everyone in the tech community.',
  },
  {
    question: 'How do I submit my portfolio?',
    answer:
      'Once you register, you\'ll receive detailed submission guidelines via email. You can submit your portfolio through our online portal by the deadline on November 15th, 2025.',
  },
  {
    question: 'How will judging work?',
    answer:
      'Our expert panel will evaluate submissions based on creativity, technical execution, design quality, and overall impact. Judging will take place from November 18-20, 2025.',
  },
  {
    question: 'What are the prizes?',
    answer:
      'Winners will receive certificates, swag, mentorship opportunities, and exciting tech prizes. Detailed prize information will be announced closer to the event date.',
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
            <p className="text-xl text-muted-foreground">
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
                  <AccordionContent className="text-muted-foreground leading-relaxed">
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
