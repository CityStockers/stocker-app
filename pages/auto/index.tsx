import { Box, Button, Typography } from "@mui/material";
import React, { FC, ReactNode, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { coinList } from "../../constant/CoinData";
import axios from "axios";

type TradeProps = {
  children?: ReactNode;
};

const code = `/** \n * @param {string} symbol \n * @return {number} \n */ \n var lengthOfLongestSubstring = function(s) { \n };`;

/**
 * 함수 설명
 *
 * @param {any} example 함수가 받는 파라 미터 설명
 * @returns 리턴 설명
 */
const Auto: FC<TradeProps> = () => {
  const [coin, setCoin] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  function showValue() {
    alert(editorRef.current.getValue());
    console.log(editorRef.current.getValue());
  }

  async function submitCode(symbol: string, code: string) {
    try {
      const result = await axios.get("http://localhost:3000/runner", {
        params: {
          symbol: symbol,
          code: code,
        },
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
        display: "flex",
        flexDirection: "column",
        marginTop: 4,
      }}
    >
      <Box sx={{ maxWidth: 120 }}>
        <FormControl fullWidth>
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
      </Box>
      <Editor
        height="50vh"
        width="100%"
        defaultLanguage="javascript"
        defaultValue={code}
        onMount={handleEditorDidMount}
        options={options}
      />
      <Box>
        <Button onClick={() => submitCode(coin, editorRef.current.getValue())}>
          run
        </Button>
      </Box>
    </Box>
  );
};

export default Auto;
