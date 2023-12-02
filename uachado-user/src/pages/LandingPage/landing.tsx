import { useEffect, useState } from 'react';

const LandingPage: React.FC = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const textStyle = {
        textAlign: 'left',
        color: '#C0704D', // Replace with the actual color code
        lineHeight: 0.9,
        fontSize: windowWidth > 768 ? '2em' : '0.5em',
    };

    const largeStyle = {
        ...textStyle,
        fontSize: '5em',
        fontWeight: 'bold',
    };


    const transformedStyle = {
        ...largeStyle,
        color: '#332B27',
    };


    return (
        <div className="flex-col items-center justify-center bg-base-200">
            <div className="relative w-screen h-screen hero bg-base-200">
                <div className="flex-col sm:text-left hero-content">
                    <div style={textStyle}>
                        <div style={largeStyle}>na UA, nada se </div>
                        <div style={largeStyle}>perde, tudo se</div>
                        <div style={transformedStyle}>UAcha</div>
                    </div>
                    <p className="max-w-md mt-5 text-lg text-primary-content">
                        A plataforma que te ajuda a encontrar os teus pertences perdidos na UA.
                    </p>
                </div>
            </div>
            <div className='m-2'>
                <button className="btn btn-primary">Get Started</button>
            </div>
        </div>
    );
};

export default LandingPage;
