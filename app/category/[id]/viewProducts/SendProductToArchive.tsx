import Modal from "@/utils/modal/modal";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SendProductToArchive(props: {
  idProduct: number;
  productName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal
        title={`Подтвердите удаление товара: ${props.productName}`}
        isOpen={isOpen}
        closeFn={() => {
          setIsOpen(false);
        }}
      >
        <>
          <button
            className="btn btn-sm btn-danger"
            onClick={() =>
              onConfirm(props.idProduct, () => {
                setIsOpen(false);
              })
            }
          >
            Подтвердить
          </button>
          <button
            className="btn btn-sm btn-dark ms-2"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Отмена
          </button>
        </>
      </Modal>

      <button
        className="btn btn-sm btn-danger"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        В архив
      </button>
    </>
  );
}

async function onConfirm(idProduct: number, closeFn: any) {
  fetch(`/api/products/send-to-archive/${idProduct}`, { method: "post" })
    .then((x) => x.json())
    .then((x) => {
      if (x.success) {
        closeFn();
        toast.success("Товар отправлен в архив");
      } else {
        toast.error("Ошибка #f93m");
      }
    });
}
