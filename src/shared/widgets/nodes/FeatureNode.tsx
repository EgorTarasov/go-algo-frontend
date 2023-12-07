import React, { memo, useCallback } from 'react';
import { NodeToolbar, useReactFlow, useStoreApi, Position } from 'reactflow';
import { MlNodeParams, IMlNodeParams } from '../../../constants/mlNodeParams';
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


interface FeatureNodeProps {
  id: string;
  data: {
    title: string; //lags (f, p), cma(f), sma(f,p), ema(f,p), green(p), red(P), rsi(p), macd(p: always one), bollinger (p: choose one)
    params: {
      [key: string]: string[];
    };
  };
}

interface StyledAutocompleteProps extends AutocompleteProps<unknown, boolean | undefined, boolean | undefined, boolean | undefined> {
  MyColor: string;
}

const StyledAutocomplete = styled(Autocomplete)<StyledAutocompleteProps>(({ MyColor }) => ({
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
    backgroundColor: MyColor,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: MyColor,
      borderWidth: '1px',
    },
    '& fieldset': {
      borderRadius: '10px',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: MyColor,
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

const FeatureNode: React.FC<FeatureNodeProps> = ({ id, data }) => {
  const MlFlowContext = useMLFlow();
  if (!MlFlowContext) throw new Error("MlFlowProvider is missing");
  const { nodes, setNodes, currentNode, setCurrentNode, getNodeId } = MlFlowContext;

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [selectedDegree, setSelectedDegree] = useState<string[]>([]);

  useEffect(() => {
    setSelectedFeatures(data.params.features)
    setSelectedPeriods(data.params.period)
    setSelectedDegree(data.params.degree_of_lift)
  }, [])

  const color = MlNodesColors[data.title];


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
        type: "feature",
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
        width: '180px', backgroundColor: 'white', border: `1px solid ${color}`, borderRadius: '24.5px', padding: '10px',
        minHeight: '80px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', height: '15px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Cube color={color} />
            </div>
            <TypographyHeader sx={{ fontSize: '10px', ml: 2 }}>
              {data.title}
            </TypographyHeader>
          </div>
          <LightTooltip sx={{ backgroundColor: 'white' }}
            placement="right"
            title={
              <React.Fragment>
                <TypographyHeader>{data.title}</TypographyHeader>
                <TypographyMain> {MlNodeTip[data.title]}</TypographyMain>
              </React.Fragment>
            }>
            <div style={{ alignSelf: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 9 13" fill="none">
                <path d="M3.97233 12H3.98018M1 3.11898C1.42467 1.88592 2.59505 1 3.97233 1C5.70805 1 7.11518 2.4071 7.11518 4.14286C7.11518 5.44439 6.32405 6.56113 5.19647 7.03837C4.61441 7.28477 4.32338 7.40797 4.22155 7.50312C4.10032 7.61642 4.0773 7.65115 4.02025 7.80696C3.97233 7.93778 3.97233 8.13947 3.97233 8.54286V9.64286" stroke="black" stroke-width="1.99386" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </LightTooltip >
        </div>
        {data.title === 'MACD' &&
          <>
            <TypographyMain sx={{ fontSize: '10px', ml: 2 }}>Параметры для расчета скользящих средних:</TypographyMain>
            <TypographyHeader sx={{ fontSize: '10px', ml: 2 }}>12, 26</TypographyHeader>
          </>}
        {MlNodeParams[data.title]?.features &&
          <StyledAutocomplete
            MyColor={color}
            size="small"
            color='secondary.dark'
            multiple={data.title !== 'Bollinger'}
            limitTags={2}
            id="multiple-limit-tags"
            options={MlNodeParams[data.title]?.features || []}
            value={selectedFeatures}
            onChange={(_, newValue) => {
              setSelectedFeatures(newValue as string[]);
            }}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField {...params} label="Признаки" InputProps={{ ...params.InputProps, readOnly: true }} />
            )}
          />}
        {(data.title !== 'MACD' && data.title !== 'CMA') && <div style={{ height: '15px' }}></div>}
        {MlNodeParams[data.title]?.period && (data.title !== 'MACD') &&
          <StyledAutocomplete
            MyColor={color}
            size="small"
            color='secondary.dark'
            multiple={data.title !== 'Bollinger'}
            limitTags={2}
            id="multiple-limit-tags"
            options={MlNodeParams[data.title]?.period || []}
            value={selectedPeriods}
            onChange={(_, newValue) => {
              setSelectedPeriods(newValue as string[]);
            }}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField {...params} label={(data.title === 'Lags') ? 'Размер сдвига' : 'Количество свечей'} InputProps={{ ...params.InputProps, readOnly: true }} />
            )}
          />}
        {MlNodeParams[data.title]?.degree_of_lift && (data.title === 'Bollinger') &&
          <>
            <div style={{ height: '15px' }}></div>
            <StyledAutocomplete
              MyColor={color}
              size="small"
              color='secondary.dark'
              options={MlNodeParams[data.title]?.degree_of_lift || []}
              value={selectedDegree}
              onChange={(_, newValue) => {
                setSelectedDegree(newValue as string[]);
              }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField {...params} label={'Коэффициент отклонения'} InputProps={{ ...params.InputProps, readOnly: true }} />
              )}
            />
          </>}
        {(data.title !== 'MACD' && data.title !== 'CMA') && <div style={{ height: '15px' }}></div>}
      </div >
    </>
  );
};

export default memo(FeatureNode);
