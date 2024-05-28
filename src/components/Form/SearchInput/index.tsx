// Lib
import { FC, useEffect, useState } from "react";
// Icons
import { CloseBlackIcon, SearchBlackIcon } from "icons";
// Styled
import { FlexContainer } from "styled/Box";
import { SearchInputField } from "../styled";

interface SearchInputProps {
  value: string;
  setValue: (arg: string) => void;
  placeholder?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  placeholder,
  value,
  setValue,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (value) {
      setSearchOpen(true);
    }
  }, [value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClose = () => {
    setSearchOpen(false);
    setValue("");
  };

  const handleOpen = () => {
    return setSearchOpen(true);
  };

  return (
    <SearchInputField
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      prefix={
        <FlexContainer onClick={handleOpen}>
          <SearchBlackIcon onClick={handleOpen} />
        </FlexContainer>
      }
      suffix={searchOpen ? <CloseBlackIcon onClick={handleClose} /> : null}
      open={searchOpen}
    />
  );
};
