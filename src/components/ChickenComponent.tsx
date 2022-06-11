import "./GamesOverview.css"
import chicken from "./chicken-icon.png"

interface ChickenComponentProps {
    color: string
}

export default function ChickenComponent (props: ChickenComponentProps) {

    return (
        <div style={{backgroundColor: props.color}} className="containercolor">
            <img className="chicken" src={chicken} alt={`${props.color} chicken`}/>
        </div>
    )
}