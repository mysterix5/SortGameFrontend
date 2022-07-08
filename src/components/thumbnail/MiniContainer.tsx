import MiniChicken from "./MiniChicken";
import {Box} from "@mui/material";
import {Container} from "../../models";

interface MiniContainerProps {
    container: Container;
}

const borderResetColor = '#3e972a'

export default function MiniContainer(props: MiniContainerProps){

    function getDummyContainers() {
        let dummies = [];
        for(let i = props.container.colorList.length; i<props.container.height; i++){
            dummies.push(<MiniChicken key={i} color="WHITE" dummy={true}/>);
        }
        return dummies;
    }

    return (
        <Box display={"flex"} flexDirection={"column-reverse"} border={borderResetColor}>
            {
                props.container.colorList.map(
                    (c, i)=> (
                    <MiniChicken key={i} color={c} dummy={false}/> ))
            }
            {
                getDummyContainers()
            }
        </Box>
    )
}