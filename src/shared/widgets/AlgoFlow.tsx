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
import { useAllStock } from '../../hooks/AllStockDataProvider';

import FlowSideBar from '../components/FlowSideBar';
import { IMenuNode } from '../../models/IMenuNode';
import FeatureNode from './nodes/FeatureNode';
import { useMLFlow } from '../../hooks/MlFlowProvider';
import ModelNode from './nodes/ModelNode';
import ApiAlgo from '../../services/apiAlgo';
import { useLocation } from 'react-router-dom';


const rfStyle = {
    backgroundColor: '#F3F4F6',
    borderRadius: '20px',
    border: 'solid #AAB0FF 10px',
    zIndex: -1
};

const nodeTypes = {
    feature: FeatureNode,
    model: ModelNode,
};

function AlgoFlow({ type }: { type: 'algo' | 'ml' | undefined }) {
    const MlFlowContext = useMLFlow();
    if (!MlFlowContext) throw new Error("MlFlowProvider is missing");
    const { nodes, setNodes, reactFlowInstance, setReactFlowInstance, setCurrentNode, getNodeId, checkUniqueChild } = MlFlowContext;
    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const stockContext = useAllStock();
    if (!stockContext) throw new Error("AllStockProvider is missing");
    const { fetchSetCurrentStock } = stockContext;

    const location = useLocation();
    const pathSegments = location.pathname.split("/");


    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
        [setNodes],
    );

    useEffect(() => {
        ApiAlgo.getAlgoMl(pathSegments[pathSegments.length - 1]).then((res) => {
            fetchSetCurrentStock(res.sec_id);
            // fetchSetCurrentStock('SBER');
        });
    }, [])

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            console.log(nodes)
            if (event.dataTransfer.types.some((types) => types === "nodedata")) {
                const reactflowBounds = reactFlowWrapper.current?.getBoundingClientRect();
                let data: IMenuNode = JSON.parse(event.dataTransfer.getData("nodedata"));
                const position = reactFlowInstance!.project({
                    x: event.clientX - reactflowBounds!.left,
                    y: event.clientY - reactflowBounds!.top,
                });
                let { title } = data;
                let newId = getNodeId();
                let newNode: Node;

                if (!data.isParent) {
                    const modelNode = nodes.find(node => node.type === 'model' &&
                    position.x > node.position.x && position.x < node.position.x + 420 &&
                    position.y > node.position.y && position.y < node.position.y + 800);
                    console.log('x', position.x, 'y', position.y, 
                    'modelnode.x', modelNode?.position.x, 'modelnode/y', modelNode?.position.y)

                     if (!modelNode) {
                        alert('Перенесите фичи внутрь модели');
                        return;
                    }

                    if(!checkUniqueChild(modelNode, title)) {
                        alert('В одной модели могут быть фичи только разного вида, то есть каждая фича должна быть в одном экземпляре');
                        return;
                    }


                    newNode = {
                        id: newId,
                        type: "feature",
                        position: {
                            x: 0,
                            y: 350
                        },
                        data: {
                            title: title,
                            params: {
                                features: [],
                                period: []
                            }
                        },
                        parentNode: modelNode.id,
                        extent: 'parent'
                    };
                } else {
                    newNode = {
                        id: newId,
                        type: "model",
                        position,
                        data: {
                            title: title,
                            params: {
                                management: {
                                    "balance": 0,
                                    "max_balance_for_trading": 0,
                                    "min_balance_for_trading": 0,
                                    "part_of_balance_for_buy": 0,
                                    "sum_for_buy_rur": 0,
                                    "sum_for_buy_num": 0,
                                    "part_of_balance_for_sell": 0,
                                    "sum_for_sell_rur": 0,
                                    "sum_for_sell_num": 0,
                                    "sell_all": false,
                                },
                                candleStep: '1 минута'
                            }
                        },
                    };
                }
                setNodes((nds: Node[]) => nds.concat(newNode));
            }
        },
        [getNodeId, reactFlowInstance, setNodes, nodes]
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
