"use client";
import supabase from "@/lib/supabaseClient";
import { Button } from "@mui/material";
import { LoadScript } from "@react-google-maps/api";
import React, { lazy, Suspense, useEffect, useState } from "react";

const Map = lazy(() => import("../../components/map"));

const Page = () => {
    const [points, setPoints] = useState<any>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    async function getPoints() {
        await supabase.from("Smetnjaki").select("*")
        .then(r => setPoints(r.data))
    };
  
    useEffect(() => {
        getPoints();
    }, [refresh]);

    return (
        <div>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}>
                <Suspense fallback={<div>Loading...</div>}>    
                    <Map points={points} />
                </Suspense>
            </LoadScript>
            <Button onClick={() => setRefresh(!refresh)}>Refresh</Button>
        </div>
    );
    
};

export default Page;