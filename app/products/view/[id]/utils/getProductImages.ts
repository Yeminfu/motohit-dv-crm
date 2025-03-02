import dbWorker from "@/db/dbWorker2"

export default async function getProductImages(idProduct: number): Promise<{
  id: number
  name: string
}[]> {
  return await dbWorker(`
      select
        *
      from chbfs_products_images
      where idProduct = ?
    `, [idProduct]).then(x => x.result)
}
