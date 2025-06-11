import { useState } from 'react'
import { Input } from '@/components/ui/input'

function App() {
  const [stampText, setStampText] = useState('')

  const generateStampSVG = (text: string) => {
    if (!text) return null

    const size = 200
    const radius = 80
    const fontSize = 60

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#8B4513"
          strokeWidth="4"
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={fontSize}
          fill="#8B4513"
          fontFamily="serif"
          fontWeight="bold"
        >
          {text}
        </text>
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">印鑑メーカー</h1>
          <p className="text-gray-600">Inkan Maker - Create Your Personal Seal</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="stamp-text" className="block text-sm font-medium text-gray-900 mb-2">
              Stamp Text
            </label>
            <Input
              id="stamp-text"
              placeholder="Enter text for your stamp"
              value={stampText}
              onChange={(e) => setStampText(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="flex justify-center">
            {stampText && (
              <div className="p-8 bg-white rounded-lg border shadow-lg">
                {generateStampSVG(stampText)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
