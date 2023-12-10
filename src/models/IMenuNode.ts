export interface IMenuNode {
    nodeGroup: string; //node group to add color label
    title: string; //what is written on node
    isParent: boolean;
    blockType: 'algo' | 'ml'
}