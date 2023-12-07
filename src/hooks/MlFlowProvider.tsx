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

interface MLFlowContextProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: React.Dispatch<React.SetStateAction<ReactFlowInstance | null>>;
  currentNode: Node | null;
  setCurrentNode: React.Dispatch<React.SetStateAction<Node | null>>;
  getNodeId: () => string;
}

const MLFlowContext = createContext<MLFlowContextProps | null>(null);

export function MLFlowProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [currentNode, setCurrentNode] = useState<Node | null>(null);


  const getNodeId = useCallback(() => {
    const maxId = Math.max(...nodes.map(node => Number(node.id)), 0);
    return String(maxId + 1);
  }, [nodes]);


  const value = { nodes, setNodes, reactFlowInstance, setReactFlowInstance , 
    currentNode, setCurrentNode, getNodeId};

  return (
    <MLFlowContext.Provider value={value}>
      {children}
    </MLFlowContext.Provider>
  );
}

export function useMLFlow() {
  return useContext(MLFlowContext);
}


const initialNodes: Node[] = [
    {
       id: '1',
       type: 'feature',
       position: { x: 10, y: 200 },
       data: {
           title: 'Lags',
           params: {
               'features': [],
               'period': []
           }
       },
   },
   // {
   //     id: 'A',
   //     type: 'group',
   //     data: { label: null },
   //     position: { x: 0, y: 0 },
   //     style: {
   //         width: 170,
   //         height: 200,
   //     },
   // },
   // {
   //     id: 'B',
   //     type: 'input',
   //     data: { label: 'child node 1' },
   //     position: { x: 10, y: 10 },
   //     parentNode: 'A',
   //     extent: 'parent',
   // },
   // {
   //     id: '5',
   //     type: 'feature',
   //     position: { x: 100, y: 200 },
   //     data: {
   //         title: 'Lags',
   //         params: {
   //             'features': ['open', 'close', 'high', 'low', 'value', 'volume', 'target'],
   //             'period': ['1', '2', '3', '4', '10', '14', '20', '50', '100']
   //         }
   //     },
   // },
   // {
   //     id: '6',
   //     type: 'feature',
   //     position: { x: 100, y: 200 },
   //     data: {
   //         title: 'CMA',
   //         params: {
   //             'features': ['open', 'close', 'high', 'low', 'value', 'volume'],
   //         }
   //     },
   // },
   // {
   //     id: '7',
   //     type: 'feature',
   //     position: { x: 100, y: 200 },
   //     data: {
   //         title: 'SMA',
   //         params: {
   //             'features': ['open', 'close', 'high', 'low', 'value', 'volume'],
   //             'period': ['2', '3', '4', '10', '14', '20', '50', '100']
   //         },
   //     },
   // },
   // {
   //     id: '8',
   //     type: 'feature',
   //     position: { x: 100, y: 200 },
   //     data: {
   //         title: 'EMA',
   //         params: {
   //             'features': ['open', 'close', 'high', 'low', 'value', 'volume'],
   //             'period': ['2', '3', '4', '10', '14', '20', '50', '100']
   //         },
   //     },
   // },
   // {
   //     id: '9',
   //     type: 'feature',
   //     position: { x: 100, y: 200 },
   //     data: {
   //         title: 'Green candles ratio',
   //         params: {
   //             'period': ['2', '3', '4', '10', '14', '20', '50', '100']
   //         },
   //     },
   // },
   // {
   //     id: '10',
   //     type: 'feature',
   //     position: { x: 100, y: 200 },
   //     data: {
   //         title: 'Red candles ratio',
   //         params: {
   //             'period': ['2', '3', '4', '10', '14', '20', '50', '100']
   //         },
   //     },
   // },
   // {
   //     id: '11',
   //     type: 'feature',
   //     position: { x: 100, y: 200 },
   //     data: {
   //         title: 'RSI',
   //         params: {
   //             'period': ['2', '3', '4', '10', '14', '20', '50', '100']
   //         },
   //     },
   // },
   // {
   //     id: '12',
   //     type: 'feature',
   //     position: { x: 100, y: 200 },
   //     data: {
   //         title: 'MACD',
   //         params: {
   //             'period': ['12', '26']
   //         },
   //     },
   // },
   // {
   //     id: '13',
   //     type: 'feature',
   //     position: { x: 100, y: 200 },
   //     data: {
   //         title: 'Bollinger',
   //         params: {
   //             'period': ['2']
   //         },
   //     },
   // },
];