import styled from "@emotion/styled";

export const UploadControl = ({ children, value, onChange, disabled, accept }) => {
  return (
    <label htmlFor="contained-button-file">
      <ImageItem>
        <input
          value={value}
          accept={accept}
          disabled={disabled}
          style={{ display: "none" }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={disabled ? () => {} : onChange}
        />
        <Image src="/icon/ic_add.svg" />
      </ImageItem>
      {children}
    </label>
  );
};

const ImageItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${(props) => props.theme.color.border};
  border-radius: 5px;
  margin-right: 10px;
  background-color: rgba(250, 250, 250, 1);
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

const Image = styled.img``;
