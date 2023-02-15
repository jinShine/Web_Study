import UpsertComponent from "@/src/components/commons/upsert-component";

export default function ProductEditUI({ isEdit, onChangeInputInfo, onClickSubmit }) {
  return (
    <UpsertComponent
      isEdit={isEdit}
      onChangeInputInfo={onChangeInputInfo}
      onClickSubmit={onClickSubmit}
    />
  );
}
