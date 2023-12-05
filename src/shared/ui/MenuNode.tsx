import { TypographyMain } from "./Typography";

interface MenuNodeProps {
    nodeGroup: string; //node group to add color label
    title: string; //what is written on node
}

function MenuNode({ nodeGroup, title }: MenuNodeProps) {

    function onDragStart(
        event: React.DragEvent<any>,
        data: MenuNodeProps
    ): void {
        //start drag event
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
                    display: 'flex', justifyContent: 'space-between', width: '240px', margin: 5, border: 'dashed 1px #000000',
                    borderRadius: '10px', height: '40px', backgroundColor: 'white'
                }}
                onDragStart={(event) =>
                    onDragStart(event,
                        {
                            nodeGroup: nodeGroup,
                            title: title
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
                    backgroundColor: (nodeGroup === 'lags') ? 'green' : 'purple',
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