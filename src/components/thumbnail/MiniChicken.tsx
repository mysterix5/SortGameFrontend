import chicken from "../chicken-icon.png"
import {Box} from "@mui/material";

interface MiniChickenProps {
    color: string;
    dummy: boolean;
}

export default function MiniChicken (props: MiniChickenProps) {

    return (
        <Box margin={0.1}>
            {
                props.dummy
                    ?
                    <Box style={{visibility: "hidden"}}>
                        <img width={"100%"} src={chicken} alt={`${props.color} chicken`}/>
                    </Box>
                    :
                    <Box style={{backgroundColor: props.color}} >
                        <img width={"100%"} src={chicken} alt={`${props.color} chicken`}/>
                    </Box>
            }
        </Box>
    )
}