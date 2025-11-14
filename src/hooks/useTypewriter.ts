import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  texts: string[];
  displayDuration: number; // Total time each text should be displayed (in ms)
  typingSpeed?: number; // Delay between each character (in ms)
}

export const useTypewriter = ({ 
  texts, 
  displayDuration, 
  typingSpeed = 30 
}: UseTypewriterOptions) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentTextIndex];
    let charIndex = 0;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset and start typing
    const startTyping = () => {
      setDisplayedText('');
      setIsTyping(true);
      charIndex = 0;

      const typeNextChar = () => {
        if (charIndex < currentText.length) {
          setDisplayedText(currentText.slice(0, charIndex + 1));
          charIndex++;
          timeoutRef.current = setTimeout(typeNextChar, typingSpeed);
        } else {
          setIsTyping(false);
          // After typing completes, wait for the remaining display duration
          const typingTime = currentText.length * typingSpeed;
          const remainingTime = Math.max(0, displayDuration - typingTime);
          
          timeoutRef.current = setTimeout(() => {
            // Move to next text
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }, remainingTime);
        }
      };

      typeNextChar();
    };

    startTyping();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [currentTextIndex, texts, displayDuration, typingSpeed]);

  return { displayedText, isTyping };
};

