export default function ArtikelDetail ({children}) {
    return (
        <div className="card">
            <h1>CRISTIANO RONALDO</h1>
            <br />
                {children} 
            <br />
            <footer>
                <p>2025 - Politeknik Caltex Riau</p>
            </footer>
        </div>
    );
}