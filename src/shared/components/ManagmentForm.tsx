import { Box, Autocomplete, TextField, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useAllStock } from '../../hooks/AllStockDataProvider';
import { TypographyMain } from "../ui/Typography";
import { useEffect, useState } from "react";
import MenuButton from "../ui/MenuButton";
import Button from "../ui/Button";
import { IMarketdatum } from "../../models/IMarketdatum";
import StockCard from "./StockCard";
import { useNavigate } from "react-router-dom";
import { IManagment } from '../../constants/mlNodeParams'

interface FieldState {
    error: boolean;
    helperText: string;
    value: string;
};

interface FieldsState {
    [key: string]: FieldState;
};

interface FormProps {
    updateManagment: (newManagment: IManagment) => void;
    updateOpenForm: (newOpen: boolean) => void;
    origManagment: IManagment;
}

const buyTypeOptionsArr = ['Доля баланса', 'Сумма в рублях', 'Количество акций'];
const sellTypeOptionsArr = ['Доля баланса', 'Сумма в рублях', 'Количество акций', 'Продать всё'];

function ManagmentForm({ updateManagment, updateOpenForm, origManagment }: FormProps) {
    const [buyType, setBuyType] = useState<string>('Доля баланса');
    const [sellType, setSellType] = useState<string>('Доля баланса');

    const [fields, setFields] = useState<FieldsState>({
        balance: {
            value: '0',
            error: false,
            helperText: '',
        },
        minBalance: {
            value: '',
            error: false,
            helperText: '',
        },
        maxBalance: {
            value: '',
            error: false,
            helperText: '',
        },
        buy: {
            value: '',
            error: false,
            helperText: '',
        },
        sell: {
            value: '',
            error: false,
            helperText: '',
        },
    });


    function setModelSetting(){
        if (origManagment.balance && 
            origManagment.max_balance_for_trading &&
            origManagment.min_balance_for_trading) {
            updateField('balance', { value: String(origManagment.balance) })
            updateField('minBalance', { value: String(origManagment.min_balance_for_trading) })
            updateField('maxBalance', { value: String(origManagment.max_balance_for_trading) })
        }
        let buyValue = '';
        if (origManagment.part_of_balance_for_buy && origManagment.part_of_balance_for_buy !== 0) {
            setBuyType('Доля баланса');
            buyValue = String(origManagment.part_of_balance_for_buy);
        }
        else if (origManagment.sum_for_buy_rur && origManagment.sum_for_buy_rur !== 0) {
            setBuyType('Сумма в рублях');
            buyValue = String(origManagment.sum_for_buy_rur);
        }
        else if (origManagment.sum_for_buy_num && origManagment.sum_for_buy_num !== 0) {
            setBuyType('Количество акций');
            buyValue = String(origManagment.sum_for_buy_num);
        }
        updateField('buy', { value: buyValue })

        let sellValue = '';
        if (origManagment.part_of_balance_for_sell && origManagment.part_of_balance_for_sell !== 0) {
            setSellType('Доля баланса');
            sellValue = String(origManagment.part_of_balance_for_sell);
        }
        else if (origManagment.sum_for_sell_rur && origManagment.sum_for_sell_rur !== 0) {
            setSellType('Сумма в рублях');
            sellValue = String(origManagment.sum_for_sell_rur);
        }
        else if (origManagment.sum_for_sell_num && origManagment.sum_for_sell_num !== 0) {
            setSellType('Количество акций');
            sellValue = String(origManagment.sum_for_sell_num);
        }
        else {
            setSellType('Продать всё');
        }
        updateField('sell', { value: sellValue })
    }
    useEffect(() => {
        setModelSetting();
    }, [])

    const updateField = (fieldName: string, updates: Partial<FieldState>) => {
        setFields(prevFields => ({
            ...prevFields,
            [fieldName]: {
                ...prevFields[fieldName],
                ...updates
            }
        }));
    };

    const createManagmentObject = () => {
        const management: IManagment = {
            "balance": 0,
            "max_balance_for_trading": 0,
            "min_balance_for_trading": 0,
            "part_of_balance_for_buy": 0,
            "sum_for_buy_rur": 0,
            "sum_for_buy_num": 0,
            "part_of_balance_for_sell": 0,
            "sum_for_sell_rur": 0,
            "sum_for_sell_num": 0,
            "sell_all": false,
        }
        management.balance = Number(fields['balance'].value);
        management.max_balance_for_trading = Number(fields['maxBalance'].value);
        management.min_balance_for_trading = Number(fields['minBalance'].value);

        if (buyType === 'Доля баланса') management.part_of_balance_for_buy = Number(fields['buy'].value);
        else if (buyType === 'Сумма в рублях') management.sum_for_buy_rur = Number(fields['buy'].value);
        else if (buyType === 'Количество акций') management.sum_for_buy_num = Number(fields['buy'].value);

        if (sellType === 'Доля баланса') management.part_of_balance_for_sell = Number(fields['sell'].value);
        else if (sellType === 'Сумма в рублях') management.sum_for_sell_rur = Number(fields['sell'].value);
        else if (sellType === 'Количество акций') management.sum_for_sell_num = Number(fields['sell'].value);
        else if (sellType === 'Продать всё') management.sell_all = true;
        return management;
    }

    function checkError() {
        let errorEmpty = false;

        if (!fields['balance'].value || !Number(fields['balance'].value)) {
            updateField('balance', { helperText: 'Введите численный баланс', error: true });
            errorEmpty = true;
        }
        else updateField('balance', { helperText: '', error: false });

        if (!fields['minBalance'].value || !Number(fields['minBalance'].value)) {
            updateField('minBalance', { helperText: 'Введите число', error: true });
            errorEmpty = true;
        }
        else updateField('minBalance', { helperText: '', error: false });

        if (!fields['maxBalance'].value || !Number(fields['maxBalance'].value)) {
            updateField('maxBalance', { helperText: 'Введите число', error: true });
            errorEmpty = true;
        }
        else updateField('maxBalance', { helperText: '', error: false });

        if (!fields['buy'].value || !Number(fields['buy'].value)) {
            updateField('buy', { helperText: 'Введите число', error: true });
            errorEmpty = true;
        }
        else updateField('buy', { helperText: '', error: false });

        if ((!fields['sell'].value || !Number(fields['sell'].value)) && sellType !== 'Продать всё') {
            updateField('sell', { helperText: 'Введите число', error: true });
            errorEmpty = true;
        }
        else updateField('sell', { helperText: '', error: false });

        return errorEmpty;
    }

    return (
        <>
            <Box sx={{
                backgroundColor: 'primary.dark', borderRadius: '20px', height: '500px', width: '800px',
                maxWidth: '90vw', maxHeight: '90vh', marginTop: '-80px', p: 5, zIndex: 100000
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', flexWrap: 'wrap' }}>
                    <Box sx={{ height: '38%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-25px' }}>
                            <IconButton onClick={() => { 
                                setModelSetting();
                                updateOpenForm(false); }}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div>
                            <TypographyMain>Введите общий баланс</TypographyMain>
                            <div style={{ display: 'flex' }}>
                                <TextField
                                    id="outlined-basic-1"
                                    variant="outlined"
                                    color="secondary"
                                    className="textfield"
                                    value={fields['balance'].value}
                                    sx={{ width: '200px' }}
                                    error={fields['balance'].error}
                                    helperText={fields['balance'].helperText}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        updateField('balance', { value: event.target.value });
                                    }}
                                />
                                <TypographyMain sx={{ ml: 2 }}>рублей</TypographyMain>
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <TypographyMain sx={{ mb: 1 }}>Введите баланс выделенный под торговлю</TypographyMain>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <TextField
                                    id="outlined-basic-1"
                                    variant="outlined"
                                    color="secondary"
                                    label="Мин"
                                    className="textfield"
                                    value={fields['minBalance'].value}
                                    sx={{ width: '130px' }}
                                    error={fields['minBalance'].error}
                                    helperText={fields['minBalance'].helperText}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        updateField('minBalance', { value: event.target.value });
                                    }}
                                />
                                <TextField
                                    id="outlined-basic-1"
                                    variant="outlined"
                                    color="secondary"
                                    label="Макс"
                                    className="textfield"
                                    value={fields['maxBalance'].value}
                                    sx={{ width: '130px', ml: 2 }}
                                    error={fields['maxBalance'].error}
                                    helperText={fields['maxBalance'].helperText}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        updateField('maxBalance', { value: event.target.value });
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <TypographyMain>Выберите и задайте параметр покупки</TypographyMain>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <Autocomplete
                                        value={buyType}
                                        onChange={(_, newValue: string | null) => {
                                            if (newValue) setBuyType(newValue);
                                        }}
                                        id="controllable-states-demo"
                                        options={buyTypeOptionsArr}
                                        sx={{ width: '200px' }}
                                        renderInput={(params) =>
                                            <TextField
                                                variant="outlined"
                                                color="secondary"
                                                className="textfield"
                                                {...params}
                                            />
                                        }
                                    />
                                </div>
                                <TextField
                                    id="outlined-basic-1"
                                    variant="outlined"
                                    color="secondary"
                                    className="textfield"
                                    value={fields['buy'].value}
                                    sx={{ width: '130px', ml: 2, mt: 1 }}
                                    error={fields['buy'].error}
                                    helperText={fields['buy'].helperText}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        updateField('buy', { value: event.target.value });
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <TypographyMain>Выберите и задайте параметр продажи</TypographyMain>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <Autocomplete
                                        value={sellType}
                                        onChange={(_, newValue: string | null) => {
                                            if (newValue) setSellType(newValue);
                                        }}
                                        id="controllable-states-demo"
                                        options={sellTypeOptionsArr}
                                        sx={{ width: '200px' }}
                                        renderInput={(params) =>
                                            <TextField
                                                variant="outlined"
                                                color="secondary"
                                                className="textfield"
                                                {...params}
                                            />
                                        }
                                    />
                                </div>
                                <TextField
                                    id="outlined-basic-1"
                                    variant="outlined"
                                    color="secondary"
                                    className="textfield"
                                    value={fields['sell'].value}
                                    sx={{ width: '130px', ml: 2, mt: 1 }}
                                    error={fields['sell'].error}
                                    helperText={fields['sell'].helperText}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        updateField('sell', { value: event.target.value });
                                    }}
                                />
                            </div>
                        </div>
                    </Box>
                    <Button onClick={() => {
                        if (!checkError()) {
                            const managentObj = createManagmentObject();
                            updateManagment(managentObj);
                            updateOpenForm(false);
                        }
                    }}>Сохранить настройки</Button>
                </Box>
            </Box>
        </>
    );
}

export default ManagmentForm;