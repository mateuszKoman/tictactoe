export default function Log({turns}) {
    const rowColMap = {
        0: 'first',
        1: 'second',
        2: 'third'
    }

    return <ol id="log">
        {turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>
            <strong>{turn.playerName}</strong> selected <strong>{rowColMap[turn.square.row]}</strong> row <strong>{rowColMap[turn.square.col]}</strong> column
        </li>)}
    </ol>
}