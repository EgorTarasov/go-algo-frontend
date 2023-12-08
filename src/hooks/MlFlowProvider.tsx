import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import ReactFlow, {
    Node,
    Edge,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    ReactFlowInstance
} from "reactflow";
import { useCallback } from 'react';
import { MlNodeSectionNodes } from '../constants/nodeData'
import { MlNodeParams, IManagment } from '../constants/mlNodeParams';
import { v4 as uuidv4 } from 'uuid';
import ApiAlgo from '../services/apiAlgo';

interface MLFlowContextProps {
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    reactFlowInstance: ReactFlowInstance | null;
    setReactFlowInstance: React.Dispatch<React.SetStateAction<ReactFlowInstance | null>>;
    currentNode: Node | null;
    setCurrentNode: React.Dispatch<React.SetStateAction<Node | null>>;
    getNodeId: () => string;
    checkUniqueChild: (parentNode: Node, childType: string) => boolean;
    updateNodeFeatures: (id: string, features: string[]) => void;
    updateNodePeriods: (id: string, periods: string[]) => void;
    updateModelManagment: (id: string, management: IManagment) => void;
    updateModelCandleStep: (id: string, candleStep: string) => void;
    getModelCandleStep: (id: string) => string;
    createFeatureObject: (parentId: string) => { features: Record<string, any>, management: any, nodes: Node[] };
}

const MLFlowContext = createContext<MLFlowContextProps | null>(null);

export function MLFlowProvider({ children }: { children: ReactNode }) {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [currentNode, setCurrentNode] = useState<Node | null>(null);


    const getNodeId = useCallback(() => {
        return uuidv4();
    }, [nodes]);

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

    function getModelCandleStep(id: string){
        const modelNode = nodes.find(node => node.id === id);
        return modelNode?.data.params.candleStep;
    }

    const createFeatureObject = (parentId: string) => {
        const parentNode = nodes.find(node => node.id === parentId);
        if (!parentNode) {
            throw new Error(`Node with id ${parentId} not found`);
        }
        console.log(parentNode.data.params.management)
    
        const childNodes = nodes.filter(node => node.parentNode === parentId);
        const features: Record<string, any> = {};
    
        features['time_features'] = MlNodeSectionNodes['timeFeatures'].reduce((acc: Record<string, boolean>, curr) => {
            acc[curr] = false;
            return acc;
        }, {});
    
        for (const childNode of childNodes) {
            const title = childNode.data.title.toLowerCase().replace(/ /g, '_');
            if (MlNodeSectionNodes['timeFeatures'].includes(title)) {
                features['time_features'][title] = true;
            } else if(title === 'macd') {
                features[title] = {
                    'period': [12, 26]
                }
            } else if(title === 'bollinger'){
                features[title] = {
                    'period': childNode.data.params.period,
                    'degree_of_lift': childNode.data.params.features,
                }
            }
            else {
                const validParams = Object.keys(childNode.data.params).filter(key => (MlNodeParams[childNode.data.title] as Record<string, any>)[key]);
                const params = validParams.reduce((acc: Record<string, any>, curr) => {
                    acc[curr] = childNode.data.params[curr];
                    return acc;
                }, {});
                features[title] = params;
            }
        }
    
        features['model'] =  parentNode.data.title.toLowerCase();
    
        return {
            features,
            nodes: [parentNode, ...childNodes],
            management: parentNode.data.params.management,
        };
    };
    




    const value = {
        nodes, setNodes, reactFlowInstance, setReactFlowInstance,
        currentNode, setCurrentNode, getNodeId, checkUniqueChild, updateNodeFeatures, updateNodePeriods, createFeatureObject,
        updateModelManagment, getModelCandleStep, updateModelCandleStep
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


