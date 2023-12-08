import React, { memo, useCallback } from 'react';
import { NodeToolbar, useReactFlow, useStoreApi, Position } from 'reactflow';
import { MlNodeParams, CandleStepNames, IManagment } from '../../../constants/mlNodeParams';
import { Title } from 'chart.js';
import { Tooltip, Autocomplete, TextField, AutocompleteRenderInputParams, TooltipProps, tooltipClasses, AutocompleteProps, IconButton } from '@mui/material';
import Cube from '../../ui/Cube';
import { TypographyHeader, TypographyMain } from '../../ui/Typography';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import { MlNodeTip } from '../../../constants/nodeData';
import { MlNodesColors } from '../../../constants/nodeData';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { useMLFlow } from '../../../hooks/MlFlowProvider';
import MenuButton from '../../ui/MenuButton';
import risk_icon from '../../../assets/risk_icon.png';
import save_icon from '../../../assets/save_icon.png';
import Button from '../../ui/Button';
import { Backdrop } from '@mui/material';
import ManagmentForm from '../../components/ManagmentForm';
import ApiAlgo from '../../../services/apiAlgo';
import { useLocation } from 'react-router-dom';


interface ModelNodeProps {
    id: string;
    data: {
        title: string;
        params: {
            candleStep: string;
            management: IManagment;
            version: string;
        };
    };
}

interface StyledAutocompleteProps extends AutocompleteProps<unknown, boolean | undefined, boolean | undefined, boolean | undefined> {
    mycolor: string;
}

const StyledAutocomplete = styled(Autocomplete)<StyledAutocompleteProps>(({ mycolor }) => ({
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
        fontSize: '10px',
    },
    '& .MuiAutocomplete-tag': {
        fontSize: '10px',
        height: '20px',
    },
    '& .MuiInputLabel-root': {
        fontSize: '10px',
    },
    '& .MuiAutocomplete-option[data-focus="true"]': {
        backgroundColor: mycolor,
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: mycolor,
            borderWidth: '1px',
        },
        '& fieldset': {
            borderRadius: '10px',
        },
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: mycolor,
    },
    '& .MuiAutocomplete-clearIndicator, & .MuiAutocomplete-popupIndicator': {
        padding: '0px',
        height: '20px',
    },
    '& .MuiAutocomplete-clearIndicator': {
        display: 'none',
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-endAdornment': {
        padding: '0px',
    },
    '.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-sizeSmall.MuiInputBase-adornedStart.MuiInputBase-adornedEnd.Mui-readOnly.MuiAutocomplete-inputRoot.MuiInputBase-readOnly.css-1i9jdwy-MuiInputBase-root-MuiOutlinedInput-root': {
        padding: '2px',
    },
    '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall .MuiAutocomplete-input': {
        padding: '0px'
    }
}));

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 11,
    },
}));

const ModelNode: React.FC<ModelNodeProps> = ({ id, data }) => {
    const MlFlowContext = useMLFlow();
    if (!MlFlowContext) throw new Error("MlFlowProvider is missing");
    const { nodes, setNodes, currentNode, setCurrentNode, getNodeId, createFeatureObject, updateModelCandleStep,
        updateModelManagment, getModelCandleStep, getModelVersionId } = MlFlowContext;

    const [selectedCandleSteps, setSelectedCandleSteps] = useState<string>('');
    const [management, setManagment] = useState<IManagment | null>();
    const [openManagment, setOpenManagment] = useState<boolean>(false);

    const location = useLocation();
    const pathSegments = location.pathname.split("/");


    useEffect(() => {
        setSelectedCandleSteps(data.params.candleStep)
        setManagment(data.params.management)
    }, [])
    const color = MlNodesColors[data.title];

    useEffect(() => {
        updateModelCandleStep(id, CandleStepNames[selectedCandleSteps])
    }, [selectedCandleSteps])

    useEffect(() => {
        if (management) updateModelManagment(id, management)
    }, [management])

    const updateManagment = (newManagment: IManagment) => {
        setManagment(newManagment);
    };
    const updateOpenForm = (newOpen: boolean) => {
        setOpenManagment(newOpen);
    };


    const handleDelete = useCallback(() => {
        setNodes(nodes.filter(node => node.id !== id));
        if (currentNode?.id === id) {
            setCurrentNode(null);
        }
    }, [id, nodes, setNodes, currentNode, setCurrentNode]);

    const handleCopy = useCallback(() => {
        if (currentNode) {
            const newNode = {
                id: getNodeId(),
                type: "model",
                position: {
                    x: currentNode.position.x + 20,
                    y: currentNode.position.y - 20,
                },
                data: {
                    title: currentNode.data.title,
                    params: {
                        features: [],
                        period: []
                    }
                },
            };
            setNodes(nodes => [...nodes, newNode]);
        }
    }, [currentNode, getNodeId, setNodes]);

    function handleBacktest() {
        ApiAlgo.backtest(pathSegments[pathSegments.length - 1], getModelCandleStep(id)).then((res) => {
            console.log(res, 'resBack')
        });
    }

    function handleSaveModel() {
        ApiAlgo.update(pathSegments[pathSegments.length - 1], createFeatureObject(id), getModelVersionId(id)).then((res) => {
            console.log(res, 'resSave')
        });
    }

    return (
        <>
            <NodeToolbar isVisible={currentNode?.id === id}>
                <IconButton onClick={handleDelete} >
                    <DeleteOutlineIcon />
                </IconButton>
                <IconButton onClick={handleCopy}>
                    <CopyAllIcon />
                </IconButton>
            </NodeToolbar>
            <div style={{
                width: '420px', backgroundColor: 'white', border: `1px solid ${color}`, borderRadius: '0 0 24.5px 24.5px',
                minHeight: '800px'
            }}>
                <div style={{ backgroundColor: color, height: '55px', display: 'flex', justifyContent: 'space-around' }}>
                    <MenuButton iconSrc={risk_icon} sx={{ width: '150px', lineHeight: 1.2, height: '38px', fontSize: '10px' }} active={true}
                        onClick={() => { setOpenManagment(true) }}>Настроить риск-менеджмент</MenuButton>
                    <MenuButton iconSrc={save_icon} sx={{ width: '150px', lineHeight: 1.2, height: '38px', fontSize: '10px' }} active={true}
                        onClick={handleSaveModel}>Сохранить версию модели</MenuButton>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '50%', padding: 2 }}>
                        <>
                            <TypographyMain sx={{ ml: 2, fontSize: '11px' }}>Задайте интервал для свеч</TypographyMain>
                            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                                <StyledAutocomplete
                                    mycolor={color}
                                    size="small"
                                    color='secondary.dark'
                                    options={Object.keys(CandleStepNames) || []}
                                    value={selectedCandleSteps}
                                    onChange={(_, newValue) => {
                                        setSelectedCandleSteps(newValue as string);
                                    }}
                                    renderInput={(params: AutocompleteRenderInputParams) => (
                                        <TextField {...params} InputProps={{ ...params.InputProps, readOnly: true }} />
                                    )}
                                />
                            </div>
                        </>
                    </div>
                    <div style={{ backgroundColor: color, height: '55px', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TypographyHeader sx={{ pl: 2, fontSize: '20px' }}>{data.title}</TypographyHeader>
                        <Button onClick={handleBacktest} sx={{ width: '90%', height: '20px', fontSize: '10px', mr: 2, mt: 0 }}>BACKTEST</Button>
                    </div>
                </div>
            </div >
            <Backdrop
                sx={{ color: '#fff', zIndex: 10000 }}
                open={openManagment}>
                <ManagmentForm updateManagment={updateManagment} updateOpenForm={updateOpenForm} origManagment={data.params.management} />
            </Backdrop>
        </>
    );
};

export default memo(ModelNode);
