

export const ModalEquipos = ( { show, equipos, modalHandler, equipoHandler } ) => {

	if( !show ){ return }

	return(
		
		<div className="modal" >

			<div className="modal-content">

				<header>
					<h3></h3>
					<button className="close" onClick={ modalHandler }>✕</button>
				</header>

				<div className="escudos">
					{
						equipos.map( element => {
							return(

								<img onClick={ ()=>{ equipoHandler(element); modalHandler(); } } key={element.equipo} className="escudo" src={ "escudos/" + element.img + ".png" }/>

								)
						})
					}
				</div>
			</div>
		</div>
	)

}