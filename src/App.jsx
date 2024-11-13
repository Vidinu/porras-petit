import { useEffect, useState } from 'react'
import './App.css'
import { ModalEquipos } from './components/ModalEquipos';

const equipos = [

	{ equipo: "Celta", img: "celta" },
	{ equipo: "R. Madrid", img: "madrid" },
	{ equipo: "Valencia", img: "valencia" },
	{ equipo: "Sevilla", img: "sevilla" },
	{ equipo: "Las Palmas", img: "las_palmas" },
	{ equipo: "Barça", img: "barcelona" },
	{ equipo: "At. Madrid", img: "at_madrid" },
	{ equipo: "Athletic", img: "athletic" },
	{ equipo: "R. Sociedad", img: "real_sociedad" },
	{ equipo: "Betis", img: "betis" },
	{ equipo: "Rayo", img: "rayo" },
	{ equipo: "Osasuna", img: "osasuna" },
	{ equipo: "Getafe", img: "getafe" },
	{ equipo: "Mallorca", img: "mallorca" },
	{ equipo: "Cádiz", img: "cadiz" },
	{ equipo: "Villareal", img: "villarreal" },
	{ equipo: "Alavés", img: "alaves" },
	{ equipo: "Granada", img: "granada" },
	{ equipo: "Almería", img: "almeria" },
	{ equipo: "Girona", img: "girona" },
	{ equipo: "Espanyol", img: "espanyol" },
	{ equipo: "Leganés", img: "leganes" },
	{ equipo: "Valladolid", img: "valladolid" },
	
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

function drawText(ctx, texto, fontSize, fontFamily, x, y, textAlign) {
	ctx.textAlign = textAlign;
	ctx.fillStyle = "black";
	ctx.font = fontSize + "px " + fontFamily;
	ctx.fillText(texto, x, y);
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
	
	const [jornada, setJornada] = useState(0);
	const [fecha_partido1, setFecha_partido1] = useState(0);
	const [fecha_partido2, setFecha_partido2] = useState(0);

	function cambiarEquipo(nuevoEquipo){ 

		if( currentTeam==1 ){ setEquipo1(nuevoEquipo) }
		if( currentTeam==2 ){ setEquipo2(nuevoEquipo) }
		if( currentTeam==3 ){ setEquipo3(nuevoEquipo) }
		if( currentTeam==4 ){ setEquipo4(nuevoEquipo) }
	
	}

	function setFechaHandler1(e){
		e.preventDefault();	
		setFecha_partido1(new Date(e.target.value));
	}

	function setFechaHandler2(e){
		e.preventDefault();	
		setFecha_partido2(new Date(e.target.value));
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

			let y_equipo = 400;	

			if( equipo1!==null ){

				let imgEquipo = new Image();
				imgEquipo.src = "/escudos/" + equipo1.img + ".png";
				await loadImage(imgEquipo);

				if(equipo1.img=="celta"){ drawImage(ctx, imgEquipo, 75, y_equipo-30, -15, scale); }				
				else{ drawImage(ctx, imgEquipo, 75, y_equipo, -15, scale); }				

			}

			if( equipo2!==null ){

				let imgEquipo = new Image();
				imgEquipo.src = "/escudos/" + equipo2.img + ".png";
				await loadImage(imgEquipo);
				if(equipo2.img=="celta"){ drawImage(ctx, imgEquipo, 325, y_equipo-30, -15, scale); }				
				else{ drawImage(ctx, imgEquipo, 325, y_equipo, 15, scale); }	
	
			}

			if( equipo1!==null && equipo2!==null ){

				drawText(ctx, equipo1.equipo + " - " + equipo2.equipo, 60, "verdana", 420, 880, "center");

			}

			if( equipo3!==null ){

				let imgEquipo = new Image();
				imgEquipo.src = "/escudos/" + equipo3.img + ".png";
				await loadImage(imgEquipo);
				if(equipo3.img=="celta"){ drawImage(ctx, imgEquipo, 1800, y_equipo-30, -15, scale); }				
				else{ drawImage(ctx, imgEquipo, 1800, y_equipo, -15, scale); }	
	
			}

			if( equipo4!==null ){

				let imgEquipo = new Image();
				imgEquipo.src = "/escudos/" + equipo4.img + ".png";
				await loadImage(imgEquipo);
				if(equipo4.img=="celta"){ drawImage(ctx, imgEquipo, 2050, y_equipo-30, 15, scale); }				
				else{ drawImage(ctx, imgEquipo, 2050, y_equipo, 15, scale); }	
	
			}

			if( equipo3!==null && equipo4!==null ){

				drawText(ctx, equipo3.equipo + " - " + equipo4.equipo, 60, "verdana", 2080, 880, "center");

			}

			if( jornada!=0 ){

				drawText(ctx, "JORNADA " + jornada, 70, "serfi", 50, 100, "left");

			}

			if( fecha_partido1!=0 && fecha_partido1.toString()!="Invalid Date" ){

				console.log(fecha_partido1);

				let nombre_dia = fecha_partido1.toLocaleDateString("es-ES", { weekday: 'long' });

				drawText(ctx, "Día: " + fecha_partido1.getDate() + "/" + (fecha_partido1.getMonth()+1) + " - " + nombre_dia.charAt(0).toUpperCase() + nombre_dia.slice(1), 50, "verdana", 400, 950, "center");

				let hora = fecha_partido1.getHours();
				let minutos = fecha_partido1.getMinutes();

				if( hora<10 ){ hora = "0" + hora; }
				if( minutos<10 ){ minutos = "0" + minutos; }

				drawText(ctx, "Hora: " + hora + ":" + minutos, 50, "verdana", 400, 1020, "center");

			}

			if( fecha_partido2!=0 && fecha_partido2.toString()!="Invalid Date"  ){

				let nombre_dia = fecha_partido2.toLocaleDateString("es-ES", { weekday: 'long' });
				drawText(ctx, "Día: " + fecha_partido2.getDate() + "/" + (fecha_partido2.getMonth()+1) + " - " + nombre_dia.charAt(0).toUpperCase() + nombre_dia.slice(1), 50, "verdana", 2100, 950, "center");

				let hora = fecha_partido2.getHours();
				let minutos = fecha_partido2.getMinutes();

				if( hora<10 ){ hora = "0" + hora; }
				if( minutos<10 ){ minutos = "0" + minutos; }

				drawText(ctx, "Hora: " + hora + ":" + minutos, 50, "verdana", 2100, 1020, "center");

			}

			
			preview.src=canvas.toDataURL();

		}

	}, [equipo1, equipo2, equipo3, equipo4, jornada, fecha_partido1, fecha_partido2])

		
  return (
    <>

		<ModalEquipos show={showModal} equipos={equipos} modalHandler={toggleModalEquipos} equipoHandler={cambiarEquipo} />

		<div className="jornada">
			<label>Jornada: </label>
			<select onChange={(e)=>{ setJornada(e.target.value); }}>
				<option value={0}>---</option>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
				<option value={4}>4</option>
				<option value={5}>5</option>
				<option value={6}>6</option>
				<option value={7}>7</option>
				<option value={8}>8</option>
				<option value={9}>9</option>
				<option value={10}>10</option>
				<option value={11}>11</option>
				<option value={12}>12</option>
				<option value={13}>13</option>
				<option value={14}>14</option>
				<option value={15}>15</option>
				<option value={16}>16</option>
				<option value={17}>17</option>
				<option value={18}>18</option>
				<option value={19}>19</option>
				<option value={20}>20</option>
				<option value={21}>21</option>
				<option value={22}>22</option>
				<option value={23}>23</option>
				<option value={24}>24</option>
				<option value={25}>25</option>
				<option value={26}>26</option>
				<option value={27}>27</option>
				<option value={28}>28</option>
				<option value={29}>29</option>
				<option value={30}>30</option>
				<option value={31}>31</option>
				<option value={32}>32</option>
				<option value={33}>33</option>
				<option value={34}>34</option>
				<option value={35}>35</option>
				<option value={36}>36</option>
				<option value={37}>37</option>
				<option value={38}>38</option>
			</select>
		</div>

		<main>

			<div className="flex-center-center">

				<div className="equiposElegidos">

					<div className="equipo">
						<img onClick={ ()=> { toggleModalEquipos(); setCurrentTeam(1) } } className="choosedTeam" src={ equipo1 ? "escudos/" + equipo1.img + ".png" : "escudos/ninguno.png" }/>
					</div>

					<div>
						<img src="/escudos/vs.png" />
					</div>

					<div className="equipo">
						<img  onClick={ ()=> { toggleModalEquipos(); setCurrentTeam(2) } } className="choosedTeam" src={ equipo2 ? "escudos/" + equipo2.img + ".png" : "escudos/ninguno.png" }/>
					</div>


				</div>

				<div className="fecha">
						<label>Fecha 1º partido:</label>
						<input onChange={setFechaHandler1} type="datetime-local" />
				</div>

			</div>


			<div className="porraSpace">
				<img id="preview" src=""></img>
				<a id="link" onClick={downloadImage} href="#">
					<button>
						<img src="download.svg" width="18"/>Descargar</button>
				</a>
			</div>


			<div className="flex-center-center">

				<div className="equiposElegidos">

					<div className="equipo">
						<img onClick={ ()=> { toggleModalEquipos(); setCurrentTeam(3) } } className="choosedTeam" src={ equipo3 ? "escudos/" + equipo3.img + ".png" : "escudos/ninguno.png" }/>
					</div>

					<div>
						<img src="/escudos/vs.png" />
					</div>

					<div className="equipo">
						<img onClick={ ()=> { toggleModalEquipos(); setCurrentTeam(4) } } className="choosedTeam" src={ equipo4 ? "escudos/" + equipo4.img + ".png" : "escudos/ninguno.png" }/>
					</div>

				</div>

				<div className="fecha">
					<label>Fecha 2º partido:</label>
					<input onChange={setFechaHandler2} type="datetime-local" />
				</div>

			</div>

		</main>

		<canvas id="canvas" width="2488" height="3508"></canvas>
		
		
    </>
  )
}

export default App
