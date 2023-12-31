import React, { useEffect, useState, useRef, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import genIcon from '../../../public/general-icon.png';
import machado from '../../../public/machado.png';


const LandingPage: React.FC = () => {

    const navigate = useNavigate();
    
    const enterSite = () => {
        navigate("/home");
    };
    useEffect(() => {
          AOS.init();
          AOS.refresh();
        }, []);

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

    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const textStyle : CSSProperties = {
        textAlign: 'left',
        color: '#C0704D', // Replace with the actual color code
        lineHeight: 0.9,
        fontSize: windowWidth > 768 ? '2em' : '0.5em',
    };

    const largeStyle: CSSProperties = {
        ...textStyle,
        fontSize: '5em',
        fontWeight: 'bold',
    };


    const transformedStyle: CSSProperties = {
        ...largeStyle,
        color: '#332B27',
    };

    return (
        <div className="flex-col items-center justify-center bg-base-200">
            <div className="relative h-screen sm:w-screen hero bg-base-200">
                <div className="sm:text-left hero-content">
                    <div style={textStyle}>
                        <div style={largeStyle}>na UA, nada se </div>
                        <div style={largeStyle}>perde, tudo se</div>
                        <div style={transformedStyle}>UAcha</div>
                    </div>
                </div>
                <div className='absolute flex-col bottom-20'>
                    <div>
                        <button className="px-4 py-2 text-2xl italic animate-[bounce_20s_linear_infinite] font-extrabold btn btn-base-200" onClick={enterSite}>UA<h5 className='-ml-2 lowercase'>char</h5></button>
                    </div>
                    <div>
                        <button  onClick={handleClick}>O que é isto?</button>
                    </div>
                </div>
            </div>
            <div className='pb-20 m-2 sm:mx-96'>
                <div className="chat chat-start" ref={ref}>
                    <div className="chat-image avatar" data-aos="fade-left" data-aos-delay="50">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src={machado} />
                        </div>
                    </div>
                    <div className="chat-header" data-aos="fade-left" data-aos-delay="50">
                        Rui Machado
                        <time className="ml-2 text-xs opacity-50 " >12:40</time>
                    </div>
                    <div className="chat-bubble chat-bubble-primary" data-aos="fade-left" data-aos-delay="50">isto vem a ser o quê?</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar" data-aos="fade-right" data-aos-delay="500">
                        <div className="w-10 rounded-full" data-aos="fade-right" data-aos-delay="500">
                            <img alt="Tailwind CSS chat bubble component" src={genIcon} />
                        </div>
                    </div>
                    <div className="chat-header" data-aos="fade-right" data-aos-delay="500">
                        Estagiário
                        <time className="ml-2 text-xs opacity-50">12:40</time>
                    </div>
                    <div className="text-left chat-bubble " data-aos="fade-right" data-aos-delay="500">meu, basicamente isto é um site, tás a ver? em que, se perderes alguma coisa na UA, podes vir cá ver se encontraram</div>
                    <div className="opacity-50 chat-footer" data-aos="fade-right" data-aos-delay="500">
                        Visto às 12:40
                    </div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar" data-aos="fade-left" data-aos-delay="1800">
                        <div className="w-10 rounded-full" data-aos="fade-left" data-aos-delay="1800">
                            <img alt="Tailwind CSS chat bubble component" src={machado} />
                        </div>
                    </div>
                    <div className="chat-header" data-aos="fade-left" data-aos-delay="1800">
                        Rui Machado
                        <time className="ml-2 text-xs opacity-50" data-aos="fade-left" data-aos-delay="1800">12:45</time>
                    </div>
                    <div className="text-left chat-bubble chat-bubble-primary" data-aos="fade-left" data-aos-delay="1800">okay... digamos que eu perdi o meu guarda-chuva, o que é que eu faço? </div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar" data-aos="fade-right" data-aos-delay="2500">
                        <div className="w-10 rounded-full" data-aos="fade-right" data-aos-delay="2500">
                            <img alt="Tailwind CSS chat bubble component" src={genIcon} />
                        </div>
                    </div>
                    <div className="chat-header " data-aos="fade-right" data-aos-delay="2500">
                        Estagiário
                        <time className="ml-2 text-xs opacity-50">12:46</time>
                    </div>
                    <div className="text-left chat-bubble " data-aos="fade-right" data-aos-delay="2500">simples: vais a <b>Objetos Perdidos</b>, usas os filtros para ver só os guarda-chuvas, encontras o teu e vais ter ao sítio onde ficou guardado. se não sabes bem onde fica nós levamos-te lá ;)</div>
                    <div className="opacity-50 chat-footer" data-aos="fade-right" data-aos-delay="2500">
                        Visto às 12:49
                    </div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar" data-aos="fade-left" data-aos-delay="3000">
                        <div className="w-10 rounded-full" data-aos="fade-left" data-aos-delay="3000">
                            <img alt="Tailwind CSS chat bubble component" src={machado} />
                        </div>
                    </div>
                    <div className="chat-header" data-aos="fade-left" data-aos-delay="3000">
                        Rui Machado
                        <time className="ml-2 text-xs opacity-50 " data-aos="fade-left" data-aos-delay="3000">12:50</time>
                    </div>
                    <div className="text-left chat-bubble chat-bubble-primary" data-aos="fade-left" data-aos-delay="3000">realmente, como é que ninguém pensou nisto antes? </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
