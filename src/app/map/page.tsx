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
                            width: '40vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <h3 style={{color: "black"}}>Nujno potreben odvoz smeti</h3>
                        {points.map((p: any) => ( p.full_count > 5 &&
                            <Card onClick={() => handleSelect(p)} 
                                key={p.id} 
                                style={{ width: '38vh', height: '10vh', 
                                backgroundColor: selected.includes(p) ? 'lightgray': 'white', borderColor: 'darkgreen',
                                display: 'flex', flexDirection: 'column', justifyContent: 'space-around', 
                                alignItems: 'center', borderRadius: '10px', borderStyle: "solid",  borderWidth: "1px" }}>
                                <p>{p.name}</p>
                                <p><text style={{color: "gray"}}>Število poročanj:&nbsp;</text><text style={{ fontWeight: "bold" }}>{p.full_count}</text></p>
                            </Card>
                        ))}
                            <h3 style={{color: "gray"}}>Priporočen odvoz smeti</h3>
                        {points.map((p: any) => ( p.full_count <= 5 &&
                            <Card onClick={() => handleSelect(p)} 
                                key={p.id} 
                                style={{ width: '38vh', height: '10vh', 
                                    backgroundColor: selected.includes(p) ? 'lightgray': 'white',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', 
                                    borderRadius: '10px', borderStyle: "solid",  borderWidth: "1px" }}>
                                <p>{p.name}</p>
                                <p><text style={{color: "gray"}}>Število poročanj:&nbsp;</text><text style={{ fontWeight: "bold" }}>{p.full_count}</text></p>
                            </Card>
                        ))}
                        <Button variant="contained" color="primary" onClick={() => {
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