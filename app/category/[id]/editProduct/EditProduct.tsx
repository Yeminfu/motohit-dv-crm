"use client";
import { ProductsFull } from "@/types/products/prodyctType";
import Modal from "@/utils/modal/modal";
import { useState } from "react";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import EditProductForm from "./EditProductForm";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import { CategoryFromDBInterface } from "@/types/categories/categories";

export default function EditProduct(props: {
  product: ProductsFull;
  priceTypes: PriceTypesFromDBInterface[];
  shops: ShopFromDB[];
  categories: CategoryFromDBInterface[];
  canEditStock: boolean
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn-sm btn-primary me-2"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Изменить
      </button>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          title="Редактировать товар"
          closeFn={() => {
            setIsOpen(false);
          }}
        >
          <>
            {(() => {
              if (props.product == null) return <>Загрузка...</>;
              return (
                <div style={{ maxWidth: "1000px" }}>
                  <EditProductForm
                    closeFn={() => {
                      setIsOpen(false);
                    }}
                    product={props.product}
                    priceTypes={props.priceTypes}
                    shops={props.shops}
                    categories={props.categories}
                    canEditStock={props.canEditStock}
                  />
                </div>
              );
            })()}
          </>
        </Modal>
      )}
    </>
  );
}
