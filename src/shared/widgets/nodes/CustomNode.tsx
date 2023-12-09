import React, { memo } from 'react';
import { Position } from 'reactflow';
import IfHandle from '../handles/IfHandle'

const CustomNode = () => {
    return (
        <div style={{ background: 'white', padding: 16, border: '1px solid black' }}>
            <IfHandle type="target" position={Position.Top} isConnectable={1} />
            <IfHandle type="source" position={Position.Bottom} isConnectable={1} />
            <div>Connection Limit 1</div>
        </div>
    );
};

export default memo(CustomNode);
