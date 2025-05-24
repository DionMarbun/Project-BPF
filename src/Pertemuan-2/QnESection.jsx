export default function EneSection ({children}){
    return(
        <div className = "card">
            <h1>QnA SECTION</h1>
            <Nama/>
            <br/>
                {children}
            <br/>
            <DataDiri 
	            nama="Dion Marbun" 
	            nim="5 Februari 1985 (umur 40)"
                lahir = "Funchal, Madeira, Portugal"
                Tinggi = "1,85 m (6 ft 1 in)"
	            tanggal={new Date().toLocaleDateString()}
	          />
            <Pertanyaan/>
            <Jawaban/>
            <Referensi></Referensi>
        </div>
    )
}

function Nama () {
    return (
        <div>
            <small>Dion Marbun</small>
        </div>
    )
}

function DataDiri(props){
    return (
        <div>
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>Tanggal Lahir: {props.nim}</p>
            <p>Tempat lahir : {props.lahir}</p>
            <p>Tinggi : {props.Tinggi}</p>
            <p>Tanggal: {props.tanggal}</p>
        
        </div>
    )
}

function Pertanyaan () {
    return (
        <div>
            <h3>Pertanyaan: Kenapa Manusia Mahluk Sosial ? </h3>
        <br/>
        </div>
    )
}

function Jawaban () {
    return (
        <div>
            <h3>Jawaban : 1. Kebutuhan akan Interaksi Sosial
            Secara biologis dan psikologis, manusia memiliki kebutuhan dasar untuk berinteraksi dengan orang lain. Interaksi sosial ini penting untuk perkembangan emosional dan mental, serta untuk memenuhi kebutuhan dasar seperti rasa aman, kasih sayang, dan dukungan sosial.
            Sejak lahir, manusia membutuhkan perawatan dan perhatian dari orang lain untuk bertahan hidup dan berkembang. Interaksi dengan orang tua, keluarga, atau orang-orang terdekat membantu dalam membentuk kepribadian dan keterampilan sosial.</h3>
            <br />
        </div>
    )
}


function Referensi () {
    return (
        <div>
            <small>Referensi : https://chatgpt.com/</small>
        </div>
    )
}

