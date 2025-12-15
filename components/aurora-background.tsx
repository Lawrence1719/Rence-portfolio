'use client'

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Dark mode aurora borealis */}
      <div className="absolute inset-0 dark:block hidden">
        {/* Aurora Ray 1 - Green to Cyan */}
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-green-500/40 to-transparent rounded-full blur-3xl"
          style={{ animation: 'aurora-1 18s ease-in-out infinite' }}
        ></div>
        
        {/* Aurora Ray 2 - Blue to Purple */}
        <div 
          className="absolute top-1/3 right-1/3 w-[550px] h-[550px] -translate-y-1/2 bg-gradient-to-b from-transparent via-blue-500/35 to-transparent rounded-full blur-3xl"
          style={{ animation: 'aurora-2 22s ease-in-out infinite' }}
        ></div>
        
        {/* Aurora Ray 3 - Purple to Pink */}
        <div 
          className="absolute top-1/2 left-1/3 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent rounded-full blur-3xl"
          style={{ animation: 'aurora-3 26s ease-in-out infinite' }}
        ></div>
        
        {/* Aurora Ray 4 - Cyan accent */}
        <div 
          className="absolute top-1/4 -right-1/4 w-[480px] h-[480px] -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent rounded-full blur-3xl"
          style={{ animation: 'aurora-4 24s ease-in-out infinite' }}
        ></div>
        
        {/* Aurora Ray 5 - Green accent */}
        <div 
          className="absolute top-0 left-1/2 w-[520px] h-[520px] -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-500/25 to-transparent rounded-full blur-3xl"
          style={{ animation: 'aurora-5 20s ease-in-out infinite' }}
        ></div>
      </div>

      {/* Light mode aurora (subtle) */}
      <div className="absolute inset-0 block dark:hidden">
        {/* Subtle Aurora Ray 1 - Green */}
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-green-400/20 to-transparent rounded-full blur-3xl"
          style={{ animation: 'aurora-1 18s ease-in-out infinite' }}
        ></div>
        
        {/* Subtle Aurora Ray 2 - Blue */}
        <div 
          className="absolute top-1/3 right-1/3 w-[550px] h-[550px] -translate-y-1/2 bg-gradient-to-b from-transparent via-blue-400/18 to-transparent rounded-full blur-3xl"
          style={{ animation: 'aurora-2 22s ease-in-out infinite' }}
        ></div>
        
        {/* Subtle Aurora Ray 3 - Purple */}
        <div 
          className="absolute top-1/2 left-1/3 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-purple-400/15 to-transparent rounded-full blur-3xl"
          style={{ animation: 'aurora-3 26s ease-in-out infinite' }}
        ></div>
        
        {/* Subtle Aurora Ray 4 - Cyan */}
        <div 
          className="absolute top-1/4 -right-1/4 w-[480px] h-[480px] -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-300/12 to-transparent rounded-full blur-3xl"
          style={{ animation: 'aurora-4 24s ease-in-out infinite' }}
        ></div>
        
        {/* Subtle Aurora Ray 5 - Emerald */}
        <div 
          className="absolute top-0 left-1/2 w-[520px] h-[520px] -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-400/12 to-transparent rounded-full blur-3xl"
          style={{ animation: 'aurora-5 20s ease-in-out infinite' }}
        ></div>
      </div>
    </div>
  )
}
