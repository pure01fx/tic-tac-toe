import { computed, reactive, ref, type Ref } from 'vue'

function createPuzzle(): Ref<Array<Array<string | null>>> {
  return ref<Array<Array<string | null>>>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
}

function hasWinner(puzzle: Array<Array<string | null>>): boolean {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      puzzle[i][0] !== null &&
      puzzle[i][0] === puzzle[i][1] &&
      puzzle[i][0] === puzzle[i][2]
    ) {
      return true
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      puzzle[0][i] !== null &&
      puzzle[0][i] === puzzle[1][i] &&
      puzzle[0][i] === puzzle[2][i]
    ) {
      return true
    }
  }

  // Check diagonals
  if (
    puzzle[0][0] !== null &&
    puzzle[0][0] === puzzle[1][1] &&
    puzzle[0][0] === puzzle[2][2]
  ) {
    return true
  }
  if (
    puzzle[0][2] !== null &&
    puzzle[0][2] === puzzle[1][1] &&
    puzzle[0][2] === puzzle[2][0]
  ) {
    return true
  }

  return false
}

export function hasSpace(puzzle: Array<Array<string | null>>): boolean {
  for (const row of puzzle) {
    for (const cell of row) {
      if (cell === null) {
        return true
      }
    }
  }
  return false
}

export function createMachine() {
  const puzzle = createPuzzle()
  const nextPlayer = ref<'X' | 'O'>('X')

  const onCellClick = (row: number, col: number) => {
    puzzle.value[row][col] = nextPlayer.value
    nextPlayer.value = nextPlayer.value === 'X' ? 'O' : 'X'
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
    hasWinner: computed(() => {
      return hasWinner(puzzle.value)
    }),
    hasSpace: computed(() => {
      return hasSpace(puzzle.value)
    }),
  })
}
