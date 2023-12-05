import { Box, Autocomplete, TextField } from "@mui/material";
import { useAllStock } from '../../hooks/AllStockDataProvider';
import { TypographyMain } from "../ui/Typography";
import { useEffect, useState } from "react";
import MenuButton from "../ui/MenuButton";
import Button from "../ui/Button";
import { IMarketdatum } from "../../models/IMarketdatum";

interface NewAlgoFormProps {
    updateOpenFlow: (newOpenFlow: boolean) => void;
}

interface FieldState {
    error: boolean;
    helperText: string;
};

interface FieldsState {
    [key: string]: FieldState;
};

function NewAlgoForm({ updateOpenFlow }: NewAlgoFormProps) {
    const stockContext = useAllStock();
    if (!stockContext) throw new Error("AllStockProvider is missing");
    const { stocks, setCurrentStock } = stockContext;

    const [name, setName] = useState('');
    const [autoValue, setAutoValue] = useState<string | null>('');
    const [blockType, setBlockType] = useState<'algo' | 'ml'>('algo')

    useEffect(() => {
        setCurrentStock(stocks.filter((stock: IMarketdatum) => (stock['SECID'] === autoValue))[0]);
    }, [autoValue])

    const [fields, setFields] = useState<FieldsState>({
        stock: {
            error: false,
            helperText: '',
        },
        name: {
            error: false,
            helperText: '',
        },
    });

    const updateField = (fieldName: string, updates: Partial<FieldState>) => {
        setFields(prevFields => ({
            ...prevFields,
            [fieldName]: {
                ...prevFields[fieldName],
                ...updates
            }
        }));
    };

    function checkError() {
        let errorEmpty = false;

        if (!name) {
            updateField('name', { helperText: 'Введите название', error: true });
            errorEmpty = true;
        }
        else updateField('name', { helperText: '', error: false });

        if (!autoValue) {
            updateField('stock', { helperText: 'Выберите акцию', error: true });
            errorEmpty = true;
        }
        else updateField('stock', { helperText: '', error: false });
        return errorEmpty;
    }

    return (
        <>
            <Box sx={{
                backgroundColor: 'primary.dark', borderRadius: '20px', height: '500px', width: '800px',
                maxWidth: '90vw', maxHeight: '90vh', marginTop: '-80px', p: 5
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', flexWrap: 'wrap', height: '100%' }}>
                    <Box>
                        <TypographyMain>Выберите акцию</TypographyMain>
                        <Autocomplete
                            value={autoValue}
                            onChange={(_, newValue: string | null) => {
                                setAutoValue(newValue);
                            }}
                            id="controllable-states-demo"
                            options={['SBER', '']}
                            sx={{ width: 300 }}
                            renderInput={(params) =>
                                <TextField
                                    variant="outlined"
                                    color="secondary"
                                    className="textfield"
                                    error={fields['stock'].error}
                                    helperText={fields['stock'].helperText}
                                    {...params}
                                />
                            }
                        />
                    </Box>
                    <Box>
                        <div>
                            <TypographyMain>Введите название</TypographyMain>
                            <TextField
                                id="outlined-basic-1"
                                variant="outlined"
                                color="secondary"
                                className="textfield"
                                value={name}
                                sx={{ width: '300px' }}
                                error={fields['name'].error}
                                helperText={fields['name'].helperText}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(event.target.value);
                                }}
                            />
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            <MenuButton active={blockType === 'algo'} onClick={() => { setBlockType('algo') }} sx={{ width: '150px' }}>Алгоритмические блоки</MenuButton>
                            <span style={{ alignSelf: 'center' }}>|</span>
                            <MenuButton active={blockType === 'ml'} onClick={() => { setBlockType('ml') }} sx={{ width: '100px' }}>ML блоки</MenuButton>
                        </Box>
                    </Box>
                    <Button onClick={() => {
                        if (!checkError()) {
                            setCurrentStock(stocks.filter((stock: IMarketdatum) => (stock['SECID'] === autoValue))[0]);
                            updateOpenFlow(true);
                        }
                    }}>Создать алгоритм</Button>
                </Box>
            </Box>
            {/* {console.log(stocks.map((el: any) => { el['label'] = el['SECID'] }))} */}
        </>
    );
}

export default NewAlgoForm;