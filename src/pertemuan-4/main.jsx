import { createRoot } from "react-dom/client";
import FrameworkList from "./frameworkList";
import "./tailwind.css";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import ResponsiveDesign from "./ResponsiveDesign";
import FrameworkProductFilter from "./FrameworkProductFilter";

createRoot (document.getElementById ("root"))
    .render( 
        <div>
            
            <FrameworkListSearchFilter/>
            <ResponsiveDesign/>
            <FrameworkProductFilter/>
        </div>
        
    )
