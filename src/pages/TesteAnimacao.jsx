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

            <img src="data:image/jpeg;base64,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" alt="" />
        </div>
    );
}

export default TesteAnimacao
