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

  const onCellClick = (row: number, col: number) => {
    puzzle.value[row][col] = Math.random() > 0.5 ? 'X' : 'O'
  }

  return {
    puzzle,
    onCellClick,
  }
}
