import "./GamesOverview.css"
import chicken from "./chicken-icon.png"

interface ChickenComponentProps {
    color: string;
    dummy: boolean;
}

export default function ChickenComponent (props: ChickenComponentProps) {

    return (
        <div>
            {
                props.dummy
                    ?
                    <div style={{visibility: "hidden"}} className="containercolor">
                        <img className="chicken" src={chicken} alt={`${props.color} chicken`}/>
                    </div>
                    :
                    <div style={{backgroundColor: props.color}} className="containercolor">
                        <img className="chicken" src={chicken} alt={`${props.color} chicken`}/>
                    </div>
            }
        </div>
    )
}