import { useEffect, useState } from 'react'
import './App.css'
import { ModalEquipos } from './components/ModalEquipos';

const equipos = [

	{ equipo: "Celta", img: "celta" },
	{ equipo: "Real Madrid", img: "madrid" },
	{ equipo: "Valencia", img: "valencia" },
	{ equipo: "Sevilla", img: "sevilla" },
	{ equipo: "Las Palmas", img: "las_palmas" },
	{ equipo: "Barcelona", img: "barcelona" },
	{ equipo: "At. Madrid", img: "at_madrid" },
	{ equipo: "Athletic", img: "athletic" },
	{ equipo: "Real Sociedad", img: "real_sociedad" },
	{ equipo: "Betis", img: "betis" },
	{ equipo: "Rayo Vallecano", img: "rayo" },
	{ equipo: "Osasuna", img: "osasuna" },
	{ equipo: "Getafe", img: "getafe" },
	{ equipo: "Mallorca", img: "mallorca" },
	{ equipo: "Cádiz", img: "cadiz" },
	{ equipo: "Villareal", img: "villarreal" },
	{ equipo: "Alavés", img: "alaves" },
	{ equipo: "Granada", img: "granada" },
	{ equipo: "Almería", img: "almeria" },
	{ equipo: "girona", img: "girona" },
	
];



function downloadImage(){

	const canvas = document.getElementById('canvas');
	const link = document.getElementById('link');

	link.setAttribute('download', 'porra.png');
	link.setAttribute('href', canvas.toDataURL("image/png"));
	// link.click();

}


function drawImage(ctx, img, x, y, angle = 0, scale = 1){	
	ctx.save();
	ctx.translate(x + img.width * scale / 2, y + img.height * scale / 2);
	ctx.rotate(angle * Math.PI / 180);
	ctx.translate(- x - img.width * scale / 2, - y - img.height * scale / 2);
	ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
	ctx.restore();

}

const loadImage = async img => {
    return new Promise((resolve, reject) => {
        img.onload = async () => { resolve(true); };
    });
};


function App() {

	const [showModal, setShowModal] = useState(0);
	function toggleModalEquipos(){ showModal ? setShowModal(0) : setShowModal(1) }

	const [currentTeam, setCurrentTeam] = useState(null);

	const [equipo1, setEquipo1] = useState(null);
	const [equipo2, setEquipo2] = useState(null);
	const [equipo3, setEquipo3] = useState(null);
	const [equipo4, setEquipo4] = useState(null);

	function cambiarEquipo(nuevoEquipo){ 

		if( currentTeam==1 ){ setEquipo1(nuevoEquipo) }
		if( currentTeam==2 ){ setEquipo2(nuevoEquipo) }
		if( currentTeam==3 ){ setEquipo3(nuevoEquipo) }
		if( currentTeam==4 ){ setEquipo4(nuevoEquipo) }
	
	}

  
	useEffect(() => {
		
		const preview = document.getElementById('preview');
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');

		const scale = 0.75;

		let img = new Image();
		img.src = "/base_porra.png";

		preview.src=canvas.toDataURL();

		img.onload = async function() {

			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, canvas.width, canvas.height)
			
			ctx.drawImage(img,0,0);

			// ctx.fillStyle = "black";
			// ctx.font = '20px serif';
			// ctx.fillText('Hello world', 50, 90);			

			if( equipo1!==null ){

				let imgEquipo = new Image();
				imgEquipo.src = "/escudos/" + equipo1 + ".png";
				await loadImage(imgEquipo);
				drawImage(ctx, imgEquipo, 75, 440, -15, scale);

			}

			if( equipo2!==null ){

				let imgEquipo = new Image();
				imgEquipo.src = "/escudos/" + equipo2 + ".png";
				await loadImage(imgEquipo);
				drawImage(ctx, imgEquipo, 325, 440, 15, scale);
	
			}

			if( equipo3!==null ){

				let imgEquipo = new Image();
				imgEquipo.src = "/escudos/" + equipo3 + ".png";
				await loadImage(imgEquipo);
				drawImage(ctx, imgEquipo, 1800, 440, -15, scale); 
	
			}

			if( equipo4!==null ){

				let imgEquipo = new Image();
				imgEquipo.src = "/escudos/" + equipo4 + ".png";
				await loadImage(imgEquipo);
				drawImage(ctx, imgEquipo, 2050, 440, 15, scale); 
	
			}

			preview.src=canvas.toDataURL();

		}

	}, [equipo1, equipo2, equipo3, equipo4])

		
  return (
    <>

		<ModalEquipos show={showModal} equipos={equipos} modalHandler={toggleModalEquipos} equipoHandler={cambiarEquipo} />

		<main>

			<div className="equiposElegidos">

				<div className="equipo">
					<img onClick={ ()=> { toggleModalEquipos(); setCurrentTeam(1) } } className="choosedTeam" src={ equipo1 ? "escudos/" + equipo1 + ".png" : "escudos/ninguno.png" }/>
				</div>

				<div>
					<img src="/escudos/vs.png" />
				</div>

				<div className="equipo">
					<img  onClick={ ()=> { toggleModalEquipos(); setCurrentTeam(2) } } className="choosedTeam" src={ equipo2 ? "escudos/" + equipo2 + ".png" : "escudos/ninguno.png" }/>
				</div>

			</div>


			<div className="porraSpace">
				<img id="preview" src=""></img>
				<a id="link" onClick={downloadImage} href="#">
					<button>
						<img src="download.svg" width="18"/>Descargar</button>
				</a>
			</div>

			<div className="equiposElegidos">

				<div className="equipo">
					<img onClick={ ()=> { toggleModalEquipos(); setCurrentTeam(3) } } className="choosedTeam" src={ equipo3 ? "escudos/" + equipo3 + ".png" : "escudos/ninguno.png" }/>
				</div>

				<div>
					<img src="/escudos/vs.png" />
				</div>

				<div className="equipo">
					<img onClick={ ()=> { toggleModalEquipos(); setCurrentTeam(4) } } className="choosedTeam" src={ equipo4 ? "escudos/" + equipo4 + ".png" : "escudos/ninguno.png" }/>
				</div>

			</div>

		</main>

		<canvas id="canvas" width="2488" height="3508"></canvas>
		
		
    </>
  )
}

export default App
