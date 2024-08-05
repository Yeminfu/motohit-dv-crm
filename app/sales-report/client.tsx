import { ShopFromDB } from "@/types/shops/shopFromDBType"
import ts_reportItem from "./ts_reportItem"
import Price from "@/ui/price"

export default function Client(props: {
    shops: ShopFromDB[],
    report: ts_reportItem[]
}) {
    return <>
        <table className="table table-bordered tablestriped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Нименование</th>
                    {props.shops.map(shop => <th key={shop.id}>{shop.shopName}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.report.map(productSales => <tr key={productSales.idProduct}>
                    <td>{productSales.idProduct}</td>
                    <td>{productSales.productName}</td>

                    {productSales.sales.map(salePerShopObj => <td key={salePerShopObj.idshop}>
                        {salePerShopObj.count} /  <Price value={Number(salePerShopObj.sum)} />
                    </td>)}

                </tr>)}
                <tr></tr>
            </tbody>
        </table>
    </>
}