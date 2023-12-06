import { useCallback, useState, useRef } from 'react';
import ReactFlow, {
    Node,
    addEdge,
    Background,
    Edge,
    Controls,
    applyNodeChanges,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyEdgeChanges,
    Panel,
    ReactFlowInstance
} from "reactflow";
import 'reactflow/dist/style.css';

import FlowSideBar from '../components/FlowSideBar';
import { IMenuNode } from '../../models/IMenuNode';
import CustomNode from './nodes/CustomNode';
import FeatureNode from './nodes/FeatureNode';

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

const initialNodes: Node[] = [
    {
        id: 'A',
        type: 'group',
        data: { label: null },
        position: { x: 0, y: 0 },
        style: {
            width: 170,
            height: 200,
        },
    },
    {
        id: 'B',
        type: 'input',
        data: { label: 'child node 1' },
        position: { x: 10, y: 10 },
        parentNode: 'A',
        extent: 'parent',
    },
    {
        id: 'C',
        data: { label: 'child node 2' },
        position: { x: 10, y: 90 },
        parentNode: 'A',
        extent: 'parent',
    },
    {
        id: 'D',
        data: { label: 'child node 3' },
        position: { x: 10, y: 200 },
        parentNode: 'A',
        extent: 'parent',
    },
    {
        id: '4',
        type: 'custom',
        position: { x: 100, y: 200 },
        data: {
            selects: {
                'handle-0': 'smoothstep',
                'handle-1': 'smoothstep',
            },
        },
        parentNode: 'A',
        extent: 'parent',
    },
    {
        id: '5',
        type: 'feature',
        position: { x: 100, y: 200 },
        data: {
            title: 'Lags',
            params: {
                'features': ['open', 'close', 'high', 'low', 'value', 'volume', 'target'],
                'period': ['1', '2', '3', '4', '10', '14', '20', '50', '100']
            }
        },
    },
    {
        id: '6',
        type: 'feature',
        position: { x: 100, y: 200 },
        data: {
            title: 'CMA',
            params: {
                'features': ['open', 'close', 'high', 'low', 'value', 'volume'],
            }
        },
    },
    {
        id: '7',
        type: 'feature',
        position: { x: 100, y: 200 },
        data: {
            title: 'SMA',
            params: {
                'features': ['open', 'close', 'high', 'low', 'value', 'volume'],
                'period': ['2', '3', '4', '10', '14', '20', '50', '100']
            },
        },
    },
    {
        id: '8',
        type: 'feature',
        position: { x: 100, y: 200 },
        data: {
            title: 'EMA',
            params: {
                'features': ['open', 'close', 'high', 'low', 'value', 'volume'],
                'period': ['2', '3', '4', '10', '14', '20', '50', '100']
            },
        },
    },
    {
        id: '9',
        type: 'feature',
        position: { x: 100, y: 200 },
        data: {
            title: 'Green candles ratio',
            params: {
                'period': ['2', '3', '4', '10', '14', '20', '50', '100']
            },
        },
    },
    {
        id: '10',
        type: 'feature',
        position: { x: 100, y: 200 },
        data: {
            title: 'Red candles ratio',
            params: {
                'period': ['2', '3', '4', '10', '14', '20', '50', '100']
            },
        },
    },
    {
        id: '11',
        type: 'feature',
        position: { x: 100, y: 200 },
        data: {
            title: 'RSI',
            params: {
                'period': ['2', '3', '4', '10', '14', '20', '50', '100']
            },
        },
    },
    {
        id: '12',
        type: 'feature',
        position: { x: 100, y: 200 },
        data: {
            title: 'MACD',
            params: {
                'period': ['12', '26']
            },
        },
    },
    {
        id: '13',
        type: 'feature',
        position: { x: 100, y: 200 },
        data: {
            title: 'Bollinger',
            params: {
                'period': ['2']
            },
        },
    },
];


function AlgoFlow({ type }: { type: 'algo' | 'ml' | undefined }) {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);


    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    function getNodeId(nodeType: string) {
        return nodeType + "-" + Math.floor(Math.random() * 1000);
    }

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            console.log('here')
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
                let newId = getNodeId(title);
                let newNode: Node;

                if (!data.isParent) {
                    // Create a new node object
                    console.log('newnode')
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
                setNodes((nds) => nds.concat(newNode));
            }
        },
        // Specify dependencies for useCallback
        [getNodeId, reactFlowInstance, setNodes]
    );

    const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };


    return (
        <div ref={reactFlowWrapper} style={{ width: '100%', height: 'calc(100vh - 200px)' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
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
