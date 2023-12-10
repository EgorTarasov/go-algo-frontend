import { createContext, useContext, useState, ReactNode } from 'react';
import  {
    Node,
    Edge,
    ReactFlowInstance,
    useEdgesState,
    EdgeChange
} from "reactflow";
import { MlNodeSectionNodes } from '../constants/nodeData'
import { MlNodeParams, IManagment } from '../constants/mlNodeParams';
import { v4 as uuidv4 } from 'uuid';
import { IIfNode } from '../models/IIfNode';
import { IBacktestResult } from '../models/IAlgorithm';

interface nodeField {
    node: Node[],
    edge: Edge[]
}

interface BacktestWithId {
    version_id: string;
    backtestData: IBacktestResult;
    [key: string]: string | IBacktestResult;
}



interface MLFlowContextProps {
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    showBacktest: boolean;
    setShowBacktest: React.Dispatch<React.SetStateAction<boolean>>;
    backtestData: BacktestWithId | null;
    setBacktestData: React.Dispatch<React.SetStateAction<BacktestWithId | null>>;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    onEdgesChange: (changes: EdgeChange[]) => void;
    algoName: string | null;
    setAlgoName: React.Dispatch<React.SetStateAction<string | null>>;
    reactFlowInstance: ReactFlowInstance | null;
    setReactFlowInstance: React.Dispatch<React.SetStateAction<ReactFlowInstance | null>>;
    currentNode: Node | null;
    setCurrentNode: React.Dispatch<React.SetStateAction<Node | null>>;
    getNodeId: () => string;
    checkUniqueChild: (parentNode: Node, childType: string) => boolean;
    updateIfParams: (id: string, fields: IIfNode) => void;
    updateNodeFeatures: (id: string, features: string[]) => void;
    updateNodePeriods: (id: string, periods: string[]) => void;
    updateModelManagment: (id: string, management: IManagment) => void;
    updateModelCandleStep: (id: string, candleStep: string) => void;
    getModelCandleStep: (id: string) => string;
    getModelVersionId: (id: string) => string;
    drawNewNodes: (newNodes: Node[]) => void;
    drawNewEdges: (newEdges: Edge[]) => void;
    createFeatureObject: (parentId: string) => { features: Record<string, any>, management: any, nodes: Node[] };
    createIfObject: (parentId: string) => { features: any, management: any, nodes: nodeField };
}

const MLFlowContext = createContext<MLFlowContextProps | null>(null);

export function MLFlowProvider({ children }: { children: ReactNode }) {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [currentNode, setCurrentNode] = useState<Node | null>(null);
    const [algoName, setAlgoName] = useState<string | null>(null);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [showBacktest, setShowBacktest] = useState(false);
    const [backtestData, setBacktestData] = useState<BacktestWithId | null>(null);

    function getNodeId() {
        return uuidv4();
    }

    const checkUniqueChild = (parentNode: Node, childType: string) => {

        const childNodes = nodes.filter((node) => node.parentNode === parentNode.id);
        const hasSameTypeChild = childNodes.some((childNode) => childNode.data.title === childType);

        return !hasSameTypeChild;
    };

    const updateNodeFeatures = (id: string, features: string[]) => {
        setNodes(nodes => nodes.map(node => node.id === id ? { ...node, data: { ...node.data, params: { ...node.data.params, features } } } : node));
    };

    const updateNodePeriods = (id: string, periods: string[]) => {
        setNodes(nodes => nodes.map(node => node.id === id ? { ...node, data: { ...node.data, params: { ...node.data.params, period: periods } } } : node));
    };

    const updateModelManagment = (id: string, management: IManagment) => {
        setNodes(nodes => nodes.map(node => node.id === id ? { ...node, data: { ...node.data, params: { ...node.data.params, management: management } } } : node));
    };

    const updateModelCandleStep = (id: string, candleStep: string) => {
        setNodes(nodes => nodes.map(node => node.id === id ? { ...node, data: { ...node.data, params: { ...node.data.params, candleStep: candleStep } } } : node));
    };


    const updateIfParams = (id: string, fields: IIfNode) => {
        console.log('here', fields)
        setNodes(nodes => nodes.map(node => node.id === id ? { ...node, data: { ...node.data, params: fields } } : node));
    };

    function getModelCandleStep(id: string) {
        const modelNode = nodes.find(node => node.id === id);
        return modelNode?.data.params.candleStep;
    }

    function getModelVersionId(id: string) {
        const modelNode = nodes.find(node => node.id === id);
        return modelNode?.data.params.version;
    }

    const createFeatureObject = (parentId: string) => {
        const parentNode = nodes.find(node => node.id === parentId);
        if (!parentNode) {
            throw new Error(`Node with id ${parentId} not found`);
        }

        parentNode.selected = false;

        const childNodes = nodes.filter(node => node.parentNode === parentId);
        const features: Record<string, any> = {};

        features['time_features'] = MlNodeSectionNodes['timeFeatures'].reduce((acc: Record<string, boolean>, curr) => {
            acc[curr] = false;
            return acc;
        }, {});

        for (const childNode of childNodes) {
            childNode.selected = false;
            const title = childNode.data.title.toLowerCase().replace(/ /g, '_');
            if (MlNodeSectionNodes['timeFeatures'].includes(title)) {
                features['time_features'][title] = true;
            } else if (title === 'macd') {
                features[title] = {
                    'period': [[12, 26]]
                }
            } else if (title === 'bollinger') {
                features[title] = {
                    'period': Number(childNode.data.params.period),
                    'degree_of_lift': Number(childNode.data.params.features.map),
                }
            }
            else if (title === 'cma') {
                features[title] = childNode.data.params;
            }
            else {
                const validParams = Object.keys(childNode.data.params).filter(key => (MlNodeParams[childNode.data.title] as Record<string, any>)[key]);
                const params = validParams.reduce((acc: Record<string, any>, curr) => {
                    acc[curr] = childNode.data.params[curr];
                    return acc;
                }, {});
                let numberParams = {
                    ...params,
                    period: params.period.map(Number)
                };
                features[title] = numberParams;
            }
        }

        features['model'] = parentNode.data.title.toLowerCase();

        return {
            features,
            nodes: [parentNode, ...childNodes],
            management: parentNode.data.params.management,
        };
    };

    function groupNodes(nodes: Node[], edges: Edge[]): { blocks: any[][], blocksEdges: Edge[] } {
        const visited = new Set<string>();
        const blocks: any[][] = [];
        const blocksEdges: Edge[] = [];

        for (const node of nodes) {
            if (!visited.has(node.id)) {
                node.selected = false;
                const block: any[] = [];
                const stack: string[] = [node.id];

                while (stack.length > 0) {
                    const nodeId = stack.pop()!;
                    if (!visited.has(nodeId)) {
                        visited.add(nodeId);
                        const currentNode = nodes.find(n => n.id === nodeId)!;
                        block.push({
                            type: currentNode.data.type,
                            ...currentNode.data.params
                        });

                        for (const edge of edges) {
                            if (edge.source === nodeId && !visited.has(edge.target)) {
                                stack.push(edge.target);
                                if (!blocksEdges.find(e => e.source === edge.source && e.target === edge.target)) {
                                    blocksEdges.push(edge);
                                }
                            } else if (edge.target === nodeId && !visited.has(edge.source)) {
                                stack.push(edge.source);
                                if (!blocksEdges.find(e => e.source === edge.source && e.target === edge.target)) {
                                    blocksEdges.push(edge);
                                }
                            }
                        }
                    }
                }

                blocks.push(block);
            }
        }

        return { blocks, blocksEdges };
    }


    const createIfObject = (parentId: string) => {
        const parentNode = nodes.find(node => node.id === parentId);
        if (!parentNode) {
            throw new Error(`Node with id ${parentId} not found`);
        }

        parentNode.selected = false;

        const childNodes = nodes.filter(node => node.parentNode === parentId);
        const features: any = {};

        const { blocks, blocksEdges } = groupNodes(childNodes, edges);
        const featureArray: any = []
        for (const block of blocks) {
            featureArray.push({
                type: 'and',
                blocks: block
            });
        }

        features['model'] = parentNode.data.title.toLowerCase();

        return {
            features: featureArray,
            nodes: {
                node: [parentNode, ...childNodes],
                edge: blocksEdges,
            },
            management: parentNode.data.params.management,
        };
    };

    function drawNewNodes(newNodes: Node[]) {
        newNodes.map((node) => (setNodes((nds) => nds.concat(node))));
    }

    function drawNewEdges(newEdges: Edge[]) {
        let existingEdge = edges.find(edge => edge.id === newEdges[0].id);
        if (!existingEdge) {
            setEdges((prevEdges) => [...prevEdges, ...newEdges]);
        }
    }



    const value = {
        nodes, setNodes, reactFlowInstance, setReactFlowInstance,
        currentNode, setCurrentNode, getNodeId, checkUniqueChild, updateNodeFeatures, updateNodePeriods, createFeatureObject,
        updateModelManagment, getModelCandleStep, updateModelCandleStep, getModelVersionId, drawNewNodes, algoName, setAlgoName,
        edges, setEdges, createIfObject, onEdgesChange, updateIfParams, drawNewEdges, showBacktest, setShowBacktest,
        backtestData, setBacktestData
    };

    return (
        <MLFlowContext.Provider value={value}>
            {children}
        </MLFlowContext.Provider>
    );
}

export function useMLFlow() {
    return useContext(MLFlowContext);
}


