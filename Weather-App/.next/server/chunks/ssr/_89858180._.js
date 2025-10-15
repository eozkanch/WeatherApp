module.exports=[50944,(a,b,c)=>{b.exports=a.r(74137)},36394,a=>{"use strict";a.s(["default",()=>d]);var b=a.i(87924),c=a.i(50944);function d(){let a=(0,c.useRouter)();return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{dangerouslySetInnerHTML:{__html:`
        @keyframes float-cloud {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        
        @keyframes lightning {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes spotlight-404-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(80px, 40px) scale(1.2);
            opacity: 0.9;
          }
        }
        
        @keyframes spotlight-404-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-60px, -30px) scale(1.1);
            opacity: 0.8;
          }
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        .animate-float-cloud {
          animation: float-cloud 4s ease-in-out infinite;
        }
        
        .animate-lightning {
          animation: lightning 2s ease-in-out infinite;
        }
        
        .animate-spotlight-404-1 {
          animation: spotlight-404-1 10s ease-in-out infinite;
        }
        
        .animate-spotlight-404-2 {
          animation: spotlight-404-2 12s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-glitch {
          animation: glitch 0.3s ease-in-out;
        }
      `}}),(0,b.jsxs)("div",{className:"min-h-screen bg-black text-gray-100 flex items-center justify-center relative overflow-hidden",children:[(0,b.jsxs)("div",{className:"absolute inset-0 opacity-30",children:[(0,b.jsx)("div",{className:"absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-spotlight-404-1"}),(0,b.jsx)("div",{className:"absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-spotlight-404-2"})]}),(0,b.jsxs)("div",{className:"relative z-10 text-center px-6 max-w-2xl",children:[(0,b.jsx)("div",{className:"mb-8",children:(0,b.jsx)("h1",{className:"text-[180px] md:text-[220px] font-bold leading-none bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent",children:"404"})}),(0,b.jsx)("div",{className:"mb-8 flex justify-center",children:(0,b.jsxs)("div",{className:"relative animate-float-cloud",children:[(0,b.jsx)("svg",{className:"w-32 h-32 text-gray-400",fill:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"})}),(0,b.jsx)("svg",{className:"w-8 h-8 text-yellow-400 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 animate-lightning",fill:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M7 2v11h3v9l7-12h-4l4-8z"})})]})}),(0,b.jsx)("h2",{className:"text-3xl md:text-4xl font-bold mb-4 text-white",children:"Page Not Found"}),(0,b.jsx)("p",{className:"text-lg md:text-xl text-gray-400 mb-8",children:"Oops! Looks like this page got lost in the clouds. The weather forecast couldn't locate this route."}),(0,b.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4 justify-center items-center",children:[(0,b.jsx)("button",{onClick:()=>a.push("/"),className:"group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50",children:(0,b.jsxs)("span",{className:"relative z-10 flex items-center gap-2",children:[(0,b.jsx)("svg",{className:"w-5 h-5 group-hover:-translate-x-1 transition-transform",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"})}),"Back to Home"]})}),(0,b.jsx)("button",{onClick:()=>a.push("/about"),className:"px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300",children:"About Project"})]}),(0,b.jsx)("div",{className:"mt-12 text-sm text-gray-500",children:(0,b.jsx)("p",{children:"Error Code: 404 | Page Not Found"})})]}),(0,b.jsx)("div",{className:"absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"}),(0,b.jsx)("div",{className:"absolute top-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse",style:{animationDelay:"0.5s"}}),(0,b.jsx)("div",{className:"absolute bottom-20 left-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse",style:{animationDelay:"1s"}}),(0,b.jsx)("div",{className:"absolute bottom-10 right-10 w-3 h-3 bg-cyan-400 rounded-full animate-pulse",style:{animationDelay:"1.5s"}})]})]})}}];

//# sourceMappingURL=_89858180._.js.map