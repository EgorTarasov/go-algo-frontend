import { Box } from "@mui/material";
import MenuNode from "../ui/MenuNode";
import { MlNodeSectionNames, MlNodeSectionNodes, IfNodesSectionNames, IfNodeSectionNodes } from '../../constants/nodeData';
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
                            .map((sectionName: string, index: number) => (
                                <>
                                    <TypographyMain key={index} >{MlNodeSectionNames[sectionName]}</TypographyMain>
                                    {MlNodeSectionNodes[sectionName].map((nodeName) => (
                                        <MenuNode nodeGroup={sectionName} title={nodeName} blockType={type}
                                        isParent={sectionName === 'models'}/>
                                    ))}
                                </>
                            ))}
                    </Box>


                </>
            }
            {type === 'algo' &&
                <>
                    <Box sx={{ p: 2, overflowY: 'auto', maxHeight: '98%',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    msOverflowStyle: 'none'}}>
                        {Object.keys(IfNodesSectionNames)
                            .map((sectionName: string) => (
                                <>
                                    <TypographyMain>{IfNodesSectionNames[sectionName]}</TypographyMain>
                                    {IfNodeSectionNodes[sectionName].map((nodeName) => (
                                        <MenuNode nodeGroup={sectionName} title={nodeName} blockType={type}
                                        isParent={sectionName === 'algo'}/>
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