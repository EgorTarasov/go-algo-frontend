import React, { useMemo } from 'react';
import { getConnectedEdges, Handle, useNodeId, useStore, Position } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

type Selector = {
    nodeInternals: any,
    edges: any,
};

const selector = (s: any): Selector => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges,
});

type Props = {
    type: 'source' | 'target',
    position: Position.Top | Position.Right | Position.Bottom | Position.Left,
    isConnectable: (({ node, connectedEdges }: { node: any, connectedEdges: any }) => boolean) | number | boolean,
};


const CustomHandle: React.FC<Props> = (props: Props) => {
    const { nodeInternals, edges } = useStore(selector);
    const nodeId = useNodeId();

    const isHandleConnectable = useMemo(() => {
        if (typeof props.isConnectable === 'function') {
            const node = nodeInternals.get(nodeId);
            const connectedEdges = getConnectedEdges([node], edges);

            // Allow connection if the node is of the same type
            return props.isConnectable({ node, connectedEdges }) || node.type === props.type;
        }

        if (typeof props.isConnectable === 'number') {
            const node = nodeInternals.get(nodeId);
            const connectedEdges = getConnectedEdges([node], edges);

            return connectedEdges.length < props.isConnectable;
        }

        return props.isConnectable;
    }, [nodeInternals, edges, nodeId, props.isConnectable]);

    return (
        <Handle {...props} isConnectable={isHandleConnectable} id={uuidv4()} ></Handle>
    );
};

export default CustomHandle;
