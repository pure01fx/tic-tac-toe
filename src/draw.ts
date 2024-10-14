import type { TicTacToeBoard } from './logic'

export function drawTicTacToeBoard(
  board: TicTacToeBoard,
  cellSize: number,
  lineWidth: number,
): string {
  // 计算画布的实际尺寸，包括线段宽度
  const canvasWidth = 3 * cellSize + 2 * lineWidth
  const canvasHeight = 3 * cellSize + 2 * lineWidth

  // 创建一个 canvas 元素
  const canvas = document.createElement('canvas')
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Unable to get canvas context')
  }

  // 设置线段宽度
  ctx.lineWidth = lineWidth

  // 绘制棋盘的网格线
  for (let i = 0; i <= 3; i++) {
    ctx.beginPath()
    ctx.moveTo(lineWidth, i * cellSize + lineWidth)
    ctx.lineTo(canvasWidth - lineWidth, i * cellSize + lineWidth)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(i * cellSize + lineWidth, lineWidth)
    ctx.lineTo(i * cellSize + lineWidth, canvasHeight - lineWidth)
    ctx.stroke()
  }

  // 绘制棋子
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col]) {
        const x = col * cellSize + lineWidth + cellSize / 2 - lineWidth / 2
        const y = row * cellSize + lineWidth + cellSize / 2 - lineWidth / 2
        ctx.beginPath()
        ctx.arc(x, y, cellSize / 2 - lineWidth / 2, 0, 2 * Math.PI)
        ctx.fillStyle = board[row][col] === 'X' ? '#000' : '#fff'
        ctx.fill()
      }
    }
  }

  // 获取绘制好的棋盘的 dataURL
  return canvas.toDataURL('image/png')
}

export function generateTicTacToeSVGPath(
  board: TicTacToeBoard,
  cellSize: number,
  lineWidth: number,
): string {
  // SVG Path Data
  let pathData = ''

  // 绘制竖线矩形
  for (let i = 1; i < 3; i++) {
    const startX = i * cellSize + (i - 1) * lineWidth
    const startY = 0
    const endX = i * cellSize + i * lineWidth
    const endY = 3 * cellSize + 2 * lineWidth
    pathData += `M ${startX} ${startY} V ${endY} H ${endX} V ${startY} Z `
  }

  // 绘制横线矩形
  for (let i = 1; i < 3; i++) {
    const startX = 0
    const startY = i * cellSize + (i - 1) * lineWidth
    const endX = 3 * cellSize + 2 * lineWidth
    const endY = i * cellSize + i * lineWidth
    pathData += `M ${startX} ${startY} H ${endX} V ${endY} H ${startX} Z `
  }

  // 绘制棋子
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const x = col * (cellSize + lineWidth)
      const y = row * (cellSize + lineWidth)
      if (board[row][col] === 'X') {
        // 绘制X
        pathData += `M ${x + cellSize / 4 + lineWidth / 2} ${y + cellSize / 4 - lineWidth / 2} `
        pathData += `L ${x + cellSize / 2} ${y + cellSize / 2 - lineWidth} `
        pathData += `L ${x + (cellSize * 3) / 4 - lineWidth / 2} ${y + cellSize / 4 - lineWidth / 2} `
        pathData += `L ${x + (cellSize * 3) / 4 + lineWidth / 2} ${y + cellSize / 4 + lineWidth / 2} `
        pathData += `L ${x + cellSize / 2 + lineWidth} ${y + cellSize / 2} `
        pathData += `L ${x + (cellSize * 3) / 4 + lineWidth / 2} ${y + (cellSize * 3) / 4 - lineWidth / 2} `
        pathData += `L ${x + (cellSize * 3) / 4 - lineWidth / 2} ${y + (cellSize * 3) / 4 + lineWidth / 2} `
        pathData += `L ${x + cellSize / 2} ${y + cellSize / 2 + lineWidth} `
        pathData += `L ${x + cellSize / 4 + lineWidth / 2} ${y + (cellSize * 3) / 4 + lineWidth / 2} `
        pathData += `L ${x + cellSize / 4 - lineWidth / 2} ${y + (cellSize * 3) / 4 - lineWidth / 2} `
        pathData += `L ${x + cellSize / 2 - lineWidth} ${y + cellSize / 2} `
        pathData += `L ${x + cellSize / 4 - lineWidth / 2} ${y + cellSize / 4 + lineWidth / 2} Z `
      } else if (board[row][col] == 'O') {
        // 绘制O
        const template = `A ${cellSize - 2 * lineWidth} ${cellSize - 2 * lineWidth} 0 0 1`
        pathData += `M ${x + cellSize / 2} ${y + lineWidth} `
        pathData += `${template} ${x + cellSize - lineWidth} ${y + cellSize / 2} `
        pathData += `${template} ${x + cellSize / 2} ${y + cellSize - lineWidth} `
        pathData += `${template} ${x + lineWidth} ${y + cellSize / 2} `
        pathData += `${template} ${x + cellSize / 2} ${y + lineWidth} Z `
      }
    }
  }

  return pathData
}
