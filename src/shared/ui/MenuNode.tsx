import { TypographyMain } from "./Typography";
import { IMenuNode } from "../../models/IMenuNode";
import { MlNodesColors } from "../../constants/nodeData";

function MenuNode({ nodeGroup, title, isParent }: IMenuNode) {

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
                    borderRadius: '10px', height: '40px', backgroundColor: 'white'
                }}
                onDragStart={(event) =>
                    onDragStart(event,
                        {
                            nodeGroup: nodeGroup,
                            title: title,
                            isParent: isParent
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
                    backgroundColor: MlNodesColors[title],
                    width: '10%', borderRadius: '10px 0 0 10px'
                }}></span>
                <TypographyMain sx={{ alignSelf: 'center' }}>
                    {title}
                </TypographyMain>
            </div>
        </>
    );
}

export default MenuNode;