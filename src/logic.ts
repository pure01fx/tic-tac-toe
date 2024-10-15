import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { computed, reactive, ref, type Ref } from 'vue'

export type TicTacToeBoard = ('X' | 'O' | null)[][]

function createPuzzle(): Ref<TicTacToeBoard> {
  return ref<TicTacToeBoard>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
}

function findWinner(puzzle: TicTacToeBoard): string | null {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      puzzle[i][0] !== null &&
      puzzle[i][0] === puzzle[i][1] &&
      puzzle[i][0] === puzzle[i][2]
    ) {
      return puzzle[i][0]
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      puzzle[0][i] !== null &&
      puzzle[0][i] === puzzle[1][i] &&
      puzzle[0][i] === puzzle[2][i]
    ) {
      return puzzle[0][i]
    }
  }

  // Check diagonals
  if (
    puzzle[0][0] !== null &&
    puzzle[0][0] === puzzle[1][1] &&
    puzzle[0][0] === puzzle[2][2]
  ) {
    return puzzle[0][0]
  }
  if (
    puzzle[0][2] !== null &&
    puzzle[0][2] === puzzle[1][1] &&
    puzzle[0][2] === puzzle[2][0]
  ) {
    return puzzle[0][2]
  }

  return null
}

export function hasSpace(puzzle: TicTacToeBoard): boolean {
  for (const row of puzzle) {
    for (const cell of row) {
      if (cell === null) {
        return true
      }
    }
  }
  return false
}

function calcNodeCount(node: SearchTreeNode): number {
  let count = 1
  for (const child of node.children) {
    count += calcNodeCount(child)
  }
  return count
}

export const algorithmOptions: SelectMixedOption[] = [
  {
    label: 'Min-Max',
    value: 'min-max',
  },
  {
    label: 'Alpha-Beta Pruning',
    value: 'alpha-beta',
  },
] as const

export function createMachine() {
  const puzzle = createPuzzle()
  const nextPlayer = ref<'X' | 'O'>('X')
  const enableAI = ref(false)
  const algorithm = ref(algorithmOptions[0].value as 'min-max')

  const winner = computed(() => findWinner(puzzle.value))
  const space = computed(() => hasSpace(puzzle.value))
  const searchTree = ref<SearchTreeNode | null>(null)

  const findBestMove = () => {
    if (algorithm.value === 'min-max') {
      return findBestMoveMinMax(puzzle.value, 10, nextPlayer.value)
    } else {
      return findBestMoveAlphaBeta(puzzle.value, 10, nextPlayer.value)
    }
  }

  const performMove = (): SearchTreeNode | null => {
    if (winner.value === null && space.value) {
      const { bestMove, node } = findBestMove()
      const [aiRow, aiCol] = bestMove
      puzzle.value[aiRow][aiCol] = nextPlayer.value
      nextPlayer.value = nextPlayer.value === 'X' ? 'O' : 'X'

      return node
    }

    return null
  }

  const onCellClick = (row: number, col: number) => {
    puzzle.value[row][col] = nextPlayer.value
    nextPlayer.value = nextPlayer.value === 'X' ? 'O' : 'X'

    if (enableAI.value) {
      searchTree.value = performMove()
    } else {
      searchTree.value = null
    }
  }

  const reset = () => {
    puzzle.value = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]
    nextPlayer.value = 'X'
  }

  return reactive({
    puzzle,
    nextPlayer,
    onCellClick,
    reset,
    hasWinner: computed(() => winner.value !== null),
    hasSpace: space,
    enableAI,
    performMove: () => {
      searchTree.value = performMove()
    },
    searchTree,
    nodeCount: computed(() => {
      if (searchTree.value === null) {
        return 0
      }
      return calcNodeCount(searchTree.value)
    }),
    algorithm,
  })
}

function clonePuzzle(puzzle: TicTacToeBoard): TicTacToeBoard {
  return puzzle.map(row => row.slice())
}

// implement min-max algorithm, requires to save the tree of the states
export type SearchTreeNode = {
  puzzle: TicTacToeBoard
  children: Array<SearchTreeNode>
  score: number
  isMaximizing: boolean
}

export type SearchTreeData = {
  name: string
  value: TicTacToeBoard
  children: Array<SearchTreeData>
}

export function searchTreeToData(node: SearchTreeNode | null): SearchTreeData {
  if (node === null) {
    return {
      name: 'root',
      value: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      children: [],
    }
  }
  return {
    name: `${node.score} (${node.isMaximizing ? 'max' : 'min'})`,
    value: node.puzzle,
    children: node.children.map(searchTreeToData),
  }
}

function minimax(
  puzzle: TicTacToeBoard,
  isMaximizing: boolean,
  remainingDepth: number,
): SearchTreeNode {
  const node: SearchTreeNode = {
    puzzle,
    children: [],
    score: isMaximizing ? -Infinity : Infinity,
    isMaximizing,
  }

  const winner = findWinner(puzzle)
  if (winner !== null || remainingDepth === 0) {
    if (winner === 'X') {
      node.score = -remainingDepth
    } else if (winner === 'O') {
      node.score = remainingDepth
    }
    return node
  }

  const nextPlayer = isMaximizing ? 'O' : 'X'

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (puzzle[i][j] === null) {
        const newPuzzle = clonePuzzle(puzzle)
        newPuzzle[i][j] = nextPlayer
        const child = minimax(newPuzzle, !isMaximizing, remainingDepth - 1)
        node.children.push(child)

        if (isMaximizing) {
          node.score = Math.max(node.score, child.score)
        } else {
          node.score = Math.min(node.score, child.score)
        }
      }
    }
  }

  if (Math.abs(node.score) > 100000) {
    node.score = 0
  }

  return node
}

function findBestMoveMinMax(
  puzzle: TicTacToeBoard,
  maxDepth: number,
  player: 'X' | 'O',
): { bestMove: [number, number]; node: SearchTreeNode } {
  const node = minimax(puzzle, player === 'O', maxDepth)
  const bestScore = node.score
  let bestMove: [number, number] = [-1, -1]

  console.log(node)

  for (const child of node.children) {
    if (child.score === bestScore) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (child.puzzle[i][j] !== puzzle[i][j]) {
            bestMove = [i, j]
          }
        }
      }
    }
  }

  return { bestMove, node }
}

// alpha-beta pruning
function alphaBeta(
  puzzle: TicTacToeBoard,
  isMaximizing: boolean,
  remainingDepth: number,
  alpha: number,
  beta: number,
): SearchTreeNode {
  const node: SearchTreeNode = {
    puzzle,
    children: [],
    score: isMaximizing ? -Infinity : Infinity,
    isMaximizing,
  }

  const winner = findWinner(puzzle)
  if (winner !== null || remainingDepth === 0) {
    if (winner === 'X') {
      node.score = -remainingDepth
    } else if (winner === 'O') {
      node.score = remainingDepth
    }
    return node
  }

  const nextPlayer = isMaximizing ? 'O' : 'X'

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (puzzle[i][j] === null) {
        const newPuzzle = clonePuzzle(puzzle)
        newPuzzle[i][j] = nextPlayer
        const child = alphaBeta(
          newPuzzle,
          !isMaximizing,
          remainingDepth - 1,
          alpha,
          beta,
        )
        node.children.push(child)

        if (isMaximizing) {
          node.score = Math.max(node.score, child.score)
          alpha = Math.max(alpha, node.score)
        } else {
          node.score = Math.min(node.score, child.score)
          beta = Math.min(beta, node.score)
        }

        if (beta <= alpha) {
          break
        }
      }
    }
  }

  if (Math.abs(node.score) > 100000) {
    node.score = 0
  }

  return node
}

function findBestMoveAlphaBeta(
  puzzle: TicTacToeBoard,
  maxDepth: number,
  player: 'X' | 'O',
): { bestMove: [number, number]; node: SearchTreeNode } {
  const node = alphaBeta(puzzle, player === 'O', maxDepth, -Infinity, Infinity)
  const bestScore = node.score
  let bestMove: [number, number] = [-1, -1]

  console.log(node)

  for (const child of node.children) {
    if (child.score === bestScore) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (child.puzzle[i][j] !== puzzle[i][j]) {
            bestMove = [i, j]

            return { bestMove, node }
          }
        }
      }
    }
  }

  throw new Error('No best move found')
}
