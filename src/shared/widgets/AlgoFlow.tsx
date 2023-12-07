import { useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
    Node,
    addEdge,
    Background,
    Controls,
    applyNodeChanges,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyEdgeChanges,
    Panel
} from "reactflow";
import 'reactflow/dist/style.css';

import FlowSideBar from '../components/FlowSideBar';
import { IMenuNode } from '../../models/IMenuNode';
import CustomNode from './nodes/CustomNode';
import FeatureNode from './nodes/FeatureNode';
import { useMLFlow } from '../../hooks/MlFlowProvider';

const initialEdges = [{ id: 'b-c', source: 'B', target: 'C' }];

const rfStyle = {
    backgroundColor: '#F3F4F6',
    borderRadius: '20px',
    border: 'solid #AAB0FF 10px',
    zIndex: -1
};

const nodeTypes = {
    custom: CustomNode,
    feature: FeatureNode,
};

function AlgoFlow({ type }: { type: 'algo' | 'ml' | undefined }) {
    const MlFlowContext = useMLFlow();
    if (!MlFlowContext) throw new Error("MlFlowProvider is missing");
    const { nodes, setNodes, reactFlowInstance, setReactFlowInstance, setCurrentNode, getNodeId } = MlFlowContext;
    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
        [setNodes],
    );

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            if (event.dataTransfer.types.some((types) => types === "nodedata")) {
                // takeSnapshot();

                // Get the current bounds of the ReactFlow wrapper element
                const reactflowBounds =
                    reactFlowWrapper.current?.getBoundingClientRect();

                // Extract the data from the drag event and parse it as a JSON object
                let data: IMenuNode = JSON.parse(
                    event.dataTransfer.getData("nodedata")
                );

                // Calculate the position where the node should be created
                const position = reactFlowInstance!.project({
                    x: event.clientX - reactflowBounds!.left,
                    y: event.clientY - reactflowBounds!.top,
                });

                // Generate a unique node ID
                let { title } = data;
                let newId = getNodeId();
                let newNode: Node;

                if (!data.isParent) {
                    // Create a new node object
                    console.log('newnode')
                    newNode = {
                        id: newId,
                        type: "feature",
                        position,
                        data: {
                            title: title,
                            params: {
                                features: [],
                                period: []
                            }
                        },
                    };
                } else {
                    // Create a new node object
                    newNode = {
                        id: newId,
                        type: "genericNode",
                        position,
                        data: {
                            ...data,
                            id: newId,
                            label: data.title
                        },
                    };

                    // Add the new node to the list of nodes in state
                }
                setNodes((nds: Node[]) => nds.concat(newNode));
            }
        },
        // Specify dependencies for useCallback
        [getNodeId, reactFlowInstance, setNodes]
    );

    const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const onNodeClick = useCallback(
        (_: React.MouseEvent, node: Node) => {
            setCurrentNode(node);
        },
        [setCurrentNode],
    );

    const onPaneClick = useCallback(
        () => {
          setCurrentNode(null);
        },
        [setCurrentNode],
      );

    return (
        <div ref={reactFlowWrapper} style={{ width: '100%', height: 'calc(100vh - 200px)' }}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                fitView
                style={rfStyle}
                proOptions={{ hideAttribution: true }}
                nodeTypes={nodeTypes}
            >
                <Background />
                <Panel position="top-left" style={{ height: '100%', width: '290px', backgroundColor: '#D4D7DE', margin: 0 }}>
                    <FlowSideBar type={type ? type : 'algo'} />
                </Panel>
                <Controls position='bottom-right' />
            </ReactFlow>
        </div>
    );
}

export default AlgoFlow;
