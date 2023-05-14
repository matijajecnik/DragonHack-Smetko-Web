"use client";
import supabase from "@/lib/supabaseClient";
import { AppBar, Button, Card } from "@mui/material";
import { LoadScript } from "@react-google-maps/api";
import React, { lazy, Suspense, useEffect, useState } from "react";

const Map = lazy(() => import("../../components/map"));

const Page = () => {
    const [points, setPoints] = useState<any>([]);
    const [selected, setSelected] = useState<any>([]);
    const [chosen, setChosen] = useState<any>([]);

    async function getPoints() {
        await supabase.from("Smetnjaki").select("*")
        .then(r => setPoints(r.data))
    };

    async function updatePoint(point: any) {
        await supabase.from("Smetnjaki").update({full_count: 0}).eq("id", point.id);
    };
  
    useEffect(() => {
        getPoints();
    }, []);

    const handleSelect = (point: any) => {
        if (!selected.includes(point)) {
            setSelected([...selected, point]);
        } else {
            setSelected(selected.filter((p: any) => p.id !== point.id));
        }
    };
    

    return (
        <div>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}>
                <Suspense fallback={<div>Loading...</div>}>    
                    <Map points={chosen} />
                    <AppBar position="absolute" 
                        sx={{ marginLeft: '60px', top: 'auto', bottom: 20, left: 0, 
                            right: 0, backgroundColor: 'white', height: '90vh', 
                            width: '40vh', display: 'flex', alignItems: 'center' }}>
                            <h3 style={{color: "black"}}>Nujno potreben odvoz smeti</h3>
                        {points.map((p: any) => ( p.full_count > 5 &&
                            <Card onClick={() => handleSelect(p)} 
                                key={p.id} 
                                style={{ width: '36vh', height: '10vh', marginBottom: '16px',
                                backgroundColor: selected.includes(p) ? 'lightgray': 'white', borderColor: '#378805',
                                display: 'flex', flexDirection: 'column', 
                                alignItems: 'center', borderRadius: '10px', borderStyle: "solid",  borderWidth: "1px", boxShadow: "none" }}>
                                <text style={{ fontWeight: "bold", marginBottom: "16px", marginTop: "8px" }}>{p.name}</text>
                                <><text style={{color: "gray"}}>Število poročanj:&nbsp;</text><text style={{ fontWeight: "bold" }}>{p.full_count}</text></>
                            </Card>
                        ))}
                            <h3 style={{color: "gray", fontWeight: "bold"}}>Priporočen odvoz smeti</h3>
                        {points.map((p: any) => ( p.full_count <= 5 &&
                            <Card onClick={() => handleSelect(p)} 
                                key={p.id} 
                                style={{ width: '36vh', height: '10vh', marginBottom: '16px',
                                    backgroundColor: selected.includes(p) ? 'lightgray': 'white', boxShadow: "none",
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', 
                                    borderRadius: '10px', borderStyle: "solid",  borderWidth: "1px" }}>
                                <text style={{ fontWeight: "bold", marginBottom: "16px", marginTop: "8px" }}>{p.name}</text>
                                <><text style={{color: "gray"}}>Število poročanj:&nbsp;</text><text style={{ fontWeight: "bold" }}>{p.full_count}</text></>
                            </Card>
                        ))}
                        <Button variant="contained" style={{ backgroundColor: '#378805', borderRadius: '10px' }}
                            color="primary" onClick={() => {
                            setChosen(selected); 
                            setSelected([]);
                            selected.forEach((p: any) => {updatePoint(p); p.full_count = 0;});
                            }}>Potrdi</Button>
                    </AppBar>
                </Suspense>
            </LoadScript>
        </div>
    );
    
};

export default Page;