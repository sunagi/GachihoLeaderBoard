interface Props {
    n: number
}

export default function Rank(props: Props) {
    const style = { fontSize: '2em' }; // Adjust the size as needed
    const thStyle = { backgroundColor: 'white', color: 'black' }; // Style for "th"

    if (props.n == 1) return <div style={style}>🥇</div>
    if (props.n == 2) return <div style={style}>🥈</div>
    if (props.n == 3) return <div style={style}>🥉</div>
    return <div style={thStyle}>{props.n}th</div>
}
