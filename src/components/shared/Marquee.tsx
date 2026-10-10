import { getProducts } from "@/api/products";
import { IProduct } from "@/types/products";
import { bnNumber } from "@/utils/number";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const Marquee = async() => {
    const products = await getProducts();
    return (
        <MarqueeText direction="right" pauseOnHover={true} duration={10}>
            <section className="w-full bg-white">
                <div className="mx-auto max-w-[1164px] overflow-hidden">
                    <div className="flex items-center whitespace-nowrap py-2.5">
                        {
                            products.map((product: IProduct) =>
                                <div key={product.id}>
                                    <span className="mr-8 text-[12px] font-medium text-gray-700">
                                        {product.image} {product.nameBn}
                                        <span className="ml-2 text-red-600">{`${product.change.dir === "up" ? "▲" : "▼"}`} {bnNumber(product?.change?.pct)}%</span>
                                    </span>
                                </div>)
                        }
                    </div>
                </div>
            </section>
        </MarqueeText>
    );
};

export default Marquee;