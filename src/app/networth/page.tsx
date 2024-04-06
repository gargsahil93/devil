'use client'

import { useState } from "react";

export default function Page() {
    const [total, setTotal] = useState('');
    const submitForm = () => {
        console.log(total);
    }
    return <>
        Total: <input name="net" type="text" value={total} onChange={(e) => setTotal(e.target.value)} />
        <button type="submit" onClick={submitForm}>Submit</button>
    </>;
}