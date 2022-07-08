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
                    <div style={{visibility: "hidden"}} >
                        <img width={"100%"} src={chicken} alt={`${props.color} chicken`}/>
                    </div>
                    :
                    <div style={{backgroundColor: props.color}} >
                        <img width={"100%"} src={chicken} alt={`${props.color} chicken`}/>
                    </div>
            }
        </div>
    )
}