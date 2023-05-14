"use client";
import Card from "@mui/material/Card";
import { LoadScript } from "@react-google-maps/api";
import React, { lazy, Suspense } from "react";

const Map = lazy(() => import("../../components/map"));

const Page = () => {

    return (
        <div>
            <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY || ""}>
                <Suspense fallback={<div>Loading...</div>}>    
                    <Map />
                </Suspense>
            </LoadScript>
        </div>
    );
    
};

export default Page;