import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'animate-fade-in-up',
  delay = '0ms',
  threshold = 0.1,
  ...props 
}) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold })

  return (
    <div
      ref={elementRef}
      className={`${className} ${hasIntersected ? animation : 'opacity-0'}`}
      style={{ 
        animationDelay: hasIntersected ? delay : '0ms',
        ...props.style 
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default AnimatedSection

