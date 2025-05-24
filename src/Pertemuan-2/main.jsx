import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld";
import Container from "./Container";
import ArtikelDetail from "./ArtikelDetail";
import QnESection from "./QnESection";
import './custom.css';
import ListProduk from "./ListProduk";

createRoot(document.getElementById("root"))
    .render(
    <div>
            <Container>
                <HelloWorld/>
            </Container>   
            <QnESection/>
            {/* <ListProduk/> */}
        </div>
        
    )