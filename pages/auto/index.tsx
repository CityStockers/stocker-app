import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { coinList } from "../../constant/CoinData";
import axios from "axios";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { lib, TradeResult } from "./type";
import { useMutation } from "react-query";
import { ScriptResult } from "../../components/Auto/ScriptResult";

type TradeProps = {
  children?: ReactNode;
};

const firstcode = `const trader = new Trader();

let yesterdayPrice = { timestamp: 0, openPrice: 0, closePrice: 0, lowPrice: 0, highPrice: 0 };
let targetBuyPrice: number;

trader.onTimeChange((market, timestamp) => {
  if (yesterdayPrice.timestamp !== 0) {
    const todayPrice = market.getQuote(timestamp);
    targetBuyPrice =
      todayPrice.openPrice +
      (yesterdayPrice.highPrice - yesterdayPrice.lowPrice) * 0.25;
    if (targetBuyPrice <= todayPrice.highPrice && market.getCoin() === 0) {
      market.buy(
        Math.trunc(market.getWallet() / targetBuyPrice),
        targetBuyPrice
      );
    }
  }

  if (market.getCoin() > 0) {
    market.sell(market.getCoin());
  }

  yesterdayPrice = market.getQuote(timestamp);
}, "1d");

export default trader;`;

const secondCode = `

const trader = new Trader();

// Define the parameters
var period = 5; // The number of bars to calculate the moving average
var threshold = 0.05; // The percentage above or below the moving average to trigger a trade
var lotSize = 10; // The number of units to trade

// Initialize the variables
var ma = 0; // The moving average value
var sum = 0; // The sum of the prices for the moving average calculation
var position = 0; // The current position: 1 for long, -1 for short, 0 for none
var data: number[] = []
var i = 0;
// Loop through the price data
trader.onTimeChange((market, timestamp) => {
  // Get the current price
  var price = market.getQuote(timestamp);
   data.push(price.closePrice)
  // Update the sum and the moving average
  if (i >= period) {
    // Remove the oldest price from the sum
    sum -= data[i - period];
  }

  // Add the current price to the sum
  sum += price.closePrice;

  // Calculate the moving average
  ma = sum / Math.min(i + 1, period);

  // Check if there is a trading signal
  if (price.closePrice > ma * (1 + threshold)) {
    // Buy signal: go long or close short position
    if (position != 1) {
      market.buy(lotSize)
      console.log("Buy " + lotSize + " units at " + price);
      position = 1;
    }
    
    } else if (price.closePrice < ma * (1 - threshold)) {
      // Sell signal: go short or close long position
      
      if (position != -1) {
        market.sell(lotSize)
        console.log("Sell " + lotSize + " units at " + price);
        position = -1;
      }
      
      } else {
        // No signal: do nothing
  }
i += 1;
}, "1d");

export default trader;

`;

const thirdCode = `const trader = new Trader();

trader.onTimeChange((market, timestamp) => {

}, "1d");

export default trader;`;

/**
 * 함수 설명
 *
 * @param {any} example 함수가 받는 파라 미터 설명
 * @returns 리턴 설명
 */
const Auto: FC<TradeProps> = () => {
  const [coin, setCoin] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [budget, setBudget] = useState("");
  const [defaultCode, setDefaultCode] = useState(thirdCode);
  const options = {
    readOnly: false,
    minimap: { enabled: false },
  };
  const editorRef = useRef<any>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setCoin(event.target.value as string);
  };
  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }
  function handleEditorWillMount(monaco: Monaco) {
    monaco.editor.getModels().forEach((model) => model.dispose());

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ["node_modules/@types"],
    });
    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
    const uri = monaco.Uri.file("dir/market.d.ts");
    monaco.editor.createModel(lib, "typescript", uri);
  }

  async function submitCode(
    symbol: string,
    code: string
  ): Promise<TradeResult> {
    const { data } = await axios.post("http://localhost:8080/runner", {
      code: code,
      symbol: symbol,
      startTime: startDate,
      endTime: endDate,
      budget: budget,
    });
    return data;
  }

  const runScriptMutation = useMutation(
    (code: string) => submitCode(coin, code),
    {
      onSuccess: (_data) => {
        console.log("Run code successful:", _data);
      },
      onError: (_err) => {
        console.log("Run code failed:", _err);
      },
    }
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginTop: 4,
        marginX: 1,
      }}
    >
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          marginX: 2,
        }}
      >
        <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
          <InputLabel id="demo-simple-select-label">Coin</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={coin}
            label="Coin"
            onChange={handleChange}
          >
            {coinList.map((item, index) => {
              return (
                <MenuItem key={index} value={item.symbol}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Box sx={{ minWidth: 200, marginBottom: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ minWidth: 200, marginBottom: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>

        <Box sx={{ minWidth: 200, marginBottom: 2 }}>
          <TextField
            id="outlined-basic"
            label="budget"
            variant="outlined"
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          borderRadius: 2,
          border: "solid 1px #DFDFDF",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: 1,
        }}
      >
        <Box>
          <Button
            onClick={() => {
              setDefaultCode(firstcode);
            }}
          >
            LWVA
          </Button>
          <Button
            onClick={() => {
              setDefaultCode(secondCode);
            }}
          >
            TFA
          </Button>
          <Button
            onClick={() => {
              setDefaultCode(thirdCode);
            }}
          >
            FREE
          </Button>
        </Box>
        <Box
          sx={{
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            padding: 1,
            flex: 0.7,
          }}
        >
          <Editor
            height={400}
            width="100%"
            defaultLanguage="typescript"
            defaultValue={defaultCode}
            value={defaultCode}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            options={options}
            loading={<CircularProgress color="primary" />}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
            }}
          >
            <Button
              onClick={() => {
                runScriptMutation.mutate(editorRef.current.getValue());
              }}
            >
              run
            </Button>
          </Box>
        </Box>

        <ScriptResult
          scriptData={runScriptMutation.data}
          loading={runScriptMutation.isLoading}
        />
      </Box>
    </Box>
  );
};

export default Auto;
