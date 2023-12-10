import { TypographyMain, TypographyHeader } from "./Typography";
import { IMenuNode } from "../../models/IMenuNode";
import { MlNodesColors, IfNodesColor } from "../../constants/nodeData";
import { styled } from '@mui/system';
import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import React from 'react';
import { MlNodeTip, IfNodeTip, IfNodeTitle , MlNodeSectionNodes, TimeTitle} from "../../constants/nodeData";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 11,
    },
}));

function MenuNode({ nodeGroup, title, isParent, blockType }: IMenuNode) {

    function onDragStart(
        event: React.DragEvent<any>,
        data: IMenuNode
    ): void {
        var crt = event.currentTarget.cloneNode(true);
        crt.style.position = "absolute";
        crt.style.top = "-500px";
        crt.style.right = "-500px";
        crt.classList.add("cursor-grabbing");
        document.body.appendChild(crt);
        event.dataTransfer.setDragImage(crt, 0, 0);
        event.dataTransfer.setData("nodedata", JSON.stringify(data));
    }
    return (
        <>
            <div draggable='true'
                style={{
                    display: 'flex', justifyContent: 'space-between', width: '240px', margin: 5, border: `dashed 1px #000000`,
                    borderRadius: '10px', height: '40px', backgroundColor: 'white', paddingRight: '10px'
                }}
                onDragStart={(event) =>
                    onDragStart(event,
                        {
                            nodeGroup: nodeGroup,
                            title: title,
                            isParent: isParent,
                            blockType: blockType
                        }
                    )
                }
                onDragEnd={() => {
                    document.body.removeChild(
                        document.getElementsByClassName(
                            "cursor-grabbing"
                        )[0]
                    );
                }}>
                <span style={{
                    backgroundColor: blockType === 'ml' ? MlNodesColors[title] : IfNodesColor[title],
                    width: '10%', borderRadius: '10px 0 0 10px'
                }}></span>
                <TypographyMain sx={{ alignSelf: 'center' }}>
                    {blockType === 'ml' ? (!MlNodeSectionNodes['timeFeatures'].includes(title) ? title : TimeTitle[title]): IfNodeTitle[title]}
                </TypographyMain>
                <LightTooltip sx={{ backgroundColor: 'white' }}
                    placement="right"
                    title={
                        <React.Fragment>
                            <TypographyHeader>{blockType === 'ml' ? (!MlNodeSectionNodes['timeFeatures'].includes(title) ? title : TimeTitle[title]): IfNodeTitle[title]}</TypographyHeader>
                            <TypographyMain> {blockType === 'ml' ? MlNodeTip[title] : IfNodeTip[title]}</TypographyMain>
                        </React.Fragment>
                    }>
                    <div style={{ alignSelf: 'center' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 9 13" fill="none">
                            <path d="M3.97233 12H3.98018M1 3.11898C1.42467 1.88592 2.59505 1 3.97233 1C5.70805 1 7.11518 2.4071 7.11518 4.14286C7.11518 5.44439 6.32405 6.56113 5.19647 7.03837C4.61441 7.28477 4.32338 7.40797 4.22155 7.50312C4.10032 7.61642 4.0773 7.65115 4.02025 7.80696C3.97233 7.93778 3.97233 8.13947 3.97233 8.54286V9.64286" stroke="black" strokeWidth="1.99386" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </LightTooltip >
            </div>
        </>
    );
}

export default MenuNode;