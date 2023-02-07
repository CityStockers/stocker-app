import { Box, Button, Typography } from "@mui/material";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import Editor, { useMonaco, Monaco } from "@monaco-editor/react";
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

type TradeProps = {
  children?: ReactNode;
};

const code = `//Code your Auto Algorithm!
\n console.log('Hello! City Stockers!');
`;

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

  const options = {
    readOnly: false,
    minimap: { enabled: false },
  };
  const editorRef = useRef(null);

  const handleChange = (event: SelectChangeEvent) => {
    setCoin(event.target.value as string);
  };
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  function handleEditorWillMount(monaco: Monaco) {
    console.log({ monaco });
  }

  function showValue() {
    alert(editorRef.current.getValue());
    console.log(editorRef.current.getValue());
  }

  async function submitCode(symbol: string, code: string) {
    try {
      const result = await axios.post("http://localhost:3000/runner", {
        code: code,
        symbol: symbol,
      });
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
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
          backgroundColor: "grey",
          flex: 0.2,
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
      </Box>

      <Box
        sx={{
          borderRadius: 2,
          border: "solid 1px #DFDFDF",
          display: "flex",
          flexDirection: "column",
          flex: 0.8,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            padding: 1,
            flex: 0.7,
          }}
        >
          <Editor
            height={400}
            width="100%"
            defaultLanguage="typescript"
            defaultValue={code}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            options={options}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
            }}
          >
            <Button
              onClick={() => submitCode(coin, editorRef.current.getValue())}
            >
              run
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 0.3,
            backgroundColor: "#FFFFFF",
            borderRadius: 2,
            border: "solid 1px #DFDFDF",
            padding: 2,
          }}
        >
          Result
        </Box>
      </Box>
    </Box>
  );
};

export default Auto;
