import { ref, type Ref } from 'vue'

function createPuzzle(): Ref<Array<Array<string | null>>> {
  return ref<Array<Array<string | null>>>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
}

export function createMachine() {
  const puzzle = createPuzzle()
  const nextPlayer = ref<'X' | 'O'>('X')

  const onCellClick = (row: number, col: number) => {
    puzzle.value[row][col] = nextPlayer.value
    nextPlayer.value = nextPlayer.value === 'X' ? 'O' : 'X'
  }

  return {
    puzzle,
    nextPlayer,
    onCellClick,
  }
}
