import React from "react";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import dropdownIcon from "../../assets/dropdownIcon.png";

// Styled Select Component
const StyledSelect = styled(Select)({
  borderRadius: "8px",
  // border: "solid 1px #888888",
  padding: "9px 0px",
  fontSize: "16px",
  "& .MuiSelect-select": {
    color: "#888888",
    fontWeight: 500,
    paddingRight: "30px",
  },
  "& .MuiSelect-icon": {
    color: "#888888",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "red", // Keep the border color same when hovered
      border: "solid 1px #888888",
    },
    "&.Mui-focused": {
      borderColor: "red", // Keep the border color same when focused
      border: "solid 1px #888888",
    },
  }
});

// Props Interface
interface MenuItemType {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface CustomSelectDropdownProps {
  fieldName: string;
  fieldError?: boolean;
  fieldValue: string | number;
  fieldId: string;
  fieldMenuItems: MenuItemType[];
  fieldStyles?: React.CSSProperties;
  renderValue?: (value: string | number) => React.ReactNode;
  handleChangeMenu: (event: SelectChangeEvent<string>) => void; // ✅ Fix: Changed `string | number` to `string`
}

// Component
const CustomSelectDropdown: React.FC<CustomSelectDropdownProps> = ({
  fieldName,
  fieldError,
  fieldValue,
  fieldId,
  fieldMenuItems,
  fieldStyles,
  renderValue,
  handleChangeMenu,
}) => {
  return (
    <FormControl fullWidth error={!!fieldError}>
      <StyledSelect
      aria-placeholder="micj"
        id={fieldId}
        value={String(fieldValue)} // ✅ Fix: Convert to string
        name={fieldName}
        onChange={(event) => handleChangeMenu(event as SelectChangeEvent<string>)} // ✅ Fix: Explicit Type Assertion
        displayEmpty
        renderValue={(value) => {
          const typedValue = value as string | number; // ✅ Type Assertion
          return renderValue ? renderValue(typedValue) : typedValue;
        }}
        sx={fieldStyles}
        IconComponent={() => (
          <img
            src={dropdownIcon}
            alt="Dropdown Icon"
            style={{ width: "12px", height: "7px" }}
          />
        )}
      >
        {fieldMenuItems.map((item) => (
          <MenuItem
            key={item.value}
            value={String(item.value)} // ✅ Fix: Convert to string
            disabled={item.disabled}
            sx={{ color: "#888888" }}
          >
            {item.label}
          </MenuItem>
        ))}
      </StyledSelect>
      {fieldError && <FormHelperText>{fieldError}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelectDropdown;
