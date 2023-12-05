import { Box } from "@mui/material";
import MenuNode from "../ui/MenuNode";
import { MlNodeSectionNames, MlNodeSectionNodes } from '../../constants/nodeData';
import { TypographyMain } from "../ui/Typography";

interface FlowSideBarProps {
    type: 'algo' | 'ml';
}

function FlowSideBar({ type }: FlowSideBarProps) {
    return (
        <>
            {type === 'ml' &&
                <>
                    <Box sx={{ p: 2, overflowY: 'auto', maxHeight: '98%',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    msOverflowStyle: 'none'}}>
                        {Object.keys(MlNodeSectionNames)
                            .map((sectionName: string) => (
                                <>
                                    <TypographyMain>{MlNodeSectionNames[sectionName]}</TypographyMain>
                                    {MlNodeSectionNodes[sectionName].map((nodeName) => (
                                        <MenuNode nodeGroup={sectionName} title={nodeName} />
                                    ))}
                                </>
                            ))}
                    </Box>


                </>
            }
        </>
    );
}

export default FlowSideBar;