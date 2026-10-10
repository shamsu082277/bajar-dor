import { IProduct } from '@/types/products';
import { bnNumber } from '@/utils/number';
import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
    product: IProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
    const isUp = product.change?.dir === "up";
    const isDown = product.change?.dir === "down";
    return (
        <Link href={`/products/${product.id}`}
            key={product.id}
            className="rounded-[16px] border border-gray-200 bg-white p-3.5 transition hover:border-green-400 hover:shadow-sm"
        >
            {/* Product */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1f5f1] text-[21px]">
                    {product.image}
                </div>
                <div>
                    <h2 className="text-[15px] font-semibold leading-5 text-gray-900">
                        {product.nameBn}
                    </h2>
                    <p className="mt-0.5 text-[10px] text-gray-500">
                        প্রতি কেজি
                    </p>
                </div>
            </div>
            {/* Price */}
            <div className="mt-4 flex items-end justify-between">
                <div>
                    <p className="text-[10px] text-gray-500">
                        আজকের দাম
                    </p>
                    <p className="mt-0.5 text-[17px] font-semibold leading-5 text-gray-900">
                        {bnNumber(product.today)}{" "}
                        <span className="text-[11px] font-normal">
                            টাকা
                        </span>
                    </p>
                </div>
                {/* Change */}
                <span
                    className={`rounded-full px-2.5 py-1 text-[9px] font-medium ${isUp
                            ? "bg-red-50 text-red-600"
                            : isDown
                                ? "bg-green-50 text-green-600"
                                : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {isUp
                        ? `▲ ${bnNumber(product.change.pct)}%`
                        : isDown
                            ? `▼ ${bnNumber(product.change.pct)}%`
                            : "— ০.০%"}
                </span>
            </div>
        </Link>
    );
};

export default ProductCard;