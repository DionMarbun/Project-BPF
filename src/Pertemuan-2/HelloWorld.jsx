export default function HelloWorld(){
    // const propsUserCard = {
    //     nama : "Goku",
    //     nim  : "999999",
    //     tanggal : "2025-01-01"
    // }
    return (
        <div>
            <h1>CRISTIANO RONALDO</h1>
            <Nama/>
            <Deskripsi/>
            <UserCard 
	            nama="Ronaldo" 
	            nim="5 Februari 1985 (umur 40)"
                lahir = "Funchal, Madeira, Portugal"
                Tinggi = "1,85 m (6 ft 1 in)"
	            tanggal={new Date().toLocaleDateString()}
	          />
            <Gambar/>
            
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

function Deskripsi (){
    return (
        <div>
            <p>Cristiano Ronaldo dos Santos Aveiro GOIH ComM (pelafalan dalam bahasa Portugis: [kɾiʃˈtjɐnu ʁɔˈnaldu] ⓘ; lahir 5 Februari 1985) adalah pemain sepak bola profesional Portugal yang bermain di klub Arab Saudi Al-Nassr FC sebagai penyerang dan juga kapten tim nasional Portugal. 
            Sering dianggap sebagai pemain terbaik di dunia dan secara luas dianggap sebagai salah satu pemain terhebat sepanjang masa, Ronaldo memenangkan lima penghargaan Ballon d'Or
            [cat. 3] dan empat Sepatu Emas Eropa. Ia sejauh ini memenangkan 35 trofi sepanjang kariernya, termasuk tujuh gelar liga, lima Liga Champions UEFA, satu Kejuaraan Eropa UEFA dan satu Liga Negara UEFA. Ronaldo memegang rekor gol (140) dan umpan gol (42) terbanyak di Liga Champions, gol terbanyak di Kejuaraan Eropa UEFA 
            (14), dan gol internasional terbanyak oleh pemain pria (123). Ia adalah salah satu dari sedikit pemain yang tercatat telah membuat lebih dari 1.100 penampilan di sepanjang karier profesionalnya, dan mencetak lebih dari 923 gol resmi baik untuk klub dan negara.</p>
        </div>
    )
}

function  Gambar () {
    return (
        <div>
            <img src="img/OIP.png" alt="logo" style={{ width: '200px', height: 'auto' }} />
        </div>
    )
}

function UserCard(props){
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





