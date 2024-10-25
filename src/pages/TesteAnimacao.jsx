import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

function TesteAnimacao() {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    const styles = useSpring({
        opacity: isVisible2 ? 1 : 0,
        transform: isVisible2 ? 'translateY(0)' : 'translateY(-20px)',
        config: { duration: 500 },
    });


    return (
        <div>
            <button onClick={toggleVisibility}>Toggle Div</button>

            {/* AnimatePresence é necessário para animar componentes que estão saindo da árvore do DOM */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        key="example"
                        initial={{ opacity: 0, y: -200 }} // Estado inicial
                        animate={{ opacity: 1, y: 110 }}   // Estado de animação
                        exit={{ opacity: 0, y: 20 }}      // Estado de saída
                        transition={{ duration: 0.9 }}    // Duração da animação
                    >
                        Esta div aparece e desaparece animada!
                    </motion.div>
                )}
            </AnimatePresence>
            <button onClick={toggleVisibility}>Toggle Div</button>

            {isVisible2 && (
                <animated.div style={styles}>
                    Esta div aparece e desaparece animada com React Spring!
                </animated.div>
            )}
        </div>
    );
}

export default TesteAnimacao
