"use client"
import React, { useState, useEffect } from 'react';

const page = () => {
    const [image, setImage] = useState(null);
    // 画像を非同期でフェッチする関数
    const fetchImage = async () => {
        // APIから画像を取得
        const response = await fetch('http://127.0.0.1:5000/getimage');
        // レスポンスをblob形式で取得
        const blob = await response.blob();
        // blobをBase64形式に変換
        const imageBase64 = URL.createObjectURL(blob);
        // imageのstateを更新
        setImage(imageBase64);
    };

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {image && <img src={image} alt="Fetched Image" className="mb-4" />}
        <button 
            onClick={fetchImage}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
        >
            画像を取得
        </button>
    </div>
    )
}

export default page
