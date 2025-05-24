import { createRoot } from "react-dom/client";

import "./tailwind.css";


import FrameworkProduct from "./FrameworkProduct";

createRoot (document.getElementById ("root"))
    .render( 
        <div>
            
            {/* <FrameworkListSearchFilter/>
            <ResponsiveDesign/> */}
            <FrameworkProduct/>
        </div>
        
    )
