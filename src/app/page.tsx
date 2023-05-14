'use client';

import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";


export default function Home() {


    return (
        <div style={{ marginTop: "50px", marginLeft: "50px"}}>
            <span style={{ fontSize: 26, backgroundColor: 'white', border: 'none', 
            fontWeight: "bolder"}}>
                Smetko
            </span>
            <div style={{ fontWeight: "bolder", color: "#378805", fontSize: 50, marginTop: "60px" }}>Waste management</div>
            <div style={{ fontSize: 50 }}>for everyone</div>
            <div style={{ fontSize: 20, marginTop: "20px", width: "50%" }}>With an esitamed 2 Billion tonnes of municipal 
            solid waste generated, there is a pressing need 
            for effective waste management systems, and 
            this is where Smetko comes in.</div>
            <Button variant="contained" style={{ backgroundColor: '#378805', borderRadius: '10px', marginTop: "20px" }}
                color="primary"><Link style={{  }} href="/map">Go to map</Link></Button>
            <Image alt="hey" src="/../../public/phones.png" width="1000" height="500" style={{ marginTop: "50px" }} />
        </div>
    )
}
