"use client"
import { useMemo } from "react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

function TextEditor({ description, updateDescription }: { description: string, updateDescription: any }) {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    return <ReactQuill theme="snow" value={description} onChange={updateDescription}
    />;
};

export default TextEditor;