import { useCallback, useState } from 'react';
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
    Panel
} from "reactflow";
import 'reactflow/dist/style.css';

import FlowSideBar from '../components/FlowSideBar';

const initialEdges = [{ id: 'b-c', source: 'B', target: 'C' }];

const rfStyle = {
    backgroundColor: '#F3F4F6',
    borderRadius: '20px',
    border: 'solid #AAB0FF 10px',
    zIndex: -1
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
];


function AlgoFlow() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

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

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            style={rfStyle}
            attributionPosition="top-right"
        >
            <Background />
            <Panel position="top-left" style={{height: '100%', width: '290px', backgroundColor: '#D4D7DE', margin: 0}}>
                <FlowSideBar type='ml'/>
            </Panel>
            <Controls position='bottom-right'/>
        </ReactFlow>
    );
}

export default AlgoFlow;
