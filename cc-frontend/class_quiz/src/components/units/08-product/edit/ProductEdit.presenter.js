import UpsertComponent from "@/src/components/commons/upsert-component";

export default function ProductEditUI({ isEdit, data, onChangeInputInfo, onClickSubmit }) {
  return (
    <UpsertComponent
      isEdit={isEdit}
      data={data}
      onChangeInputInfo={onChangeInputInfo}
      onClickSubmit={onClickSubmit}
    />
  );
}
