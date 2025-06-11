import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'

function App() {
  const [stampText, setStampText] = useState('')
  const MAX_CHARACTERS = 12
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawStamp = (text: string) => {
    const canvas = canvasRef.current
    if (!canvas || !text) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Convert hankaku to zenkaku for better visual appearance
    const convertToZenkaku = (input: string): string => {
      return input
        .split('')
        .map(char => {
          // Convert hankaku alphabet to zenkaku
          if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode(char.charCodeAt(0) - 'A'.charCodeAt(0) + 'Ａ'.charCodeAt(0))
          }
          if (char >= 'a' && char <= 'z') {
            return String.fromCharCode(char.charCodeAt(0) - 'a'.charCodeAt(0) + 'ａ'.charCodeAt(0))
          }
          // Keep everything else as is (including already zenkaku, numbers, symbols, etc.)
          return char
        })
        .join('')
    }

    // Canvas settings
    const size = 400 // Higher resolution for better quality
    canvas.width = size
    canvas.height = size
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size)
    
    // Convert to zenkaku and limit text
    const zenkakuText = convertToZenkaku(text)
    const limitedText = zenkakuText.slice(0, MAX_CHARACTERS)
    const centerX = size / 2
    const centerY = size / 2
    const outerRadius = 180
    const innerRadius = 60
    
    // Calculate wedge angle for each character
    const wedgeAngle = (Math.PI * 2) / limitedText.length
    
    // Draw outer circle border
    ctx.strokeStyle = '#8B4513'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)
    ctx.stroke()
    
    // Draw inner circle border
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2)
    ctx.stroke()
    
    // Set up text properties
    ctx.fillStyle = '#8B4513'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // Load custom font
    const fontSize = Math.min(80, (outerRadius - innerRadius) * 0.8)
    ctx.font = `${fontSize}px InkanFont, serif`
    
    // Draw each character as a stretched wedge
    limitedText.split('').forEach((char, index) => {
      const startAngle = -Math.PI / 2 + (wedgeAngle * index)
      const midAngle = startAngle + wedgeAngle / 2
      
      ctx.save()
      
      // Create clipping path for this wedge
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + wedgeAngle)
      ctx.lineTo(centerX, centerY)
      ctx.clip()
      
      // Position at center of wedge
      const textRadius = (outerRadius + innerRadius) / 2
      const x = centerX + Math.cos(midAngle) * textRadius
      const y = centerY + Math.sin(midAngle) * textRadius
      
      // Move to character position and rotate
      ctx.translate(x, y)
      ctx.rotate(midAngle + Math.PI / 2)
      
      // Calculate stretch factors to fill the wedge
      const radialStretch = (outerRadius - innerRadius) / fontSize
      const angularStretch = (wedgeAngle * textRadius) / (fontSize * 0.7)
      
      // Apply stretching transformation
      ctx.scale(angularStretch, radialStretch)
      
      // Draw the character
      ctx.fillText(char, 0, 0)
      
      ctx.restore()
    })
  }

  useEffect(() => {
    if (stampText) {
      drawStamp(stampText)
    } else {
      // Clear canvas if no text
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
    }
  }, [stampText])

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
              placeholder="Enter text (e.g., TANAKA, 田中)"
              value={stampText}
              onChange={(e) => setStampText(e.target.value)}
              className="text-lg"
              maxLength={MAX_CHARACTERS}
            />
            <p className="text-sm text-gray-500 mt-1">
              {stampText.length}/{MAX_CHARACTERS} characters maximum
            </p>
          </div>

          <div className="flex justify-center">
            <div className="p-8 bg-white rounded-lg border shadow-lg">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto"
                style={{ width: '200px', height: '200px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
