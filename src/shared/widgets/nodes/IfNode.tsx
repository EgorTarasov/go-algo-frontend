import React, { memo, useCallback } from 'react';
import { NodeToolbar, Position } from 'reactflow';
import { Tooltip, Autocomplete, TextField, AutocompleteRenderInputParams, TooltipProps, tooltipClasses, AutocompleteProps, IconButton } from '@mui/material';
import Cube from '../../ui/Cube';
import { TypographyHeader, TypographyMain } from '../../ui/Typography';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import { IfNodesColor } from '../../../constants/nodeData';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMLFlow } from '../../../hooks/MlFlowProvider';
import { IfNodeTip, IfNodeTitle } from '../../../constants/nodeData'
import { IIfNodeData, IIfNode, IIFNodeParam } from '../../../models/IIfNode';
import { IfNodeParams } from '../../../constants/mlNodeParams';
import IfHandle from '../handles/IfHandle';


interface IfNodeProps {
  id: string;
  data: IIfNodeData;
}

interface StyledAutocompleteProps extends AutocompleteProps<unknown, boolean | undefined, boolean | undefined, boolean | undefined> {
  mycolor: string;
}

interface FieldsState {
  [key: string]: IIfNode;
};


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

const IfNode: React.FC<IfNodeProps> = ({ id, data }) => {
  const MlFlowContext = useMLFlow();
  if (!MlFlowContext) throw new Error("MlFlowProvider is missing");
  const { nodes, setNodes, currentNode, setCurrentNode, updateIfParams } = MlFlowContext;

  const [fields, setFields] = useState<FieldsState>({
    anomaly: {
      feature: 'anomaly',
      condition: 'high', 
      param: 'value'
    },
    anomal_rsi: {
      feature: 'anomal_rsi',
      param: {
        period: 10,
        value: 80
      }
    },
    out_of_limits: {
      feature: 'out_of_limits',
      condition: 'high',
      param: {
        feature_name: 'close',
        limit: 277.7,
        period: 2
      }
    },
    average_cross: {
      feature: 'average_cross',
      param: {
        average_type: 'ema',
        feature_name: 'close',
        n_fast: 10,
        n_slow: 100
      }
    },
    macd_cross: {
      feature: 'macd_cross',
      param: {
        feature_name: 'close',
        n_fast: 5,
        n_slow: 50
      }
    },
  });

  const updateField = (fieldName: string, updates: Partial<IIfNode>) => {
    setFields(prevFields => ({
      ...prevFields,
      [fieldName]: {
        ...prevFields[fieldName],
        ...updates
      }
    }));
  };

  useEffect(() => {
    if(data.title) {
      console.log(id, fields[data.title])
      updateIfParams(id, fields[data.title]);
    }
  },[fields])


//   params: {
//     feature: '',
//     param: '',
// }
  useEffect(() => {
    if(data.params.param !== '' && data.params.feature !== '' )updateField(data.title, data.params)
  }, [])



  const color = IfNodesColor[data.title];



  const handleDelete = useCallback(() => {
    setNodes(nodes.filter(node => node.id !== id));
    if (currentNode?.id === id) {
      setCurrentNode(null);
    }
  }, [id, nodes, setNodes, currentNode, setCurrentNode]);


  return (
    <>
      <IfHandle type="target" position={Position.Top} isConnectable={2} />
      <IfHandle type="source" position={Position.Bottom} isConnectable={2} />
      <NodeToolbar isVisible={currentNode?.id === id}>
        <IconButton onClick={handleDelete} >
          <DeleteOutlineIcon />
        </IconButton>
      </NodeToolbar>
      <div style={{
        width: '180px', backgroundColor: 'white', border: `1px solid ${color}`, borderRadius: '24.5px', padding: '10px',
        minHeight: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', height: '30px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Cube color={color} />
            </div>
            <TypographyHeader sx={{ fontSize: '10px', ml: 2 }}>
              {IfNodeTitle[data.title]}
            </TypographyHeader>
          </div>
          <LightTooltip sx={{ backgroundColor: 'white' }}
            placement="right"
            title={
              <React.Fragment>
                <TypographyHeader>{IfNodeTitle[data.title]}</TypographyHeader>
                <TypographyMain> {IfNodeTip[data.title]}</TypographyMain>
              </React.Fragment>
            }>
            <div style={{ alignSelf: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 9 13" fill="none">
                <path d="M3.97233 12H3.98018M1 3.11898C1.42467 1.88592 2.59505 1 3.97233 1C5.70805 1 7.11518 2.4071 7.11518 4.14286C7.11518 5.44439 6.32405 6.56113 5.19647 7.03837C4.61441 7.28477 4.32338 7.40797 4.22155 7.50312C4.10032 7.61642 4.0773 7.65115 4.02025 7.80696C3.97233 7.93778 3.97233 8.13947 3.97233 8.54286V9.64286" stroke="black" strokeWidth="1.99386" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </LightTooltip >
        </div>
        <>
          {data.title === 'anomaly' &&
            <>
              <div>
                <StyledAutocomplete
                  mycolor={color}
                  size="small"
                  color='secondary.dark'
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={IfNodeParams[data.title]?.condition || []}
                  value={fields[data.title].condition}
                  onChange={(_, newValue) => {
                    updateField(data.title, { condition: newValue as string })
                  }}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label="Условие попадания за сигмы" InputProps={{ ...params.InputProps, readOnly: true }} />
                  )}
                />
                <div style={{ height: '15px' }}></div>
              </div>
              <div>
                <StyledAutocomplete
                  mycolor={color}
                  size="small"
                  color='secondary.dark'
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={IfNodeParams[data.title]?.param || []}
                  value={fields[data.title].param}
                  onChange={(_, newValue) => {
                    updateField(data.title, { param: newValue as string })
                  }}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label="Параметр" InputProps={{ ...params.InputProps, readOnly: true }} />
                  )}
                />
              </div>
            </>
          }
          {data.title === 'anomal_rsi' &&
            <>
              <div>
                <StyledAutocomplete
                  mycolor={color}
                  size="small"
                  color='secondary.dark'
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={IfNodeParams[data.title]?.period || []}
                  value={
                    typeof fields[data.title].param === 'object'
                      ? String((fields[data.title].param as IIFNodeParam).period)
                      : ''
                  }
                  onChange={(_, newValue) => {
                    const numberValue = Number(newValue);
                    if (!isNaN(numberValue)) {
                      const currentParam = fields[data.title].param as IIFNodeParam;
                      updateField(data.title, { param: { ...currentParam, period: numberValue } });
                    }
                  }}

                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label="Количество последних свечей" InputProps={{ ...params.InputProps, readOnly: true }} />
                  )}
                />
                <div style={{ height: '15px' }}></div>
              </div>
              <div>
                <StyledAutocomplete
                  mycolor={color}
                  size="small"
                  color='secondary.dark'
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={IfNodeParams[data.title]?.value || []}
                  value={
                    typeof fields[data.title].param === 'object'
                      ? String((fields[data.title].param as IIFNodeParam).value)
                      : ''
                  }
                  onChange={(_, newValue) => {
                    const numberValue = Number(newValue);
                    if (!isNaN(numberValue)) {
                      const currentParam = fields[data.title].param as IIFNodeParam;
                      updateField(data.title, { param: { ...currentParam, value: numberValue } });
                    }
                  }}

                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label="Уровень аномалии" InputProps={{ ...params.InputProps, readOnly: true }} />
                  )}
                />
                <div style={{ height: '15px' }}></div>
              </div>
            </>
          }
          {data.title === 'average_cross' &&
            <>
              <div>
                <StyledAutocomplete
                  mycolor={color}
                  size="small"
                  color='secondary.dark'
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={IfNodeParams[data.title]?.average_type || []}
                  value={
                    typeof fields[data.title].param === 'object'
                      ? String((fields[data.title].param as IIFNodeParam).average_type)
                      : ''
                  }
                  onChange={(_, newValue) => {
                    const currentParam = fields[data.title].param as IIFNodeParam;
                    updateField(data.title, { param: { ...currentParam, average_type: newValue as string } });
                  }}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label="Среднее" InputProps={{ ...params.InputProps, readOnly: true }} />
                  )}
                />
                <div style={{ height: '15px' }}></div>
              </div>
              <div>
                <StyledAutocomplete
                  mycolor={color}
                  size="small"
                  color='secondary.dark'
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={IfNodeParams[data.title]?.feature_name || []}
                  value={
                    typeof fields[data.title].param === 'object'
                      ? String((fields[data.title].param as IIFNodeParam).feature_name)
                      : ''
                  }
                  onChange={(_, newValue) => {
                    const currentParam = fields[data.title].param as IIFNodeParam;
                    updateField(data.title, { param: { ...currentParam, feature_name: newValue as string } });
                  }}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label="Параметр" InputProps={{ ...params.InputProps, readOnly: true }} />
                  )}
                />
                <div style={{ height: '15px' }}></div>
              </div>
              <div>
                <StyledAutocomplete
                  mycolor={color}
                  size="small"
                  color='secondary.dark'
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={IfNodeParams[data.title]?.n_fast || []}
                  value={
                    typeof fields[data.title].param === 'object'
                      ? String((fields[data.title].param as IIFNodeParam).n_fast)
                      : ''
                  }
                  onChange={(_, newValue) => {
                    const numberValue = Number(newValue);
                    if (!isNaN(numberValue)) {
                      const currentParam = fields[data.title].param as IIFNodeParam;
                      updateField(data.title, { param: { ...currentParam, n_fast: numberValue } });
                    }
                  }}

                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label="Кол-во свечей для быстрого скользящего среднего" InputProps={{ ...params.InputProps, readOnly: true }} />
                  )}
                />
                <div style={{ height: '15px' }}></div>
              </div>
              <div>
                <StyledAutocomplete
                  mycolor={color}
                  size="small"
                  color='secondary.dark'
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={IfNodeParams[data.title]?.n_slow || []}
                  value={
                    typeof fields[data.title].param === 'object'
                      ? String((fields[data.title].param as IIFNodeParam).n_slow)
                      : ''
                  }
                  onChange={(_, newValue) => {
                    const numberValue = Number(newValue);
                    if (!isNaN(numberValue)) {
                      const currentParam = fields[data.title].param as IIFNodeParam;
                      updateField(data.title, { param: { ...currentParam, n_slow: numberValue } });
                    }
                  }}

                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label="Кол-во свечей для медленного скользящего среднего" InputProps={{ ...params.InputProps, readOnly: true }} />
                  )}
                />
              </div>
            </>
          }
          {data.title === 'macd_cross' &&
            <>
              <div>
                <StyledAutocomplete
                  mycolor={color}
                  size="small"
                  color='secondary.dark'
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={IfNodeParams[data.title]?.feature_name || []}
                  value={
                    typeof fields[data.title].param === 'object'
                      ? String((fields[data.title].param as IIFNodeParam).feature_name)
                      : ''
                  }
                  onChange={(_, newValue) => {
                    const currentParam = fields[data.title].param as IIFNodeParam;
                    updateField(data.title, { param: { ...currentParam, feature_name: newValue as string } });
                  }}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label="Параметр" InputProps={{ ...params.InputProps, readOnly: true }} />
                  )}
                />
                <div style={{ height: '15px' }}></div>
              </div>
              <div>
                <StyledAutocomplete
                  mycolor={color}
                  size="small"
                  color='secondary.dark'
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={IfNodeParams[data.title]?.n_fast || []}
                  value={
                    typeof fields[data.title].param === 'object'
                      ? String((fields[data.title].param as IIFNodeParam).n_fast)
                      : ''
                  }
                  onChange={(_, newValue) => {
                    const numberValue = Number(newValue);
                    if (!isNaN(numberValue)) {
                      const currentParam = fields[data.title].param as IIFNodeParam;
                      updateField(data.title, { param: { ...currentParam, n_fast: numberValue } });
                    }
                  }}

                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label="Кол-во свечей для быстрого скользящего среднего" InputProps={{ ...params.InputProps, readOnly: true }} />
                  )}
                />
                <div style={{ height: '15px' }}></div>
              </div>
              <div>
                <StyledAutocomplete
                  mycolor={color}
                  size="small"
                  color='secondary.dark'
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={IfNodeParams[data.title]?.n_slow || []}
                  value={
                    typeof fields[data.title].param === 'object'
                      ? String((fields[data.title].param as IIFNodeParam).n_slow)
                      : ''
                  }
                  onChange={(_, newValue) => {
                    const numberValue = Number(newValue);
                    if (!isNaN(numberValue)) {
                      const currentParam = fields[data.title].param as IIFNodeParam;
                      updateField(data.title, { param: { ...currentParam, n_slow: numberValue } });
                    }
                  }}

                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label="Кол-во свечей для медленного скользящего среднего" InputProps={{ ...params.InputProps, readOnly: true }} />
                  )}
                />
              </div>
            </>
          }
          {data.title === 'out_of_limits' &&
            <>
              <div>
                <StyledAutocomplete
                  mycolor={color}
                  size="small"
                  color='secondary.dark'
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={IfNodeParams[data.title]?.feature_name || []}
                  value={
                    typeof fields[data.title].param === 'object'
                      ? String((fields[data.title].param as IIFNodeParam).feature_name)
                      : ''
                  }
                  onChange={(_, newValue) => {
                    const currentParam = fields[data.title].param as IIFNodeParam;
                    updateField(data.title, { param: { ...currentParam, feature_name: newValue as string } });
                  }}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField {...params} label="Параметр" InputProps={{ ...params.InputProps, readOnly: true }} />
                  )}
                />
                <div style={{ height: '15px' }}></div>
              </div>
              <div>
                <TextField
                  size="small"
                  color='secondary'
                  sx={{ width: '180px' }}
                  value={
                    typeof fields[data.title].param === 'object'
                      ? String((fields[data.title].param as IIFNodeParam).limit)
                      : ''
                  }
                  onChange={(event) => {
                    const numberValue = Number(event.target.value);
                    if (!isNaN(numberValue)) {
                      const currentParam = fields[data.title].param as IIFNodeParam;
                      updateField(data.title, { param: { ...currentParam, limit: numberValue } });
                    }
                  }}
                  label="Лимит"
                  InputProps={{
                    style: {
                      fontSize: '10px',
                      borderRadius: '10px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: '10px',
                    },
                  }}
                />


                <div style={{ height: '15px' }}></div>
              </div>
              {
                typeof fields[data.title].param === 'object' &&
                ((fields[data.title].param as IIFNodeParam).feature_name === 'green_candles_ratio' ||
                  (fields[data.title].param as IIFNodeParam).feature_name === 'red_candles_ratio') &&
                <div>
                  <StyledAutocomplete
                    mycolor={color}
                    size="small"
                    color='secondary.dark'
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={IfNodeParams[data.title]?.period || []}
                    value={
                      typeof fields[data.title].param === 'object'
                        ? String((fields[data.title].param as IIFNodeParam).period)
                        : ''
                    }
                    onChange={(_, newValue) => {
                      const numberValue = Number(newValue);
                      if (!isNaN(numberValue)) {
                        const currentParam = fields[data.title].param as IIFNodeParam;
                        updateField(data.title, { param: { ...currentParam, period: numberValue } });
                      }
                    }}

                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <TextField {...params} label="Кол-во свечей для медленного скользящего среднего" InputProps={{ ...params.InputProps, readOnly: true }} />
                    )}
                  />
                </div>}
            </>
          }
        </>
      </div >
    </>
  );
};

export default memo(IfNode);
