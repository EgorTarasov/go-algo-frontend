import React, { memo } from 'react';
import {  CandleStepNames, IManagment } from '../../../constants/mlNodeParams';
import { Autocomplete, TextField, AutocompleteRenderInputParams, AutocompleteProps } from '@mui/material';
import { TypographyHeader, TypographyMain } from '../../ui/Typography';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import { useMLFlow } from '../../../hooks/MlFlowProvider';
import MenuButton from '../../ui/MenuButton';
import risk_icon from '../../../assets/risk_icon.png';
import save_icon from '../../../assets/save_icon.png';
import Button from '../../ui/Button';
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
            blockType: string;
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


const ModelNode: React.FC<ModelNodeProps> = ({ id, data }) => {
    const MlFlowContext = useMLFlow();
    if (!MlFlowContext) throw new Error("MlFlowProvider is missing");
    const { createFeatureObject, updateModelCandleStep,
        updateModelManagment, getModelCandleStep, getModelVersionId, setShowBacktest,
        backtestData, setBacktestData } = MlFlowContext;

    const [selectedCandleSteps, setSelectedCandleSteps] = useState<string>('');
    const [management, setManagment] = useState<IManagment | null>();
    const [openManagment, setOpenManagment] = useState<boolean>(false);

    const location = useLocation();
    const pathSegments = location.pathname.split("/");


    useEffect(() => {
        setSelectedCandleSteps(data.params.candleStep)
        setManagment(data.params.management)
    }, [])
    const color = '#FF0508';

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


    function handleBacktest() {
        setShowBacktest(true)
        if ((backtestData && !backtestData[data.params.version]) || !backtestData) {
            ApiAlgo.backtest(pathSegments[pathSegments.length - 1], getModelCandleStep(id), data.params.blockType, data.params.version).then((res) => {
                setBacktestData({
                    version_id: data.params.version,
                    backtestData: res
                })
            });
        } else {
            setBacktestData(null);
        }
    }

    function handleSaveModel() {
        ApiAlgo.update(pathSegments[pathSegments.length - 1], createFeatureObject(id), getModelVersionId(id), data.params.blockType).then((res) => {
            console.log(res, 'resSave')
        });
    }

    return (
        <>
            {/* <NodeToolbar isVisible={currentNode?.id === id}>
                <IconButton onClick={handleDelete} >
                    <DeleteOutlineIcon />
                </IconButton>
                <IconButton onClick={handleCopy}>
                    <CopyAllIcon />
                </IconButton>
            </NodeToolbar> */}
            <div style={{
                width: '420px', backgroundColor: 'white', border: `1px solid ${color}`, borderRadius: '0 0 24.5px 24.5px',
                minHeight: '800px', display: openManagment ? 'flex' : 'block'
            }}>
                <div style={{width: '420px'}}>
                    <div style={{ backgroundColor: color, height: '55px', display: 'flex', justifyContent: 'space-around' }}>
                        <MenuButton iconSrc={risk_icon} sx={{ width: '150px', lineHeight: 1.2, height: '38px', fontSize: '10px' }} active={true}
                            onClick={() => {
                                setOpenManagment(true);
                            }}>Настроить риск-менеджмент</MenuButton>
                        <MenuButton iconSrc={save_icon} sx={{ width: '150px', lineHeight: 1.2, height: '38px', fontSize: '10px' }} active={true}
                            onClick={handleSaveModel}>Сохранить версию модели</MenuButton>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: !openManagment ? '50%' : '100%', padding: 2 }}>
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
                        <div style={{ backgroundColor: color, height: '55px', width: !openManagment ? '50%' : '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TypographyHeader sx={{ pl: 2, fontSize: '20px' }}>{data.title === 'algo_block' ? 'Блок алгоритма' : data.title}</TypographyHeader>
                            <Button onClick={handleBacktest} sx={{ width: '90%', height: '20px', fontSize: '10px', mr: 2, mt: 0 }}>BACKTEST</Button>
                        </div>
                    </div>
                </div>
                {openManagment &&
                <>
                    <ManagmentForm blockType='ml'
                    updateManagment={updateManagment} updateOpenForm={updateOpenForm} origManagment={data.params.management} />
                </>}
            </div >
        </>
    );
};

export default memo(ModelNode);
