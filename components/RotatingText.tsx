import {motion} from "framer-motion";

const MovingText: React.FC = () => {
    const text = "MAMAFROG ";

    // Framer Motion variants
    const stretchVariants = {
        animate: {
            scaleX: [1, 1.5, 0.8, 1], // Horizontal scaling
            originY: 0, // Anchor the top while scaling happens at the bottom
            transition: {
                repeat: Infinity,
                duration: 3, // Total time for one loop
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.div
            variants={stretchVariants}
            animate="animate"
            className={"text-6xl "}
        >
            {text.repeat(5)}
        </motion.div>
    );
};

export default MovingText;
