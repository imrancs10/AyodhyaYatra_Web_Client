import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useSearchParams, redirect } from 'react-router-dom';
export default function QrLanding() {
    
let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    let resourceId = searchParams.get("id");
    let resourceType = searchParams.get("type");
   
    useEffect(() => {
      
        if (resourceType?.toLowerCase() === 'temple') {
            navigate(`/temple?id=${resourceId}`);
         }
    }, [resourceId,resourceType])
    
    return (
        <div>Redirecting to required resource</div>
    )
}
